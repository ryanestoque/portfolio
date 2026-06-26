"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, imageSrc]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200"
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
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Certificate Image */}
          <motion.div
            className="relative w-[90vw] max-w-[900px] h-[80vh] flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 sm:w-64 h-[2px] bg-foreground/20 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute inset-y-0 left-0 w-1/2 bg-foreground rounded-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
            <Image
              src={imageSrc}
              alt={altText}
              fill
              className={`object-contain transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              sizes="90vw"
              priority
              onLoad={() => setIsLoading(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
