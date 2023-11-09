import { Story } from "@/interfaces/Story";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);
  const [isSelectingDone, setIsSelectingDone] = useState(false);

  function addSelectedStory(newStory: Story) {
    // avoiding duplicates and setting range
    if (
      selectedStories.length >= 5 ||
      selectedStories.find(story => story.title === newStory.title)
    ) {
      return;
    }

    // adding last story
    if (selectedStories.length === 4) {
      setSelectedStories([...selectedStories, newStory]);
      setIsSelectingDone(true);
      return;
    }
    setSelectedStories([...selectedStories, newStory]);
  }

  return (
    <>
      <NextNProgress stopDelayMs={20} options={{ showSpinner: false }} />
      <Component
        {...pageProps}
        selectedStories={selectedStories}
        addSelectedStory={addSelectedStory}
        isSelectingDone={isSelectingDone}
      />
    </>
  );
}
