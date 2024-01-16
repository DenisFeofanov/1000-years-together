import fs from "fs";
import { Story } from "@/interfaces/Story";
import { selectedStoriesKey } from "@/shared/Stories";
import path from "path";

export function getSelectedStoriesFromLocalStorage(): Story[] {
  return JSON.parse(localStorage.getItem(selectedStoriesKey) || "[]");
}

export function getStoryTranscription(index: string): string | null {
  // find matching transcription file "01" -> "01_any-name.md"
  const dirPath = path.join(process.cwd(), "public/transcriptions");
  const foundTextfile = fs
    .readdirSync(dirPath)
    .find(filename => filename.startsWith(formatIndex(index)));

  // read file's content
  if (foundTextfile) {
    const textfilePath = path.join(dirPath, foundTextfile);
    const text = fs.readFileSync(textfilePath, "utf-8");

    return text;
  } else return null;
}

export function extractIndex(filepath: string): string {
  return String(parseInt(filepath.replace(/^.*[\\/]/, "")));
}

function formatIndex(index: string): string {
  return index.padStart(2, "0");
}
