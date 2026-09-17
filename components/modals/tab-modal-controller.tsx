"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, SERVICES } from "@/lib/constants";
import { ProductModal } from "./product-modal";
import { ServiceModal } from "./service-modal";
import { ContactDrawer } from "./contact-drawer";
import { 
  modalBackdropVariants, 
  modalContentVariants, 
  drawerVariants 
} from "@/lib/motion";

export function TabModalController() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productParam = searchParams.get("product");
  const tabParam = searchParams.get("tab");
  const modalParam = searchParams.get("modal");

  // Determine active item
  const selectedProduct = PRODUCTS.find((p) => p.queryParam === productParam || p.id === productParam);
  const selectedService = SERVICES.find((s) => s.queryParam === tabParam || s.id === tabParam)
    || (tabParam === "workforce" ? SERVICES.find((s) => s.id === "multiagent-systems") : undefined)
    || (tabParam === "automations" || tabParam === "autopilot" || tabParam === "orchestrator" ? SERVICES.find((s) => s.id === "rpa-automation") : undefined)
    || (tabParam === "apps" ? SERVICES.find((s) => s.id === "websites") : undefined);
  const isContactModal = modalParam === "contact";

  const isAnyModalOpen = Boolean(selectedProduct || selectedService || isContactModal);

  // Close helper
  const closeModal = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    params.delete("tab");
    params.delete("modal");
    params.delete("view");
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, router]);

  const openContactFromModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    params.delete("tab");
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAnyModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnyModalOpen, closeModal]);


  // Lock body scroll when modal is active
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyModalOpen]);

  return (
    <AnimatePresence>
      {isAnyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Blur */}
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Contact Slide-over Drawer */}
          {isContactModal && (
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-0 bottom-0 w-full max-w-lg z-10"
            >
              <ContactDrawer onClose={closeModal} />
            </motion.div>
          )}

          {/* Product Deep-Dive Modal */}
          {selectedProduct && (
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-3xl p-4 z-10 mx-auto"
            >
              <ProductModal
                product={selectedProduct}
                onClose={closeModal}
                onBookCall={openContactFromModal}
              />
            </motion.div>
          )}

          {/* Service Deep-Dive Modal */}
          {selectedService && (
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-3xl p-4 z-10 mx-auto"
            >
              <ServiceModal
                service={selectedService}
                onClose={closeModal}
                onBookCall={openContactFromModal}
              />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
