import { Story } from "@/interfaces/Story";
import { selectedStoriesKey } from "@/shared/Stories";

export function getSelectedStoriesFromLocalStorage(): Story[] {
  return JSON.parse(localStorage.getItem(selectedStoriesKey) || "[]");
}

export function getStoryTranscription(title: string): string {
  return "hello";
}
