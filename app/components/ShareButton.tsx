"use client";

import { useMemo, useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  async function shareOrCopy() {
    setStatus("idle");

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url || window.location.href);
        setStatus("copied");
        window.setTimeout(() => setStatus("idle"), 1200);
        return;
      }

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url || window.location.href;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (ok) {
        setStatus("copied");
        window.setTimeout(() => setStatus("idle"), 1200);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <button
      type="button"
      onClick={shareOrCopy}
      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-black text-white font-black uppercase rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_black] hover:shadow-[5px_5px_0px_0px_black] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-[2px_2px_0px_0px_black]"
      aria-label="Share this post"
    >
      {status === "copied" ? <Check size={16} /> : status === "error" ? <Copy size={16} /> : <Share2 size={16} />}
      {status === "copied" ? "Copied" : status === "error" ? "Copy link" : "Share"}
    </button>
  );
}

