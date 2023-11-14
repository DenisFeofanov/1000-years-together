import { Act } from "@/interfaces/Act";
import audioSrc from "@/../public/stories/test.mp3";

export const ACTS: Act[] = [
  { slug: "prologue", title: "Пролог", audioSrc },
  { slug: "beginning", title: "Завязка", audioSrc },
  { slug: "middle", title: "Кульминация", audioSrc },
  { slug: "end", title: "Развязка", audioSrc },
  { slug: "epilogue", title: "Эпилог", audioSrc },
];
