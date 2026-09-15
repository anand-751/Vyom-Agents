import json
import os
import re
import time
from pathlib import Path
from typing import Callable, Optional, Dict, Any, Tuple
from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright, Page, ElementHandle
from openai import OpenAI

# Initialize OpenAI Client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "your-api-key-here"))

CACHE_FILE = Path("selector_cache.json")


class SelfHealingEngine:
    def __init__(self, page: Page, cache_path: Path = CACHE_FILE):
        self.page = page
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
        fallback_selector: str,
        action_fn: Callable[[Page, str], Any],
        verify_fn: Optional[Callable[[Page], bool]] = None,
        timeout_ms: int = 3000
    ) -> bool:
        """
        Main entry point implementing the 4-step self-healing workflow.
        """
        # Step 1: Attempt execution from Cache or Default Selector
        cached_selector = self.cache.get(action_key, fallback_selector)
        print(f"[*] Step 1: Trying cached selector for '{action_key}': '{cached_selector}'")

        try:
            self.page.locator(cached_selector).first.wait_for(state="visible", timeout=timeout_ms)
            action_fn(self.page, cached_selector)
            
            # Post-Condition Verification
            if verify_fn is None or verify_fn(self.page):
                print(f"[✓] Step 1 Succeeded! (Fast-path: ~15ms, $0)")
                return True
            else:
                print("[!] Step 1: Action executed but post-condition verification failed.")
        except Exception as e:
            print(f"[!] Step 1 Failed/Timed out: {e}")

        # Step 2: Trigger Self-Healing Protocol
        print(f"[*] Step 2: Triggering Self-Healing Vision Protocol for goal: '{goal_description}'...")
        
        # 2a & 2b: Capture Viewport Screenshot + Annotate with Set-of-Marks (SoM)
        annotated_img_path, mark_map = self._generate_set_of_marks()

        # 2c & 2d: Prompt Vision Model to find mark tag & synthesize dynamic selector
        chosen_tag, new_selector = self._query_vision_model(
            image_path=annotated_img_path,
            goal=goal_description,
            mark_map=mark_map
        )

        if not chosen_tag or not new_selector:
            raise RuntimeError(f"[✗] Self-healing failed to identify element for goal: '{goal_description}'")

        print(f"[✓] Model identified Tag #{chosen_tag} -> Synthesized Selector: '{new_selector}'")

        # Step 3: Playwright executes using healed selector & verifies post-condition
        print(f"[*] Step 3: Executing action using healed selector...")
        action_fn(self.page, new_selector)

        if verify_fn and not verify_fn(self.page):
            raise RuntimeError("[✗] Step 3 Failed: Healed action succeeded but post-condition failed.")

        print(f"[✓] Step 3 Succeeded! Verification passed.")

        # Step 4: Save new resilient selector to Cache for future runs
        print(f"[*] Step 4: Caching healed selector for key '{action_key}'")
        self.cache[action_key] = new_selector
        self._save_cache()

        return True

    def _generate_set_of_marks(self) -> Tuple[Path, Dict[int, Dict[str, Any]]]:
        """
        Collects interactive elements, draws numbered tags over them, and returns map data.
        """
        screenshot_bytes = self.page.screenshot(type="png", full_page=False)
        raw_img_path = Path("temp_raw.png")
        raw_img_path.write_bytes(screenshot_bytes)

        # Inject script to extract interactive elements & bounding boxes
        interactive_elements = self.page.evaluate("""
            () => {
                const elements = Array.from(document.querySelectorAll('button, a, input, select, textarea, [role="button"], [onclick]'));
                return elements.map((el, index) => {
                    const rect = el.getBoundingClientRect();
                    return {
                        id: index + 1,
                        tagName: el.tagName.toLowerCase(),
                        text: el.innerText || el.value || el.ariaLabel || '',
                        idAttr: el.id || '',
                        nameAttr: el.name || '',
                        role: el.getAttribute('role') || '',
                        rect: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
                    };
                }).filter(e => e.rect.width > 0 && e.rect.height > 0);
            }
        """)

        image = Image.open(raw_img_path)
        draw = ImageDraw.Draw(image)
        try:
            font = ImageFont.truetype("arial.ttf", 14)
        except IOError:
            font = ImageFont.load_default()

        mark_map = {}
        for idx, el in enumerate(interactive_elements, start=1):
            r = el['rect']
            box = [r['x'], r['y'], r['x'] + r['width'], r['y'] + r['height']]
            
            # Draw bounding box overlay
            draw.rectangle(box, outline="red", width=2)
            
            # Draw Tag Marker
            tag_text = str(idx)
            text_box = draw.textbbox((r['x'], r['y']), tag_text, font=font)
            draw.rectangle([text_box[0] - 2, text_box[1] - 2, text_box[2] + 2, text_box[3] + 2], fill="red")
            draw.text((r['x'], r['y']), tag_text, fill="white", font=font)

            mark_map[idx] = el

        annotated_path = Path("temp_annotated.png")
        image.save(annotated_path)
        return annotated_path, mark_map

    def _query_vision_model(self, image_path: Path, goal: str, mark_map: Dict[int, Dict[str, Any]]) -> Tuple[Optional[int], Optional[str]]:
        """
        Sends the annotated screenshot and accessibility tree snippet to GPT-4o.
        """
        import base64
        with open(image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

        context_summary = "\n".join([
            f"Tag #{idx}: <{el['tagName']} id='{el['idAttr']}' name='{el['nameAttr']}' role='{el['role']}'>{el['text'][:30]}</{el['tagName']}>"
            for idx, el in mark_map.items()
        ])

        prompt = f"""
You are an automated UI element finder. 
Goal: Find the target element corresponding to: '{goal}'.

Below is an annotated screenshot with numbered red tags over interactive elements, alongside the element metadata:

{context_summary}

Respond strictly in JSON format with two keys:
1. "tag_number": (Integer corresponding to the target tag)
2. "resilient_selector": (A robust, resilient Playwright CSS or XPath selector for this element, preferring text, ARIA attributes, or stable IDs over fragile absolute paths)

Example output:
{{
  "tag_number": 7,
  "resilient_selector": "button:has-text('Submit Order')"
}}
"""

        response = client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/png;base64,{encoded_image}"}
                        }
                    ]
                }
            ],
            max_tokens=300
        )

        res_data = json.loads(response.choices[0].message.content)
        tag_num = res_data.get("tag_number")
        selector = res_data.get("resilient_selector")

        return tag_num, selector


