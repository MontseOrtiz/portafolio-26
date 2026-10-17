import { bookDiary } from "./book-diary";
import { destinoChina } from "./destino-china";
import { wodTracker } from "./wod-tracker";
import type { CaseStudy } from "./types";

export const caseStudies: Record<string, CaseStudy> = {
  "book-diary": bookDiary,
  "wod-tracker": wodTracker,
  "destino-china": destinoChina,
};
