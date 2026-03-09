import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import LayoutShell from "@/components/LayoutShell";
import ThemeProvider from "@/components/ThemeProvider";
import ProgressProvider from "@/components/ProgressProvider";
import AuthGate from "@/components/AuthGate";

export const metadata: Metadata = {
    title: "Handbook - 한입 리액트 실전 라이브러리 Kit",
    description: "한입 React.js 실전 라이브러리 키트 강의의 핸드북입니다.",
    openGraph: {
        title: "한입 리액트 실전 라이브러리 Kit - Handbook",
        description: "한입 React.js 실전 라이브러리 키트 강의의 핸드북입니다.",
        images: [{ url: "/og-thumbnail.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "한입 리액트 실전 라이브러리 Kit - Handbook",
        description: "한입 React.js 실전 라이브러리 키트 강의의 핸드북입니다.",
        images: [{ url: "/og-thumbnail.png", width: 1200, height: 630 }],
    },
    robots: {
        index: false,
        follow: false,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
        nocache: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/cube.png" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                var dark = localStorage.getItem('theme-dark');
                if (dark === 'true' || (dark === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
                var accent = localStorage.getItem('theme-accent');
                if (accent) {
                  document.documentElement.style.setProperty('--primary', accent);
                }
              })();
            `,
                    }}
                />
                {/* Google tag (gtag.js) */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-7MKJJQB0J6"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7MKJJQB0J6');
            `,
                    }}
                />
            </head>
            <body>
                <ThemeProvider>
                    <AuthGate>
                        <ProgressProvider>
                            <LayoutShell>{children}</LayoutShell>
                        </ProgressProvider>
                    </AuthGate>
                </ThemeProvider>
            </body>
        </html>
    );
}
