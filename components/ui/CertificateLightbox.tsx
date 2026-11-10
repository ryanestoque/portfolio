"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { X, RotateCcw } from "lucide-react";

interface CertificateLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}

export default function CertificateLightbox({
  isOpen,
  imageSrc,
  altText,
  title,
  subtitle,
  onClose,
}: CertificateLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [closeHoverCount, setCloseHoverCount] = useState(0);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setIsCloseHovered(false);
    }
  }, [isOpen, imageSrc]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setRetryKey((k) => k + 1);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (focusable.length === 1) {
          e.preventDefault();
          first.focus();
          return;
        }

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  // Lock native scroll + Lenis smooth scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Focus management and keyboard listener
  useEffect(() => {
    if (isOpen) {
      if (!wasOpenRef.current) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
        wasOpenRef.current = true;
        requestAnimationFrame(() => {
          closeButtonRef.current?.focus();
        });
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      const toRestore = previousFocusRef.current;
      previousFocusRef.current = null;
      if (toRestore && typeof toRestore.focus === "function") {
        requestAnimationFrame(() => {
          toRestore.focus();
        });
      }
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} certificate` : altText || "Certificate preview"}
          className="lightbox-overlay p-4 sm:p-6 md:p-10"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-fit max-w-full flex flex-col items-center"
            initial={prefersReducedMotion ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { scale: 0.96, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.33, 1, 0.68, 1],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blueprint Header Bar — matches the exact width of the certificate below via w-0 min-w-full */}
            <div className="w-0 min-w-full flex items-center justify-between gap-4 pb-3 sm:pb-4 shrink-0">
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <span className="font-heading text-sm sm:text-base font-medium text-[#dbeafe] truncate">
                  {title || altText || "Certificate"}
                </span>
                {subtitle && (
                  <span className="text-xs uppercase tracking-[0.2em] text-[rgba(219,234,254,0.75)] truncate">
                    {subtitle}
                  </span>
                )}
              </div>

              {/* 44x44px Square Close Button with Blueprint Inversion Wipe */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                onMouseEnter={() => setIsCloseHovered(true)}
                onMouseLeave={() => {
                  setIsCloseHovered(false);
                  setCloseHoverCount((c) => c + 1);
                }}
                onFocus={(e) => {
                  if (e.currentTarget.matches(":focus-visible")) {
                    setIsCloseHovered(true);
                  }
                }}
                onBlur={() => setIsCloseHovered(false)}
                className="group relative w-11 h-11 shrink-0 inline-flex items-center justify-center border border-[rgba(219,234,254,0.3)] bg-[#172554] text-[#dbeafe] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dbeafe] transition-colors duration-300 motion-reduce:transition-none"
                aria-label="Close certificate preview"
                data-cursor="target"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-[#dbeafe] transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${
                    isCloseHovered
                      ? "origin-bottom scale-y-100"
                      : "scale-y-0 origin-top"
                  }`}
                />
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={
                        isCloseHovered
                          ? "close-hover"
                          : `close-unhover-${closeHoverCount}`
                      }
                      initial={
                        (closeHoverCount === 0 && !isCloseHovered) ||
                        prefersReducedMotion
                          ? false
                          : { y: "150%" }
                      }
                      animate={{ y: "0%" }}
                      exit={prefersReducedMotion ? undefined : { y: "-150%" }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className={`absolute inset-0 flex items-center justify-center ${
                        isCloseHovered ? "text-[#172554]" : "text-[#dbeafe]"
                      }`}
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </div>

            {/* Certificate Image Stage — shrinks tightly to the certificate's true aspect ratio */}
            <div
              className={`relative border border-[rgba(219,234,254,0.3)] bg-[#172554] flex items-center justify-center overflow-hidden ${
                isLoading || hasError
                  ? "w-[calc(100vw-2rem)] sm:w-[min(90vw,860px)] aspect-[4/3] max-h-[calc(100dvh-7.5rem)]"
                  : "w-fit h-fit"
              }`}
            >
              {isLoading && !hasError && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  role="status"
                  aria-live="polite"
                  aria-label="Loading certificate"
                >
                  <div className="w-48 sm:w-64 h-[2px] bg-[rgba(219,234,254,0.1)] overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 w-1/2 bg-[#dbeafe]"
                      initial={
                        prefersReducedMotion ? { x: "50%" } : { x: "-100%" }
                      }
                      animate={
                        prefersReducedMotion ? { x: "50%" } : { x: "200%" }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              repeat: Infinity,
                              duration: 1.2,
                              ease: "easeInOut",
                            }
                      }
                    />
                  </div>
                </div>
              )}

              {hasError ? (
                <div
                  role="alert"
                  className="flex flex-col items-center justify-center text-center px-6 py-8 max-w-md gap-4"
                >
                  <p className="font-heading text-lg font-medium text-[#dbeafe]">
                    Unable to load certificate image.
                  </p>
                  <p className="text-sm text-[rgba(219,234,254,0.75)] leading-relaxed">
                    The certificate preview could not be retrieved. Check your
                    connection and try loading it again.
                  </p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-2 inline-flex items-center gap-2.5 min-h-11 px-5 py-2.5 border border-[rgba(219,234,254,0.3)] bg-[#172554] text-[#dbeafe] hover:bg-[#dbeafe] hover:text-[#172554] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dbeafe] text-xs font-medium uppercase tracking-wider transition-colors duration-300 motion-reduce:transition-none"
                    data-cursor="target"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Try again</span>
                  </button>
                </div>
              ) : (
                imageSrc && (
                  <Image
                    key={`${imageSrc}-${retryKey}`}
                    src={imageSrc}
                    alt={altText}
                    width={1600}
                    height={1230}
                    style={{ aspectRatio: "auto" }}
                    className={`block w-auto h-auto max-w-[calc(100vw-2rem)] sm:max-w-[min(90vw,960px)] max-h-[calc(100dvh-7.5rem)] sm:max-h-[min(760px,calc(100dvh-7.5rem))] object-contain transition-opacity duration-500 motion-reduce:transition-none ${
                      isLoading ? "opacity-0" : "opacity-100"
                    }`}
                    sizes="(max-width: 1024px) 92vw, 960px"
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setHasError(true);
                    }}
                  />
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
