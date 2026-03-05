"use client";

import { useState } from "react";

export default function ImageZoom(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        {...props}
        onClick={() => setOpen(true)}
        className="cursor-zoom-in"
        style={{ borderRadius: 8, border: "1px solid var(--border)" }}
      />
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <img
            src={props.src}
            alt={props.alt ?? ""}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
