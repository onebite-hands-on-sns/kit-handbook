"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CURRICULUM } from "@/lib/curriculum";
import { useProgress } from "./ProgressProvider";

const totalPages = CURRICULUM.reduce((sum, s) => sum + s.pages.length, 0);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname.replace("/", "");
  const { isComplete, totalCompleted } = useProgress();

  const currentSectionIdx = CURRICULUM.findIndex((s) =>
    s.pages.some((p) => p.slug === currentSlug)
  );

  const [openSections, setOpenSections] = useState<Set<number>>(
    () => new Set(CURRICULUM.map((_, i) => i))
  );

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const progressPercent = totalPages > 0 ? Math.round((totalCompleted / totalPages) * 100) : 0;

  const nav = (
    <nav className="p-4">
      {/* Progress bar */}
      <div className="mb-4 rounded-lg border border-[var(--border)] bg-[var(--muted)] px-3 py-2.5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-[var(--foreground)]">진도율</span>
          <span className="text-[var(--muted-foreground)]">
            {totalCompleted}/{totalPages}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="mb-4">
        <Link
          href="/"
          className={`block rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors ${
            pathname === "/"
              ? "bg-[var(--primary)]/10 text-[var(--primary)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
          }`}
          onClick={onClose}
        >
          홈
        </Link>
      </div>
      {CURRICULUM.map((section, idx) => {
        const sectionCompleted = section.pages.filter((p) => isComplete(p.slug)).length;
        return (
          <div key={idx} className="mb-2">
            <button
              onClick={() => toggleSection(idx)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[13px] font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <span className="flex items-center gap-2 truncate">
                <span className="truncate">{section.section}</span>
                {sectionCompleted === section.pages.length && section.pages.length > 0 && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="text-[10px] font-normal text-[var(--muted-foreground)]">
                  {sectionCompleted}/{section.pages.length}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${
                    openSections.has(idx) ? "rotate-90" : ""
                  }`}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>
            {openSections.has(idx) && (
              <div className="ml-2 mt-1 space-y-0.5 border-l border-[var(--border)] pl-3">
                {section.pages.map((page) => {
                  const isActive = currentSlug === page.slug;
                  const completed = isComplete(page.slug);
                  return (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      onClick={onClose}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                        isActive
                          ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {completed ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="2.5"
                          className="shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-[var(--border)]" />
                      )}
                      <span className="truncate leading-tight">{page.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-[var(--header-height)] hidden h-[calc(100vh-var(--header-height))] w-[var(--sidebar-width)] overflow-y-auto border-r border-[var(--border)] bg-[var(--background)] lg:block">
        {nav}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-[var(--sidebar-width)] overflow-y-auto bg-[var(--background)] shadow-xl lg:hidden">
            <div className="flex h-[var(--header-height)] items-center border-b border-[var(--border)] px-4">
              <button
                onClick={onClose}
                className="rounded-md p-1.5 hover:bg-[var(--muted)]"
                aria-label="닫기"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {nav}
          </aside>
        </>
      )}
    </>
  );
}
