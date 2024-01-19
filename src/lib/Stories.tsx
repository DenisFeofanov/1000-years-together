import { Story } from "@/interfaces/Story";
import { selectedStoriesKey } from "@/shared/Stories";
import fs from "fs";
import DOMPurify from "isomorphic-dompurify";
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
      if (messages.length > 0) console.log(messages);
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
  const DEV = true;
  if (DEV) {
    const cachedStories = [
      {
        audioSrc:
          "/_next/static/chunks/public/audio/stories/01_Активист_Шиес.ec4720d4a609005c.mp3",
        title: "1",
        duration: "06:54",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/stories/02_Владимир.aca4d945ca7b909d.mp3",
        title: "2",
        duration: "07:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/stories/03_Екатерина.6045691106a857e9.mp3",
        title: "3",
        duration: "07:32",
        transcription:
          "<p>Женщина: Но у нас всего 8 квартир, и т…а как бы это сказать – без смысла …  </p>",
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/stories/04_Дарья_море.0fdf49f914b61a10.mp3",
        title: "4",
        duration: "07:14",
        transcription:
          "<p>Я родилась в деревне Верхняя Золотица,…е, полная свобода и ни одной мысли...</p>",
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/stories/05_Шкатулка.607c99c9b52a4703.mp3",
        title: "5",
        duration: "07:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "6",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "7",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "8",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "9",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "10",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "11",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "12",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "13",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "14",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "15",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "16",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "17",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "18",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "19",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "20",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "21",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "22",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "23",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "24",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "25",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "26",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "27",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "28",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "29",
        duration: "03:32",
        transcription: null,
      },
      {
        audioSrc:
          "/_next/static/chunks/public/audio/test/test.519944c14a027521.mp3",
        title: "30",
        duration: "03:32",
        transcription: null,
      },
    ];
    return cachedStories;
  }

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
      let transcription = await getStoryTranscription(title);
      transcription &&= DOMPurify.sanitize(transcription);

      return {
        audioSrc: dedupAudioPaths[index],
        title,
        duration: formatTime(await mp3Duration(file)),
        transcription,
      };
    })
  );

  //  adding dummy audio to preserve space
  const testclientPaths = require.context("@/audio/test/", false, /.mp3$/i);
  // remove duplicates because apparently require.context always creates them

  const testdedupAudioPaths = [
    ...new Set(testclientPaths.keys().map(testclientPaths)),
  ] as string[];

  const testfilePath = path.join(process.cwd(), "public/audio/test/test.mp3");
  for (let i = 6; i <= 30; i++) {
    stories.push({
      audioSrc: testdedupAudioPaths[0],
      title: String(i),
      duration: formatTime(await mp3Duration(testfilePath)),
      transcription: null,
    });
  }

  return stories;
}
