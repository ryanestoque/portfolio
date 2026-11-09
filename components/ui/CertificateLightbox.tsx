"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface CertificateLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  onClose: () => void;
}

export default function CertificateLightbox({
  isOpen,
  imageSrc,
  altText,
  onClose,
}: CertificateLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, imageSrc]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (isOpen && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={altText || "Certificate preview"}
          className="lightbox-overlay"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center border border-[#dbeafe]/30 text-[#dbeafe]/80 hover:text-[#dbeafe] hover:border-[#dbeafe] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dbeafe] transition-colors duration-200"
            aria-label="Close certificate"
            data-cursor="target"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Certificate Image */}
          <motion.div
            className="relative w-[90vw] max-w-[900px] h-[80vh] flex items-center justify-center"
            initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { scale: 0.9, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.33, 1, 0.68, 1],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                role="status"
                aria-label="Loading certificate"
              >
                <div className="w-48 sm:w-64 h-[2px] bg-[#dbeafe]/20 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1/2 bg-[#dbeafe] rounded-full"
                    initial={prefersReducedMotion ? { x: "50%" } : { x: "-100%" }}
                    animate={prefersReducedMotion ? { x: "50%" } : { x: "200%" }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                    }
                  />
                </div>
              </div>
            )}
            <Image
              src={imageSrc}
              alt={altText}
              fill
              className={`object-contain transition-opacity duration-500 motion-reduce:transition-none ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes="90vw"
              loading="eager"
              onLoad={() => setIsLoading(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
