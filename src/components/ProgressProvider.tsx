"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ProgressContextType {
  completedSlugs: Set<string>;
  toggleComplete: (slug: string) => void;
  isComplete: (slug: string) => boolean;
  totalCompleted: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "handbook-progress";

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

export default function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletedSlugs(new Set(JSON.parse(stored)));
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSlugs]));
  }, [completedSlugs, mounted]);

  const toggleComplete = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (slug: string) => completedSlugs.has(slug),
    [completedSlugs]
  );

  return (
    <ProgressContext.Provider
      value={{ completedSlugs, toggleComplete, isComplete, totalCompleted: completedSlugs.size }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
