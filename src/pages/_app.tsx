import { Story } from "@/interfaces/Story";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);
  const [isSelectingDone, setIsSelectingDone] = useState(false);

  function addSelectedStory(newAct: Story) {
    // adding last story
    if (selectedStories.length === 4) {
      setSelectedStories([...selectedStories, newAct]);
      setIsSelectingDone(true);
      return;
    }
    setSelectedStories([...selectedStories, newAct]);
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
