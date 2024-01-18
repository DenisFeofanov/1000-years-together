import { Story } from "@/interfaces/Story";
import { selectedStoriesKey } from "@/shared/Stories";
import fs from "fs";
import mammoth from "mammoth";
import path from "path";
import { formatTime } from "./utils";

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

export async function getStories(): Promise<Story[]> {
  var mp3Duration = require("mp3-duration");

  // get audiopaths
  const clientPaths = require.context("@/audio/stories/", false, /.mp3$/i);
  // remove duplicates because apparently require.context always creates them
  const dedupAudioPaths = [
    ...new Set(clientPaths.keys().map(clientPaths)),
  ] as string[];

  // get durations
  const serverPaths = path.join(process.cwd(), "public/audio/stories");
  const files = fs.readdirSync(serverPaths);
  const filesFullpaths = files.map(file => path.join(serverPaths, file));

  // combine together in stories array
  const stories: Story[] = await Promise.all(
    filesFullpaths.map(async (file, index) => {
      // extract number from filename, e.g. "03"
      const title = String(parseInt(file.replace(/^.*[\\/]/, "")));

      return {
        audioSrc: dedupAudioPaths[index],
        title,
        duration: formatTime(await mp3Duration(file)),
        transcription: await getStoryTranscription(title),
      };
    })
  );

  return stories;
}
