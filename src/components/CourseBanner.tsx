const COURSES = [
  {
    title: "한입 리액트",
    desc: "JS 기초부터 React 실전까지 한 번에",
    url: "https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%EB%A6%AC%EC%95%A1%ED%8A%B8",
    emoji: "⚛️",
  },
  {
    title: "한입 타입스크립트",
    desc: "프론트엔드 필수 기술, 타입스크립트 마스터",
    url: "https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8",
    emoji: "📗",
  },
  {
    title: "한입 Next.js",
    desc: "세상에서 가장 친절한 Next.js 강의",
    url: "https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-nextjs",
    emoji: "▲",
  },
];

export default function CourseBanner() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-5">
      <p className="mb-1 text-xs font-semibold text-[var(--primary)]">
        이정환의 한입 시리즈
      </p>
      <p className="mb-4 text-sm text-[var(--muted-foreground)]">
        이 핸드북이 도움이 되셨다면, 다른 강의도 확인해보세요
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {COURSES.map((course) => (
          <a
            key={course.url}
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-3 transition-colors hover:border-[var(--primary)]"
          >
            <span className="mt-0.5 text-lg leading-none">{course.emoji}</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)]">
                {course.title}
              </p>
              <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                {course.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
