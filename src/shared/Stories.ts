import { Story } from "@/interfaces/Story";
import audio from "@/../public/stories/test.mp3";

const duration = "3:00";
//  new Audio(audio).duration;

export const stories: Story[] = [
  { audioSrc: audio, title: "01", duration: String(duration) },
  { audioSrc: audio, title: "02", duration: "2:59" },
  { audioSrc: audio, title: "03", duration: "2:59" },
  { audioSrc: audio, title: "04", duration: "2:59" },
  { audioSrc: audio, title: "05", duration: "2:59" },
  { audioSrc: audio, title: "06", duration: "2:59" },
  { audioSrc: audio, title: "07", duration: "2:59" },
  { audioSrc: audio, title: "08", duration: "2:59" },
  { audioSrc: audio, title: "09", duration: "2:59" },
  { audioSrc: audio, title: "10", duration: "2:59" },
  { audioSrc: audio, title: "11", duration: "2:59" },
  { audioSrc: audio, title: "12", duration: "2:59" },
  { audioSrc: audio, title: "13", duration: "2:59" },
  { audioSrc: audio, title: "14", duration: "2:59" },
  { audioSrc: audio, title: "15", duration: "2:59" },
  { audioSrc: audio, title: "16", duration: "2:59" },
  { audioSrc: audio, title: "17", duration: "2:59" },
  { audioSrc: audio, title: "18", duration: "2:59" },
  { audioSrc: audio, title: "19", duration: "2:59" },
  { audioSrc: audio, title: "20", duration: "2:59" },
  { audioSrc: audio, title: "21", duration: "2:59" },
  { audioSrc: audio, title: "22", duration: "2:59" },
  { audioSrc: audio, title: "23", duration: "2:59" },
  { audioSrc: audio, title: "24", duration: "2:59" },
  { audioSrc: audio, title: "25", duration: "2:59" },
  { audioSrc: audio, title: "26", duration: "2:59" },
  { audioSrc: audio, title: "27", duration: "2:59" },
  { audioSrc: audio, title: "28", duration: "2:59" },
  { audioSrc: audio, title: "29", duration: "2:59" },
  { audioSrc: audio, title: "30", duration: "2:59" },
];

export const selectedStoriesKey = "selectedStories";