# ==========================================
# DIRECT USAGE EXAMPLE (Desktop & Web)
# ==========================================
if __name__ == "__main__":
    with sync_playwright() as p:
        # Works seamlessly for both Web Apps and Desktop UI (via Electron/Chromium Desktop wrappers)
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        # Load target site/app
        page.goto("https://demo.playwright.dev/todomvc/#/")

        engine = SelfHealingEngine(page)

        # Define custom action behavior
        def click_action(pg: Page, sel: str):
            pg.locator(sel).first.click()

        def fill_action(pg: Page, sel: str, text: str = "Buy Groceries"):
            pg.locator(sel).first.fill(text)
            pg.locator(sel).first.press("Enter")

        # Example 1: Trigger action with intentionally broken cached/default selector
        engine.execute_action(
            action_key="add_todo_input",
            goal_description="Input field for creating a new todo item",
            fallback_selector="#broken-input-id-that-will-fail",  # Will fail Step 1 and self-heal
            action_fn=lambda pg, sel: fill_action(pg, sel, "Build Self-Healing Engine"),
            verify_fn=lambda pg: pg.locator("text=Build Self-Healing Engine").is_visible(),
            timeout_ms=2000
        )

        # Example 2: Next run will use the healed selector from `selector_cache.json` instantly
        print("\n--- Running Second Time (Testing Cache Hit) ---")
        engine.execute_action(
            action_key="add_todo_input",
            goal_description="Input field for creating a new todo item",
            fallback_selector="#broken-input-id-that-will-fail",
            action_fn=lambda pg, sel: fill_action(pg, sel, "Test Cached Run"),
            verify_fn=lambda pg: pg.locator("text=Test Cached Run").is_visible(),
            timeout_ms=2000
        )

        browser.close()