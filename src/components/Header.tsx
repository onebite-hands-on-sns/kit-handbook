"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const ACCENT_PRESETS = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0891b2",
];

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

export default function Header({ onToggleSidebar, onOpenSearch }: HeaderProps) {
  const { darkMode, toggleDarkMode, accentColor, setAccentColor } = useTheme();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker on outside click
  useEffect(() => {
    if (!colorPickerOpen) return;
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setColorPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [colorPickerOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[var(--header-height)] border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="mr-3 rounded-md p-1.5 hover:bg-[var(--muted)] lg:hidden"
            aria-label="메뉴 토글"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img src="/cube.png" alt="logo" className="h-5 w-5" />
            <span className="text-sm">한입 리액트 실전 라이브러리 Kit</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3.5 py-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] sm:flex"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
            <kbd className="ml-2 rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-md p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="다크모드 토글"
          >
            {darkMode ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Accent color picker */}
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setColorPickerOpen((prev) => !prev)}
              className="rounded-md p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              aria-label="악센트 컬러 변경"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  fill={accentColor}
                  stroke={accentColor}
                  strokeWidth="2"
                />
              </svg>
            </button>
            {colorPickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-[192px] rounded-lg border border-[var(--border)] bg-[var(--background)] p-2 shadow-lg">
                <p className="mb-2 px-1 text-[11px] font-medium text-[var(--muted-foreground)]">
                  테마 컬러
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ACCENT_PRESETS.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setAccentColor(color);
                        setColorPickerOpen(false);
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-full ring-offset-1 ring-offset-[var(--background)] transition-all hover:scale-110"
                      style={{
                        backgroundColor: color,
                        boxShadow:
                          accentColor === color
                            ? `0 0 0 2px var(--background), 0 0 0 4px ${color}`
                            : "none",
                      }}
                      aria-label={`악센트 컬러 ${color}`}
                    />
                  ))}
                  <label className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[var(--muted)] transition-all hover:scale-110">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-[var(--muted-foreground)]"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
