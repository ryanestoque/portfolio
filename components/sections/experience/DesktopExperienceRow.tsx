"use client";

import { memo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import type { Experience } from "@/lib/experience-data";

/* ──────────────────────────────────────────────── */
/*  Types                                            */
/* ──────────────────────────────────────────────── */

export interface DesktopExperienceRowProps {
  exp: Experience;
  i: number;
  isHovered: boolean;
  isDimmed: boolean;
  onMouseEnterRow: (i: number) => void;
  onMouseLeaveRow: () => void;
  openCertificate: (src: string, company: string) => void;
}

/* ──────────────────────────────────────────────── */
/*  Component                                        */
/* ──────────────────────────────────────────────── */

function DesktopExperienceRowComponent({
  exp,
  i,
  isHovered,
  isDimmed,
  onMouseEnterRow,
  onMouseLeaveRow,
  openCertificate,
}: DesktopExperienceRowProps) {
  const prevHoveredRef = useRef(isHovered);
  const transitionKeyRef = useRef(0);

  if (prevHoveredRef.current !== isHovered) {
    prevHoveredRef.current = isHovered;
    transitionKeyRef.current += 1;
    // Reset button hover state if the row itself is no longer hovered
  }

  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [btnHoverCount, setBtnHoverCount] = useState(0);

  const effectiveBtnHover = isHovered && isHoveredBtn;

  return (
    <div
      data-exp-index={i}
      className="group relative border-b border-border overflow-hidden cursor-default transition-opacity duration-300"
      onMouseEnter={() => onMouseEnterRow(i)}
      onMouseLeave={() => {
        setIsHoveredBtn(false);
        onMouseLeaveRow();
      }}
      style={{ opacity: isDimmed ? 0.35 : 1 }}
      data-cursor="target"
    >
      {/* Wipe Background — strictly driven by `isHovered` so scroll & pointer never desync */}
      <div
        className={`pointer-events-none absolute left-0 right-0 bg-accent transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] z-0 ${
          isHovered ? "top-auto bottom-0 h-full" : "top-0 bottom-auto h-0"
        }`}
      />

      {/* Row Content */}
      <div className="relative z-10 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={transitionKeyRef.current}
            initial={transitionKeyRef.current === 0 ? false : { y: "150%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-150%" }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className={`pointer-events-none absolute inset-0 flex items-center justify-between gap-6 py-7 px-5 will-change-transform ${
              isHovered ? "text-background" : "text-text-primary"
            }`}
          >
            {/* Left Column: Company, Role, Date */}
            <div className="flex-1 min-w-0 flex items-center justify-between pr-4">
              <div className="flex flex-col">
                <span className="font-heading text-lg xl:text-xl font-semibold block">
                  {exp.company}
                </span>
                <span
                  className={`font-heading text-sm xl:text-base font-medium mt-1 block transition-colors duration-300 ${
                    isHovered ? "text-background/80" : "text-text-secondary"
                  }`}
                >
                  {exp.role}
                </span>
              </div>
              <span
                className={`text-sm tracking-wide whitespace-nowrap ml-6 transition-colors duration-300 ${
                  isHovered ? "text-background/70" : "text-text-tertiary"
                }`}
              >
                {exp.dateRange}
              </span>
            </div>

            {/* Right Column: Certificate Button */}
            <div className="pointer-events-auto flex-shrink-0 min-w-[80px] flex justify-end relative group/btn">
              <button
                onMouseEnter={() => setIsHoveredBtn(true)}
                onMouseLeave={() => {
                  setIsHoveredBtn(false);
                  setBtnHoverCount((c) => c + 1);
                }}
                onClick={(e) => {
                  if (!exp.certificateAvailable) return;
                  e.stopPropagation();
                  if (exp.certificate) openCertificate(exp.certificate, exp.company);
                }}
                disabled={!exp.certificateAvailable}
                className={`group/innerbtn relative inline-flex items-center justify-center w-[34px] h-[34px] border overflow-hidden transition-all duration-300 ${
                  exp.certificateAvailable
                    ? isHovered
                      ? "border-background/30 cursor-pointer"
                      : "border-border cursor-pointer hover:border-accent/40"
                    : isHovered
                      ? "border-background/20 text-background/50 cursor-not-allowed"
                      : "border-border/50 text-text-tertiary/50 cursor-not-allowed"
                }`}
                aria-label={
                  exp.certificateAvailable
                    ? `View ${exp.company} certificate`
                    : "Certificate not yet available"
                }
              >
                {/* Wipe Background (only if available) */}
                {exp.certificateAvailable && (
                  <span
                    className={`pointer-events-none absolute left-0 right-0 transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] z-0 ${
                      effectiveBtnHover
                        ? "top-auto bottom-0 h-full"
                        : "top-0 bottom-auto h-0"
                    } ${isHovered ? "bg-background" : "bg-accent"}`}
                  />
                )}

                {/* Icon Area */}
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                  {exp.certificateAvailable ? (
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={effectiveBtnHover ? "hover" : `unhover-${btnHoverCount}`}
                        initial={btnHoverCount === 0 && !effectiveBtnHover ? false : { y: "150%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-150%" }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className={`absolute inset-0 flex items-center justify-center will-change-transform ${
                          isHovered
                            ? effectiveBtnHover
                              ? "text-text-primary"
                              : "text-background"
                            : effectiveBtnHover
                              ? "text-background"
                              : "text-text-tertiary group-hover/innerbtn:text-text-primary"
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </span>
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 border text-xs tracking-wider whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none z-50 bg-surface-elevated text-text-secondary border-border">
                {exp.certificateAvailable ? "View certificate" : "Certificate not yet available"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Invisible Placeholder to maintain row height */}
        <div className="opacity-0 pointer-events-none flex items-center justify-between gap-6 py-7 px-5">
          <div className="flex-1 min-w-0 flex items-center justify-between pr-4">
            <div className="flex flex-col">
              <span className="font-heading text-lg xl:text-xl font-semibold block">
                {exp.company}
              </span>
              <span className="font-heading text-sm xl:text-base font-medium mt-1 block">
                {exp.role}
              </span>
            </div>
            <span className="text-sm tracking-wide whitespace-nowrap ml-6">
              {exp.dateRange}
            </span>
          </div>
          <div className="flex-shrink-0 min-w-[80px] flex justify-end">
            <button className="inline-flex items-center gap-1.5 px-2 py-2 border">
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const DesktopExperienceRow = memo(DesktopExperienceRowComponent);
export default DesktopExperienceRow;
