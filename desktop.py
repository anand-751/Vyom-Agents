import base64
import json
import os
import time
from pathlib import Path
from typing import Any, Callable, Dict, Optional, Tuple
from openai import OpenAI
from PIL import Image, ImageDraw, ImageFont

# Initialize OpenAI Client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "your-api-key-here"))

CACHE_FILE = Path("desktop_selector_cache.json")


# ==========================================
# 1. PYWINAUTO IMPLEMENTATION (WINDOWS)
# ==========================================
class PyWinAutoSelfHealingEngine:

    def __init__(self, app_window, cache_path: Path = CACHE_FILE):
        """
        :param app_window: The main PyWinAuto window specification (e.g., app.window(title="Calculator"))
        """
        self.window = app_window
        self.cache_path = cache_path
        self.cache: Dict[str, str] = self._load_cache()

    def _load_cache(self) -> Dict[str, str]:
        if self.cache_path.exists():
            try:
                return json.loads(self.cache_path.read_text())
            except Exception:
                return {}
        return {}

    def _save_cache(self):
        self.cache_path.write_text(json.dumps(self.cache, indent=2))

    def execute_action(
        self,
        action_key: str,
        goal_description: str,
        fallback_selector: Dict[str, Any],
        action_type: str = "click",
        input_text: Optional[str] = None,
        verify_fn: Optional[Callable[[], bool]] = None,
        timeout_sec: float = 3.0,
    ) -> bool:
        """Executes action via cached specs or falls back to Set-of-Marks (SoM) Vision protocol."""
        cached_spec = self.cache.get(action_key, fallback_selector)
        print(
            f"[*] Step 1: Trying cached PyWinAuto criteria for '{action_key}': {cached_spec}"
        )

        try:
            target_element = self.window.child_window(**cached_spec)
            target_element.wait("visible", timeout=timeout_sec)

            if action_type == "click":
                target_element.click_input()
            elif action_type == "type" and input_text:
                target_element.type_keys(input_text, with_spaces=True)

            if verify_fn is None or verify_fn():
                print(
                    "[✓] Step 1 Succeeded! (Fast-path: Direct Native Handle execution)"
                )
                return True
        except Exception as e:
            print(f"[!] Step 1 Failed/Timed out: {e}")

        # Step 2: Self-Healing Protocol
        print(
            f"[*] Step 2: Triggering Self-Healing Vision Protocol for Desktop Goal: '{goal_description}'..."
        )
        annotated_img_path, mark_map = self._generate_set_of_marks()

        chosen_tag, new_selector_kwargs = self._query_vision_model(
            annotated_img_path, goal_description, mark_map
        )

        if not chosen_tag or not new_selector_kwargs:
            raise RuntimeError(
                f"[✗] Vision engine could not identify target element for goal: '{goal_description}'"
            )

        print(
            f"[✓] Model identified Tag #{chosen_tag} -> Generated dynamic selector: {new_selector_kwargs}"
        )

        # Step 3: Execute using Healed Selector
        print("[*] Step 3: Executing action using healed desktop control...")
        healed_element = self.window.child_window(**new_selector_kwargs)
        if action_type == "click":
            healed_element.click_input()
        elif action_type == "type" and input_text:
            healed_element.type_keys(input_text, with_spaces=True)

        if verify_fn and not verify_fn():
            raise RuntimeError(
                "[✗] Step 3 Failed: Action completed but verification check failed."
            )

        # Step 4: Update Cache
        print(f"[*] Step 4: Caching new resilient selector for '{action_key}'")
        self.cache[action_key] = new_selector_kwargs
        self._save_cache()
        return True

    def _generate_set_of_marks(
        self,
    ) -> Tuple[Path, Dict[int, Dict[str, Any]]]:
        # Capture raw window screenshot
        img = self.window.capture_as_image()
        raw_path = Path("temp_desktop_raw.png")
        img.save(raw_path)

        # Recursively map visible descendant elements
        children = self.window.descendants()
        interactive_elements = []

        for idx, ctrl in enumerate(children, start=1):
            try:
                if not ctrl.is_visible():
                    continue
                rect = ctrl.rectangle()
                width = rect.width()
                height = rect.height()
                if width <= 0 or height <= 0:
                    continue

                interactive_elements.append(
                    {
                        "id": idx,
                        "title": ctrl.window_text(),
                        "control_type": ctrl.friendly_class_name(),
                        "auto_id": getattr(ctrl.element_info, "automation_id", ""),
                        "rect": {
                            "left": rect.left,
                            "top": rect.top,
                            "right": rect.right,
                            "bottom": rect.bottom,
                        },
                    }
                )
            except Exception:
                continue

        # Draw Set-of-Marks Overlay
        draw = ImageDraw.Draw(img)
        try:
            font = ImageFont.truetype("arial.ttf", 14)
        except IOError:
            font = ImageFont.load_default()

        # Window offsets to map absolute client coordinates to relative screenshot
        win_rect = self.window.rectangle()

        mark_map = {}
        for idx, item in enumerate(interactive_elements, start=1):
            r = item["rect"]
            rel_box = [
                r["left"] - win_rect.left,
                r["top"] - win_rect.top,
                r["right"] - win_rect.left,
                r["bottom"] - win_rect.top,
            ]

            draw.rectangle(rel_box, outline="red", width=2)
            tag_text = str(idx)
            text_box = draw.textbbox((rel_box[0], rel_box[1]), tag_text, font=font)
            draw.rectangle(
                [
                    text_box[0] - 2,
                    text_box[1] - 2,
                    text_box[2] + 2,
                    text_box[3] + 2,
                ],
                fill="red",
            )
            draw.text(
                (rel_box[0], rel_box[1]), tag_text, fill="white", font=font
            )
            mark_map[idx] = item

        annotated_path = Path("temp_desktop_annotated.png")
        img.save(annotated_path)
        return annotated_path, mark_map

    def _query_vision_model(
        self,
        image_path: Path,
        goal: str,
        mark_map: Dict[int, Dict[str, Any]],
    ) -> Tuple[Optional[int], Optional[Dict[str, str]]]:
        with open(image_path, "rb") as f:
            encoded_image = base64.b64encode(f.read()).decode("utf-8")

        metadata = "\n".join(
            [
                f"Tag #{idx}: type='{el['control_type']}' title='{el['title']}' auto_id='{el['auto_id']}'"
                for idx, el in mark_map.items()
            ]
        )

        prompt = f"""
You are an automated Desktop UI element locator for Windows/Desktop Apps.
Goal: Find the target element corresponding to: '{goal}'

Annotated Screenshot Metadata for active elements:
{metadata}

Respond strictly in JSON format with two keys:
1. "tag_number": (Integer tag ID corresponding to the target control)
2. "resilient_selector": (A Python dictionary of PyWinAuto child_window kwargs like 'title', 'auto_id', or 'control_type')

Example JSON response:
{{
  "tag_number": 4,
  "resilient_selector": {{"title": "Submit", "control_type": "Button"}}
}}
"""

        res = client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{encoded_image}"
                            },
                        },
                    ],
                }
            ],
        )

        parsed = json.loads(res.choices[0].message.content)
        return parsed.get("tag_number"), parsed.get("resilient_selector")


