"use client";

import Link from "next/link";
import { getAffiliateUrl, AFFILIATE_LINK_ATTRS } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

export interface AffiliateButtonProps {
  toolName: string;
  affiliateUrl?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  showDisclosure?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg",
  secondary: "bg-surface text-text-primary border border-border hover:bg-card",
  outline: "border-2 border-primary text-primary hover:bg-primary/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-full",
};

export function AffiliateButton({
  toolName,
  affiliateUrl,
  label,
  variant = "primary",
  size = "md",
  showDisclosure = false,
  className,
}: AffiliateButtonProps) {
  const href = affiliateUrl ?? getAffiliateUrl(toolName);
  const text = label ?? `Try ${toolName} Free`;

  return (
    <span className="inline-block">
      {showDisclosure && (
        <span className="mb-1 block text-xs text-text-secondary">Affiliate link</span>
      )}
      <Link
        href={href}
        className={cn(
          "inline-flex font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          variants[variant],
          sizes[size],
          className
        )}
        {...AFFILIATE_LINK_ATTRS}
      >
        {text}
      </Link>
    </span>
  );
}
