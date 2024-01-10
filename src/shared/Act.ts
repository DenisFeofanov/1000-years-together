import { Act } from "@/interfaces/Act";
import prologueAudio from "@/audio/acts/01_prolog_short.mp3";
import beginningAudio from "@/audio/acts/02_zavyazka_short.mp3";
import middleAudio from "@/audio/acts/03_kulminatsiya_short.mp3";
import endAudio from "@/audio/acts/04_razvyazka_short.mp3";
import epilogueAudio from "@/audio/acts/05_epilog_short.mp3";

export const ACTS: Act[] = [
  { slug: "prologue", title: "Пролог", audioSrc: prologueAudio },
  { slug: "beginning", title: "Завязка", audioSrc: beginningAudio },
  { slug: "middle", title: "Кульминация", audioSrc: middleAudio },
  { slug: "end", title: "Развязка", audioSrc: endAudio },
  { slug: "epilogue", title: "Эпилог", audioSrc: epilogueAudio },
];
