import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";
import CourseBanner from "@/components/CourseBanner";

export default function HomePage() {
  const firstPage = CURRICULUM[0].pages[0];

  return (
    <div>
      {/* Hero */}
      <div className="-mx-6 -mt-8 mb-10 overflow-hidden rounded-b-2xl bg-[#0a0a0a] px-6 py-10 sm:rounded-2xl sm:mx-0 sm:mt-0">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-6 w-full max-w-md overflow-hidden rounded-xl">
            <img
              src="/thumbnail.gif"
              alt="한입 리액트 실전 라이브러리 Kit"
              className="w-full"
            />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">
            한입 리액트 실전 라이브러리 Kit
          </h1>
          <p className="mb-6 text-sm text-neutral-400">
            &ldquo;한입 React.js 실전 라이브러리 키트&rdquo; 강의의 핸드북입니다
          </p>
          <Link
            href={`/${firstPage.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            핸드북 시작하기
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
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-base font-semibold">커리큘럼</h2>
        {CURRICULUM.map((section, idx) => (
          <div key={idx}>
            <h3 className="mb-2 text-base font-semibold text-[var(--foreground)]">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="block rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <CourseBanner />
      </div>
    </div>
  );
}
