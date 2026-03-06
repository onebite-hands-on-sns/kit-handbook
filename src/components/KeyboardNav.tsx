"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAdjacentPages } from "@/lib/curriculum";

export default function KeyboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const slug = pathname.replace("/", "");
    if (!slug) return;

    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const { prev, next } = getAdjacentPages(slug);

      if (e.key === "ArrowLeft" && prev) {
        router.push(`/${prev.slug}`);
      } else if (e.key === "ArrowRight" && next) {
        router.push(`/${next.slug}`);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pathname, router]);

  return null;
}
