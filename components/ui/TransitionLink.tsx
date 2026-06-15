"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { usePreloader } from "./PreloaderProvider";
import { AnchorHTMLAttributes } from "react";

type TransitionLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  children: React.ReactNode;
};

export default function TransitionLink({ href, onClick, children, ...props }: TransitionLinkProps) {
  const { startTransition } = usePreloader();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If the path is exactly the same, let default behavior or smooth scroll happen
    if (href.toString() === pathname || href.toString().startsWith("#")) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    startTransition(href.toString());

    if (onClick) onClick(e);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
