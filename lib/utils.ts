import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Los tamaños de texto de tokens.md (text-small, text-body…) no son los de Tailwind: sin esto
// twMerge los confunde con colores y descarta `text-on-accent` al combinarlos.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "heading", "title", "body-lg", "body", "small", "label"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
