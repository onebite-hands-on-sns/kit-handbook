import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPageBySlug,
  getAdjacentPages,
  getAllSlugs,
  getSectionBySlug,
} from "@/lib/curriculum";
import { getPageContentBySlug } from "@/lib/notion";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CourseBanner from "@/components/CourseBanner";
import CompleteToggle from "@/components/CompleteToggle";
import TableOfContents from "@/components/TableOfContents";
import KeyboardNav from "@/components/KeyboardNav";
import ScrollToTop from "@/components/ScrollToTop";

export const revalidate = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  return {
    title: `${page.title} - 한입 리액트 실전 라이브러리 Kit`,
  };
}

export default async function HandbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPageContentBySlug(slug);
  if (!data) notFound();

  const { prev, next } = getAdjacentPages(slug);
  const section = getSectionBySlug(slug);

  // Reading time estimate (~200 words/min for Korean)
  const charCount = data.content.replace(/[#*`\[\]()>\-\n]/g, "").length;
  const readingTime = Math.max(1, Math.round(charCount / 500));

  return (
    <div className="relative">
      {/* TOC - right side, xl screens only */}
      <aside className="fixed right-8 top-[calc(var(--header-height)+2rem)] hidden w-52 xl:block">
        <TableOfContents />
      </aside>

      <KeyboardNav />
      <ScrollToTop />

      <div className="mb-8 border-b border-[var(--border)] pb-6">
        {section && (
          <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--primary)] uppercase">
            {section}
          </p>
        )}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {data.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">
          약 {readingTime}분
        </p>
      </div>
      <MarkdownRenderer content={data.content} />

      <div className="mt-10 flex justify-end">
        <CompleteToggle slug={slug} />
      </div>

      <div className="mt-6">
        <CourseBanner />
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
        {prev ? (
          <Link
            href={`/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
          >
            <span>{next.title}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