# ==========================================
# 2. APPIUM IMPLEMENTATION (DESKTOP DRIVER)
# ==========================================
class AppiumDesktopSelfHealingEngine:

    def __init__(self, driver, cache_path: Path = CACHE_FILE):
        """
        :param driver: Appium WebDriver instance connected to Windows App Driver or Mac2Driver
        """
        self.driver = driver
        self.cache_path = cache_path
        self.cache: Dict[str, str] = self._load_cache()

    def _load_cache(self) -> Dict[str, str]:
        if self.cache_path.exists():
            try:
                return json.loads(self.cache_path.read_text())
            except Exception:
                return {}
        return {}

    def _save_cache(self):
        self.cache_path.write_text(json.dumps(self.cache, indent=2))

    def execute_action(
        self,
        action_key: str,
        goal_description: str,
        fallback_xpath: str,
        action_type: str = "click",
        input_text: Optional[str] = None,
        verify_fn: Optional[Callable[[], bool]] = None,
    ) -> bool:
        cached_xpath = self.cache.get(action_key, fallback_xpath)
        print(f"[*] Step 1: Trying Appium selector for '{action_key}': {cached_xpath}")

        try:
            elem = self.driver.find_element("xpath", cached_xpath)
            if action_type == "click":
                elem.click()
            elif action_type == "type" and input_text:
                elem.send_keys(input_text)

            if verify_fn is None or verify_fn():
                print("[✓] Step 1 Succeeded! (Fast-path)")
                return True
        except Exception as e:
            print(f"[!] Step 1 Failed: {e}")

        # Step 2: Self-Healing Protocol
        print(
            f"[*] Step 2: Triggering Self-Healing for Appium goal: '{goal_description}'"
        )
        screenshot_path = Path("temp_appium_screenshot.png")
        self.driver.save_screenshot(str(screenshot_path))

        # Query vision model with XPath generator
        new_xpath = self._query_appium_vision_model(
            screenshot_path, goal_description
        )

        # Step 3: Run action with dynamic locator
        print(f"[*] Step 3: Retrying action with dynamic XPath: {new_xpath}")
        healed_elem = self.driver.find_element("xpath", new_xpath)
        if action_type == "click":
            healed_elem.click()
        elif action_type == "type" and input_text:
            healed_elem.send_keys(input_text)

        # Step 4: Save XPath back to Cache
        self.cache[action_key] = new_xpath
        self._save_cache()
        return True

    def _query_appium_vision_model(
        self, image_path: Path, goal: str
    ) -> str:
        with open(image_path, "rb") as f:
            encoded_image = base64.b64encode(f.read()).decode("utf-8")

        prompt = f"""
You are an automation engine operating desktop windows/mac applications using Appium.
Goal: Target the element for: '{goal}'

Identify the target element from the desktop screenshot and synthesize a valid resilient Appium Desktop XPath query (e.g. using @Name, @AutomationId, @ClassName, or @Value).

Respond strictly in JSON format:
{{
  "healed_xpath": "//Button[@Name='Submit Order']"
}}
"""
        res = client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{encoded_image}"
                            },
                        },
                    ],
                }
            ],
        )

        return json.loads(res.choices[0].message.content)["healed_xpath"]


