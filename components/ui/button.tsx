"use client";

import * as React from "react";
import TransitionLink from "./TransitionLink";
import { Slot } from "radix-ui";
import { motion, AnimatePresence } from "framer-motion";

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

    const content = (
      <div 
        className={`group relative inline-flex items-center border border-border overflow-hidden ${props.disabled ? 'bg-surface opacity-60 cursor-not-allowed' : 'bg-surface'} ${className || ""}`}
        onMouseEnter={() => { if (!props.disabled) setIsHovered(true) }}
        onMouseLeave={() => { if (!props.disabled) { setIsHovered(false); setHoverCount(c => c + 1); } }}
      >
        {/* Wipe Background - Covers the ENTIRE button container */}
        <div className="absolute left-0 right-0 top-0 bottom-auto h-0 bg-accent transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:top-auto group-hover:bottom-0 group-hover:h-full z-0" />
        
        {/* Icon Box */}
        {icon && (
          <div className="relative z-10 flex items-center justify-center w-11 h-11 bg-foreground text-background shrink-0">
            {icon}
          </div>
        )}
        
        {/* Main Text Area */}
        <div className="relative z-10 flex-1 px-5 md:px-6 py-3.5 flex items-center justify-center overflow-hidden min-h-[44px]">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={isHovered ? "hover" : `unhover-${hoverCount}`}
              initial={hoverCount === 0 && !isHovered ? false : { y: "150%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-150%" }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
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

    const outerClassName = `inline-block outline-none ${className?.includes('w-full') ? 'w-full block' : ''}`;

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
                target.scrollIntoView({ behavior: 'smooth' });
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
