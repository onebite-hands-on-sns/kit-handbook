"use client";

import { useProgress } from "./ProgressProvider";

export default function CompleteToggle({ slug }: { slug: string }) {
  const { isComplete, toggleComplete } = useProgress();
  const completed = isComplete(slug);

  return (
    <button
      onClick={() => toggleComplete(slug)}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        completed
          ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
          : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      }`}
    >
      {completed ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <span className="inline-block h-4 w-4 rounded-full border-2 border-current" />
      )}
      {completed ? "학습 완료" : "학습 완료로 표시"}
    </button>
  );
}
