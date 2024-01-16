import { Story } from "@/interfaces/Story";
import { selectedStoriesKey } from "@/shared/Stories";
import path from "path";

export function getSelectedStoriesFromLocalStorage(): Story[] {
  return JSON.parse(localStorage.getItem(selectedStoriesKey) || "[]");
}

const textsDir = path.join(process.cwd(), "public/transcriptions");

export function getStoryTranscription(title: string): string {
  return "# Hi, *Plutwo*!";
}
