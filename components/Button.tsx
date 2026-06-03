"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  /** Pass a rendered icon, e.g. icon={<ArrowRight size={16} />}. Any icon is allowed. */
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const BASE =
  "group inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap transition-all duration-200";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-white font-semibold shadow-[0_6px_20px_rgb(var(--gold-rgb)_/_0.28)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(var(--gold-rgb)_/_0.4)]",
  secondary:
    "text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5",
};

const SIZES: Record<Size, string> = {
  md: "h-[52px] px-7 text-[15px] gap-2",
  sm: "h-[40px] px-5 text-[13px] gap-1.5",
};

export default function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth,
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = [BASE, VARIANTS[variant], SIZES[size], fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");

  const iconEl = icon ? (
    <span className={`inline-flex ${iconPosition === "right" ? "transition-transform duration-200 group-hover:translate-x-1" : ""}`}>
      {icon}
    </span>
  ) : null;

  const content = (
    <>
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
