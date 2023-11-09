import { Story } from "@/interfaces/Story";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);

  function addSelectedStory(newAct: Story) {
    if (selectedStories.length >= 5) return;
    setSelectedStories([...selectedStories, newAct]);
  }

  return (
    <>
      <NextNProgress stopDelayMs={20} options={{ showSpinner: false }} />
      <Component
        {...pageProps}
        selectedStories={selectedStories}
        addSelectedStory={addSelectedStory}
      />
    </>
  );
}
