"use client";

import { memo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  onFocusRow: (i: number) => void;
  onBlurRow: () => void;
  onBtnHoverChange: (hovered: boolean) => void;
  openCertificate: (exp: Experience) => void;
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
  onFocusRow,
  onBlurRow,
  onBtnHoverChange,
  openCertificate,
}: DesktopExperienceRowProps) {
  const prevHoveredRef = useRef(isHovered);
  const transitionKeyRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  if (prevHoveredRef.current !== isHovered) {
    prevHoveredRef.current = isHovered;
    transitionKeyRef.current += 1;
  }

  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [btnHoverCount, setBtnHoverCount] = useState(0);

  const effectiveBtnHover = isHovered && isHoveredBtn;
  const tooltipId = `cert-tooltip-${exp.id}`;

  return (
    <div
      data-exp-index={i}
      tabIndex={0}
      role="group"
      aria-label={`${exp.company}, ${exp.role}, ${exp.dateRange}`}
      className="group relative border-b border-border overflow-hidden cursor-default transition-opacity duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      onMouseEnter={() => onMouseEnterRow(i)}
      onMouseLeave={() => {
        setIsHoveredBtn(false);
        onBtnHoverChange(false);
        onMouseLeaveRow();
      }}
      onFocus={(e) => {
        if (e.target === e.currentTarget) {
          onFocusRow(i);
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsHoveredBtn(false);
          onBtnHoverChange(false);
          onBlurRow();
        }
      }}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ") &&
          exp.certificateAvailable &&
          exp.certificate
        ) {
          e.preventDefault();
          openCertificate(exp);
        }
      }}
      style={{ opacity: isDimmed ? 0.35 : 1 }}
      data-cursor="target"
    >
      {/* Screen-reader accessible description */}
      <span className="sr-only">{exp.description}</span>

      {/* Wipe Background — compositor-driven scaleY strictly synced to `isHovered` */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${
          isHovered ? "origin-bottom scale-y-100" : "origin-top scale-y-0"
        }`}
      />

      {/* Row Content */}
      <div className="relative z-10 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={transitionKeyRef.current}
            initial={
              transitionKeyRef.current === 0 || prefersReducedMotion
                ? false
                : { y: "150%" }
            }
            animate={{ y: "0%" }}
            exit={prefersReducedMotion ? undefined : { y: "-150%" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.33, 1, 0.68, 1],
            }}
            className={`pointer-events-none absolute inset-0 flex items-center justify-between gap-6 py-7 px-5 ${
              isHovered
                ? "text-background will-change-transform"
                : "text-text-primary"
            }`}
          >
            {/* Left Column: Company, Role, Date */}
            <div className="flex-1 min-w-0 flex items-center justify-between pr-4">
              <div className="flex flex-col min-w-0">
                <span className="font-heading text-lg xl:text-xl font-semibold block">
                  {exp.company}
                </span>
                <span
                  className={`font-heading text-sm xl:text-base font-medium mt-1 block transition-colors duration-300 motion-reduce:transition-none ${
                    isHovered ? "text-background/80" : "text-text-secondary"
                  }`}
                >
                  {exp.role}
                </span>
              </div>
              <span
                className={`text-sm tracking-wide whitespace-nowrap ml-6 transition-colors duration-300 motion-reduce:transition-none ${
                  isHovered ? "text-background/70" : "text-text-tertiary"
                }`}
              >
                {exp.dateRange}
              </span>
            </div>

            {/* Right Column: Certificate Button (44x44px per DESIGN.md button-wipe-icon-box) */}
            <div className="pointer-events-auto flex-shrink-0 min-w-[80px] flex justify-end items-center relative group/btn">
              <button
                type="button"
                onMouseEnter={() => {
                  setIsHoveredBtn(true);
                  onBtnHoverChange(true);
                }}
                onMouseLeave={() => {
                  setIsHoveredBtn(false);
                  onBtnHoverChange(false);
                  setBtnHoverCount((c) => c + 1);
                }}
                onFocus={() => {
                  onFocusRow(i);
                  setIsHoveredBtn(true);
                  onBtnHoverChange(true);
                }}
                onBlur={() => {
                  setIsHoveredBtn(false);
                  onBtnHoverChange(false);
                }}
                onClick={(e) => {
                  if (!exp.certificateAvailable) return;
                  e.stopPropagation();
                  if (exp.certificate) openCertificate(exp);
                }}
                aria-disabled={!exp.certificateAvailable}
                aria-describedby={tooltipId}
                className={`group/innerbtn relative inline-flex items-center justify-center w-11 h-11 border overflow-hidden transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  exp.certificateAvailable
                    ? isHovered
                      ? "border-background/30 cursor-pointer focus-visible:outline-background"
                      : "border-border cursor-pointer hover:border-accent/40 focus-visible:outline-accent"
                    : isHovered
                      ? "border-background/20 text-background/50 cursor-not-allowed focus-visible:outline-background"
                      : "border-border/50 text-text-tertiary/50 cursor-not-allowed focus-visible:outline-accent"
                }`}
                aria-label={
                  exp.certificateAvailable
                    ? `View ${exp.company} certificate`
                    : `${exp.company} — certificate not yet available`
                }
              >
                {/* Wipe Background (compositor-driven scaleY, only if available) */}
                {exp.certificateAvailable && (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${
                      effectiveBtnHover
                        ? "origin-bottom scale-y-100"
                        : "origin-top scale-y-0"
                    } ${isHovered ? "bg-background" : "bg-accent"}`}
                  />
                )}

                {/* Icon Area */}
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                  {exp.certificateAvailable ? (
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={effectiveBtnHover ? "hover" : `unhover-${btnHoverCount}`}
                        initial={
                          (btnHoverCount === 0 && !effectiveBtnHover) ||
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
                          isHovered
                            ? effectiveBtnHover
                              ? "text-text-primary"
                              : "text-background"
                            : effectiveBtnHover
                              ? "text-background"
                              : "text-text-tertiary group-hover/innerbtn:text-text-primary"
                        }`}
                      >
                        <FileText className="w-5 h-5" aria-hidden="true" />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <FileText className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              </button>

              {/* Horizontal Tooltip — anchored to the left of the button so row vertical overflow never clips it */}
              <div
                id={tooltipId}
                role="tooltip"
                className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 border text-xs tracking-wider whitespace-nowrap opacity-0 group-hover/btn:opacity-100 group-focus-within/btn:opacity-100 transition-opacity duration-300 motion-reduce:transition-none pointer-events-none z-50 bg-surface-elevated text-text-primary border-border"
              >
                {exp.certificateAvailable
                  ? "View certificate"
                  : "Certificate not yet available"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Invisible Placeholder to maintain row height (hidden from assistive tech) */}
        <div
          aria-hidden="true"
          className="opacity-0 pointer-events-none select-none flex items-center justify-between gap-6 py-7 px-5"
        >
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
            <div className="w-11 h-11 border" />
          </div>
        </div>
      </div>
    </div>
  );
}

const DesktopExperienceRow = memo(DesktopExperienceRowComponent);
export default DesktopExperienceRow;
