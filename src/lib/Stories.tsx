import fs from "fs";
import { Story } from "@/interfaces/Story";
import { selectedStoriesKey } from "@/shared/Stories";
import path from "path";
import mammoth from "mammoth";

export function getSelectedStoriesFromLocalStorage(): Story[] {
  return JSON.parse(localStorage.getItem(selectedStoriesKey) || "[]");
}

export async function getStoryTranscription(
  index: string
): Promise<string | null> {
  // find matching transcription file "01" -> "01_any-name.md"
  const dirPath = path.join(process.cwd(), "public/transcriptions");
  const foundTextfile = fs
    .readdirSync(dirPath)
    .find(filename => filename.startsWith(formatIndex(index)));

  // convert .docx to html string
  if (foundTextfile) {
    const textfilePath = path.join(dirPath, foundTextfile);
    try {
      const { value, messages } = await mammoth.convertToHtml({
        path: textfilePath,
      });
      if (messages) console.log(messages);
      return value;
    } catch (error) {
      console.error(error);
    }
  }
  return null;
}

export function extractIndex(filepath: string): string {
  return String(parseInt(filepath.replace(/^.*[\\/]/, "")));
}

function formatIndex(index: string): string {
  return index.padStart(2, "0");
}
