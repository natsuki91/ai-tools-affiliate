"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface SearchItem {
  label: string;
  href: string;
  type: "tool" | "comparison" | "blog";
}

const TYPE_LABELS: Record<SearchItem["type"], string> = {
  tool: "Tool",
  comparison: "Comparison",
  blog: "Blog",
};

interface HeroSearchProps {
  searchItems: SearchItem[];
}

const MAX_RESULTS = 8;

export function HeroSearch({ searchItems }: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const results =
    normalizedQuery.length < 2
      ? []
      : searchItems
          .filter((item) => item.label.toLowerCase().includes(normalizedQuery))
          .slice(0, MAX_RESULTS);

  const showDropdown = open && focused && results.length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full max-w-[600px]">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" aria-hidden>
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search tools, comparisons, blog… e.g. ChatGPT, Jasper"
          aria-label="Search tools and articles"
          aria-autocomplete="list"
          role="combobox"
          aria-expanded={showDropdown}
          className="w-full rounded-full border-2 border-border bg-background py-3 pl-11 pr-4 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {showDropdown && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-xl border border-border bg-surface py-2 shadow-lg"
        >
          {results.map((item, i) => (
            <li key={`${item.type}-${item.href}-${i}`} role="option" aria-selected={false}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-2 px-4 py-2.5 text-left text-text-primary hover:bg-card"
                onClick={() => setOpen(false)}
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 text-xs text-text-secondary">{TYPE_LABELS[item.type]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
