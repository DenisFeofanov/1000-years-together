import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { selectedStoriesKey } from "@/shared/Stories";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";

type selectedStoriesState = (Story | null)[];

export default function App({ Component, pageProps }: AppProps) {
  const [selectedStories, setSelectedStories] = useState<selectedStoriesState>(
    []
  );

  // get existing values from local storage on first render
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setSelectedStories(getSelectedStoriesFromLocalStorage);
    }
  }, []);

  function handleSave(updatedSelectedStories: selectedStoriesState) {
    // save to local storage
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(
        selectedStoriesKey,
        JSON.stringify(updatedSelectedStories)
      );
    }

    // set state from local storage
    setSelectedStories(getSelectedStoriesFromLocalStorage());
  }

  function removeSelectedStory(storyToRemove: Story) {
    handleSave(
      selectedStories.map(story =>
        story?.title === storyToRemove.title ? null : story
      )
    );
  }

  function addSelectedStory(newStory: Story) {
    // allow no more than five non-null stories
    if (
      selectedStories.length >= 5 &&
      selectedStories.every(story => story !== null)
    )
      return;

    // if there is a null story replace it with new story, otherwise add to the end
    const nullStoryIndex = selectedStories.indexOf(null);
    const updatedSelectedStories =
      nullStoryIndex === -1
        ? [...selectedStories, newStory]
        : selectedStories.toSpliced(nullStoryIndex, 1, newStory);

    handleSave(updatedSelectedStories);
  }

  function handleClick(story: Story) {
    if (
      selectedStories.some(
        selectedStory => selectedStory?.title === story.title
      )
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
