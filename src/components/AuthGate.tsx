"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "handbook-auth";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setAuthed(true);
    }
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem(STORAGE_KEY, "true");
        setAuthed(true);
      } else {
        setError(true);
        setTimeout(() => setError(false), 1500);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  if (!mounted) return null;

  if (authed) return <>{children}</>;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">
      {/* Animated background blobs */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(80px, -60px) scale(1.1); }
          50% { transform: translate(-40px, 40px) scale(0.95); }
          75% { transform: translate(60px, 80px) scale(1.05); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-70px, 50px) scale(1.15); }
          50% { transform: translate(50px, -30px) scale(0.9); }
          75% { transform: translate(-30px, -70px) scale(1.1); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 60px) scale(1.1); }
          66% { transform: translate(-50px, -40px) scale(0.95); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>

      {/* Floating grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "gridMove 8s linear infinite",
        }}
      />

      {/* Blob 1 - primary color, top */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
        style={{ background: "var(--primary)", animation: "blob1 12s ease-in-out infinite" }}
      />
      {/* Blob 2 - purple, left */}
      <div
        className="pointer-events-none absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full bg-purple-500 opacity-10 blur-[100px]"
        style={{ animation: "blob2 15s ease-in-out infinite" }}
      />
      {/* Blob 3 - cyan, right */}
      <div
        className="pointer-events-none absolute bottom-[10%] right-[10%] h-[350px] w-[350px] rounded-full bg-cyan-400 opacity-10 blur-[100px]"
        style={{ animation: "blob3 10s ease-in-out infinite" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Thumbnail with glow */}
        <div className="relative mx-auto mb-8 w-full max-w-sm">
          <div
            className="absolute inset-0 scale-90 rounded-2xl opacity-40 blur-2xl"
            style={{ background: "var(--primary)" }}
          />
          <img
            src="/thumbnail.gif"
            alt="한입 리액트 실전 라이브러리 Kit"
            className="relative w-full rounded-2xl shadow-2xl"
          />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">
          한입 리액트 실전 라이브러리 Kit
        </h1>
        <p className="mb-1 text-base text-neutral-400">Handbook</p>
        <p className="mb-8 text-sm text-neutral-500">
          수강생 전용 핸드북입니다. 비밀번호를 입력해주세요.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="비밀번호"
              autoFocus
              className={`w-full rounded-xl border bg-white/5 px-5 py-4 pr-12 text-center text-sm tracking-widest text-white outline-none backdrop-blur transition-all placeholder:tracking-normal placeholder:text-neutral-600 ${
                error
                  ? "border-red-500/50 bg-red-500/5"
                  : "border-white/10 focus:border-white/25 focus:bg-white/[0.07]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-300"
            >
              {showPw ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl py-4 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: "var(--primary)" }}
          >
            입장하기
          </button>
          <div className="h-5">
            {error && (
              <p className="text-xs text-red-400">
                비밀번호가 올바르지 않습니다
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
