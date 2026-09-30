"use client";

import { useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export function CodeBlock(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    await navigator.clipboard.writeText(text.replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="code-block group">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        className="copy-button"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      </button>
    </div>
  );
}
