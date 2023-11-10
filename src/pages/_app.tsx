import { Story } from "@/interfaces/Story";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const selectedStoriesKey = "selectedStories";
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);

  // get existing values from local storage on first render
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let selectedStories = JSON.parse(
        localStorage.getItem(selectedStoriesKey) || "[]"
      );

      setSelectedStories(selectedStories);
    }
  }, []);

  function handleSave(updatedSelectedStories: Story[]) {
    // save to local storage
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(
        selectedStoriesKey,
        JSON.stringify(updatedSelectedStories)
      );
    }

    // set state from local storage
    setSelectedStories(
      JSON.parse(localStorage.getItem(selectedStoriesKey) || "[]")
    );
  }

  function removeSelectedStory(storyToRemove: Story) {
    handleSave(
      selectedStories.filter(story => story.title !== storyToRemove.title)
    );
  }

  function addSelectedStory(newStory: Story) {
    // setting range
    if (selectedStories.length >= 5) return;

    handleSave([...selectedStories, newStory]);
  }

  function handleClick(story: Story) {
    if (
      selectedStories.some(selectedStory => selectedStory.title === story.title)
    ) {
      removeSelectedStory(story);
    } else {
      addSelectedStory(story);
    }
  }

  return (
    <>
      <NextNProgress stopDelayMs={20} options={{ showSpinner: false }} />
      <Component
        {...pageProps}
        selectedStories={selectedStories}
        handleClick={handleClick}
      />
    </>
  );
}
