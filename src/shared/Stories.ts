import { Story } from "@/interfaces/Story";
import { extractIndex } from "@/lib/Stories";

// get all audiofiles from the folder
const allEntries = require.context("@/audio/stories/", false, /.mp3$/i);

// remove duplicates because apparently require.context always creates them
const audioFiles = [...new Set(allEntries.keys().map(allEntries))] as string[];
export const stories: Story[] = audioFiles.map(filepath => ({
  audioSrc: filepath,
  title: extractIndex(filepath),
  duration: "2:59",
}));

export const selectedStoriesKey = "selectedStories";
