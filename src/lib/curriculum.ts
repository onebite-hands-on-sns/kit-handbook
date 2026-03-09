export interface Page {
    id: string;
    title: string;
    slug: string;
}

export interface Section {
    section: string;
    pages: Page[];
}

export const CURRICULUM: Section[] = [
    {
        section: "02. Tailwind CSS",
        pages: [
            {
                id: "3114d9b4-7b7c-8023-bbb6-edc640c621ba",
                title: "1. Tailwind CSS를 소개합니다.",
                slug: "tailwind-intro",
            },
            {
                id: "3114d9b4-7b7c-80c3-a586-f9af992af2b4",
                title: "2. Tailwind CSS 핵심 정리 1",
                slug: "tailwind-core-1",
            },
            {
                id: "3114d9b4-7b7c-80c8-8975-da15847d9e78",
                title: "3. Tailwind CSS 핵심 정리 2",
                slug: "tailwind-core-2",
            },
        ],
    },
    {
        section: "03. 사전준비 - 스타일링과 라우팅",
        pages: [
            {
                id: "3114d9b4-7b7c-80b6-b97c-dbdec12c30d2",
                title: "1. Shadcn/ui를 소개합니다",
                slug: "shadcn-intro",
            },
            {
                id: "3114d9b4-7b7c-8056-8d85-d162ecdbcf42",
                title: "2. Shadcn/ui 핵심정리 1",
                slug: "shadcn-core-1",
            },
            {
                id: "3114d9b4-7b7c-8032-9dfc-fbfbae9e7265",
                title: "3. Shadcn/ui 핵심정리 2",
                slug: "shadcn-core-2",
            },
            {
                id: "3114d9b4-7b7c-80d6-86b1-c6a3bcd55623",
                title: "4. React Router V7 핵심정리",
                slug: "react-router-v7",
            },
        ],
    },
    {
        section: "04. Zustand를 이용한 전역 상태관리",
        pages: [
            {
                id: "3114d9b4-7b7c-80c1-b960-c8d48b02034e",
                title: "1. 전역 상태 관리와 Zustand",
                slug: "zustand-intro",
            },
            {
                id: "3114d9b4-7b7c-808c-bd3c-f106ab77d4fd",
                title: "2. Zustand 기본 사용법 1",
                slug: "zustand-basic-1",
            },
            {
                id: "3114d9b4-7b7c-8086-a3a4-d1e81411dbf9",
                title: "3. Zustand 기본 사용법 2",
                slug: "zustand-basic-2",
            },
            {
                id: "3114d9b4-7b7c-80bf-bba4-c032c7528ac8",
                title: "4. Zustand 미들웨어 1",
                slug: "zustand-middleware-1",
            },
            {
                id: "3114d9b4-7b7c-8011-8f5a-c0bab8e4edc5",
                title: "5. Zustand 미들웨어 2",
                slug: "zustand-middleware-2",
            },
            {
                id: "3114d9b4-7b7c-8063-957f-f290d7970272",
                title: "6. 투두리스트 UI 구현하기",
                slug: "zustand-todo-ui",
            },
            {
                id: "3114d9b4-7b7c-808b-a9e9-fd94a58251b1",
                title: "7. 투드리스트 기능 구현하기",
                slug: "zustand-todo-feature",
            },
        ],
    },
    {
        section: "05. 서버 상태관리와 TanstackQuery",
        pages: [
            {
                id: "3114d9b4-7b7c-809f-96ec-c6084009c192",
                title: "1. 서버 상태 관리란?",
                slug: "tanstack-intro",
            },
            {
                id: "3114d9b4-7b7c-8081-b905-fba3af0f5e0e",
                title: "2. 실습용 서버 설정하기",
                slug: "tanstack-server-setup",
            },
            {
                id: "3114d9b4-7b7c-8052-ad02-ceb1389a2cb8",
                title: "3. 데이터 조회 요청 관리하기",
                slug: "tanstack-query-basics",
            },
            {
                id: "3114d9b4-7b7c-802c-a0ed-ffb8f51318b0",
                title: "4. 캐싱 메커니즘 이해하기 1",
                slug: "tanstack-caching-1",
            },
            {
                id: "3114d9b4-7b7c-80c7-9a9a-c4a0e58174a4",
                title: "5. 캐싱 메커니즘 이해하기 2",
                slug: "tanstack-caching-2",
            },
            {
                id: "3114d9b4-7b7c-80c8-8abb-ffd784b6232d",
                title: "6. 데이터 수정 요청 관리하기 (useMutation)",
                slug: "tanstack-mutation",
            },
            {
                id: "3114d9b4-7b7c-8019-8ef6-fa0ffb2b8555",
                title: "7. 캐시 데이터 다루기 1 - 데이터 무효화 하기",
                slug: "tanstack-invalidation",
            },
            {
                id: "3114d9b4-7b7c-8098-987c-dfed87e1b1e4",
                title: "8. 캐시 데이터 다루기 2 - 응답 결과값 이용하기",
                slug: "tanstack-cache-response",
            },
            {
                id: "3114d9b4-7b7c-80b3-b67c-f94dc23e68d2",
                title: "9. 캐시 데이터 다루기 3 - 낙관적 업데이트 (1)",
                slug: "tanstack-optimistic-1",
            },
            {
                id: "3114d9b4-7b7c-80c8-b076-f921f7e700c6",
                title: "10. 캐시 데이터 다루기 4 - 낙관적 업데이트 (2)",
                slug: "tanstack-optimistic-2",
            },
            {
                id: "3114d9b4-7b7c-8027-9611-d2c78783aba2",
                title: "11. 투두 삭제 기능 만들기",
                slug: "tanstack-todo-delete",
            },
            {
                id: "3114d9b4-7b7c-80f4-ac89-d8544b7d9b0d",
                title: "12. 캐시 정규화하기 1",
                slug: "tanstack-normalization-1",
            },
            {
                id: "3114d9b4-7b7c-8050-a3a2-dd9e0f1d2b14",
                title: "13. 캐시 정규화하기 2",
                slug: "tanstack-normalization-2",
            },
        ],
    },
    {
        section: "🎟️ 실전 프로젝트 SNS편 할인 쿠폰",
        pages: [
            {
                id: "31e4d9b4-7b7c-804f-82ed-deb365ec49d2",
                title: "한 입 크기로 잘라먹는 실전 프로젝트 SNS편 할인 쿠폰",
                slug: "sns-project-coupon",
            },
        ],
    },
];

export function getAllSlugs(): string[] {
    return CURRICULUM.flatMap((section) =>
        section.pages.map((page) => page.slug),
    );
}

export function getPageBySlug(slug: string): Page | undefined {
    for (const section of CURRICULUM) {
        const page = section.pages.find((p) => p.slug === slug);
        if (page) return page;
    }
    return undefined;
}

export function getSectionBySlug(slug: string): string | undefined {
    for (const section of CURRICULUM) {
        if (section.pages.some((p) => p.slug === slug)) return section.section;
    }
    return undefined;
}

export function getAdjacentPages(slug: string): { prev?: Page; next?: Page } {
    const allPages = CURRICULUM.flatMap((s) => s.pages);
    const idx = allPages.findIndex((p) => p.slug === slug);
    return {
        prev: idx > 0 ? allPages[idx - 1] : undefined,
        next: idx < allPages.length - 1 ? allPages[idx + 1] : undefined,
    };
}
