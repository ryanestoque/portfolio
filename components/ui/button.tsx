"use client";

import * as React from "react";
import TransitionLink from "./TransitionLink";
import { Slot } from "radix-ui";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  icon?: React.ReactNode;
  asChild?: boolean;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, href, icon, children, asChild, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [hoverCount, setHoverCount] = React.useState(0);
    const prefersReducedMotion = useReducedMotion();

    const content = (
      <div
        className={`group relative inline-flex items-center border border-border overflow-hidden ${props.disabled ? 'bg-surface opacity-60 cursor-not-allowed' : 'bg-surface'} ${className || ""}`}
        onMouseEnter={() => { if (!props.disabled && window.innerWidth >= 768) setIsHovered(true) }}
        onMouseLeave={() => { if (!props.disabled && isHovered) { setIsHovered(false); setHoverCount(c => c + 1); } }}
      >
        {/* Wipe Background - Covers the ENTIRE button container */}
        <div className={`absolute inset-0 bg-accent scale-y-0 origin-top transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${!props.disabled ? 'group-hover:origin-bottom group-hover:scale-y-100' : ''}`} />

        {/* Icon Box */}
        {icon && (
          <div className="relative z-10 flex items-center justify-center w-11 h-11 bg-foreground text-background shrink-0">
            {icon}
          </div>
        )}

        {/* Main Text Area */}
        <div className="relative z-10 flex-1 px-3 sm:px-5 md:px-6 py-3.5 flex items-center justify-center overflow-hidden min-h-[44px]">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={isHovered ? "hover" : `unhover-${hoverCount}`}
              initial={(hoverCount === 0 && !isHovered) || prefersReducedMotion ? false : { y: "150%" }}
              animate={{ y: "0%" }}
              exit={prefersReducedMotion ? undefined : { y: "-150%" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.33, 1, 0.68, 1] }}
              className={`absolute flex items-center justify-center inset-0 text-xs font-medium uppercase tracking-wider whitespace-nowrap ${isHovered ? 'text-background' : 'text-text-primary'}`}
            >
              {children}
            </motion.span>
          </AnimatePresence>
          {/* Invisible placeholder to maintain width since the absolute span doesn't take up space */}
          <span className="opacity-0 pointer-events-none text-xs font-medium uppercase tracking-wider whitespace-nowrap">
            {children}
          </span>
        </div>
      </div>
    );

    const outerClassName = `inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className?.includes('w-full') ? 'w-full block' : ''}`;

    if (asChild) {
      return (
        <Slot.Root className={outerClassName} ref={ref as any} {...props}>
          {content}
        </Slot.Root>
      )
    }

    if (href) {
      const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf');

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={outerClassName} ref={ref as any} {...(props as any)}>
            {content}
          </a>
        );
      }

      if (href.startsWith('#')) {
        return (
          <a
            href={href}
            className={outerClassName}
            ref={ref as any}
            onClick={(e) => {
              if (props.onClick) props.onClick(e as any);
              const target = document.querySelector(href);
              if (target) {
                e.preventDefault();
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
              }
            }}
            {...(props as any)}
          >
            {content}
          </a>
        );
      }

      return (
        <TransitionLink href={href} className={outerClassName} ref={ref as any} {...(props as any)}>
          {content}
        </TransitionLink>
      );
    }

    return (
      <button className={outerClassName} ref={ref as any} {...props}>
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
