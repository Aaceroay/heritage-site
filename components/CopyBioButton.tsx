"use client";

import { useState } from "react";
import { Button } from "./Button";

export function CopyBioButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; fail silently, text remains selectable.
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={handleCopy} aria-live="polite">
      {copied ? copiedLabel : label}
    </Button>
  );
}
