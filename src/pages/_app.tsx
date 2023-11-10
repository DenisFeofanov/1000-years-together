import { Story } from "@/interfaces/Story";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const selectedStoriesKey = "selectedStories";
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);
  const [isSelectingDone, setIsSelectingDone] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [length, setLength] = useState<number>(0);

  // get existing values from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let selectedStories = JSON.parse(
        localStorage.getItem(selectedStoriesKey) || "[]"
      );
      let keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i)!);
      }

      setSelectedStories(selectedStories);
      setKeys(keys);
      setLength(localStorage.length);
    }
  }, []);

  function handleSave(newStory: Story) {
    // save to localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(
        selectedStoriesKey,
        JSON.stringify([...selectedStories, newStory])
      );
    }

    // set state from localStorage
    setSelectedStories(
      JSON.parse(localStorage.getItem(selectedStoriesKey) || "[]")
    );
  }

  function handleClick(newStory: Story) {
    // avoiding duplicates and setting range
    if (
      selectedStories.length >= 5 ||
      selectedStories.find(story => story.title === newStory.title)
    ) {
      return;
    }

    // adding last story
    if (selectedStories.length === 4) {
      handleSave(newStory);
      setIsSelectingDone(true);
      return;
    }

    handleSave(newStory);
  }

  return (
    <>
      <NextNProgress stopDelayMs={20} options={{ showSpinner: false }} />
      <Component
        {...pageProps}
        selectedStories={selectedStories}
        handleClick={handleClick}
        isSelectingDone={isSelectingDone}
      />
    </>
  );
}