# ==========================================
# DIRECT USAGE EXAMPLES
# ==========================================
if __name__ == "__main__":

    # --- EXAMPLE A: PYWINAUTO (Windows Native Apps: Calculator, Notepad, WPF, WinForms) ---
    print("\n=== Running PyWinAuto Native Desktop Healing Example ===")
    try:
        from pywinauto import Application

        # Connect or Start Windows App
        app = Application(backend="uia").start("calc.exe")
        calc_win = app.window(title="Calculator")

        healing_engine = PyWinAutoSelfHealingEngine(calc_win)

        # Intentional invalid fallback spec forces Step 2 visual self-healing
        healing_engine.execute_action(
            action_key="num_seven_button",
            goal_description="Button representing the number 7 on the calculator keypad",
            fallback_selector={
                "title": "InvalidSevenID",
                "control_type": "Button",
            },
            action_type="click",
            timeout_sec=2.0,
        )

    except Exception as e:
        print(f"PyWinAuto Execution Note: Run on Windows system ({e})")

    # --- EXAMPLE B: APPIUM DESKTOP (Mac App Driver / WinAppDriver) ---
    print("\n=== Appium Desktop Self-Healing Setup Sample ===")
    """
    from appium import webdriver
    from appium.options.common import AppiumOptions

    options = AppiumOptions()
    options.set_capability("platformName", "Windows") # or "Mac"
    options.set_capability("appium:app", "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App")

    driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
    appium_engine = AppiumDesktopSelfHealingEngine(driver)

    appium_engine.execute_action(
        action_key="calc_clear",
        goal_description="Clear or 'C' button to reset calculator input",
        fallback_xpath="//Button[@AutomationId='NonExistentClearBtn']",
        action_type="click"
    )
    """