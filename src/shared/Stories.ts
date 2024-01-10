import { Story } from "@/interfaces/Story";

// get all audiofiles from the folder
const allEntries = require.context("@/audio/stories/", false, /.mp3$/i);

// remove duplicates because apparently require.context always creates them
const audioFiles = [...new Set(allEntries.keys().map(allEntries))] as string[];
export const stories: Story[] = audioFiles.map(file => ({
  audioSrc: file,
  // get the number from filename
  title: String(parseInt(file.replace(/^.*[\\/]/, ""))),
  duration: "2:59",
}));

export const selectedStoriesKey = "selectedStories";
