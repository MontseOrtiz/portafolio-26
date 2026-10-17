"use client";

import { useEffect, useRef, useState } from "react";

const FEEDBACK_MS = 2000;

type Props = {
  email: string;
  label: string;
  copied: string;
  ariaLabel: string;
  className: string;
};

// Copia el correo y muestra `copied` durante 2 s; el aviso se anuncia con aria-live="polite".
export function CopyEmailButton({ email, label, copied, ariaLabel, className }: Props) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Sin permiso de portapapeles el correo sigue siendo un link mailto: visible.
      return;
    }
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), FEEDBACK_MS);
  }

  return (
    <>
      <button type="button" onClick={copy} aria-label={ariaLabel} className={className}>
        {done ? copied : label}
      </button>
      <span aria-live="polite" className="sr-only">
        {done ? copied : ""}
      </span>
    </>
  );
}
