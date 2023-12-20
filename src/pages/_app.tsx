import AgeGate from "@/components/AgeGate";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { RFDewi } from "@/lib/fonts";
import { selectedStoriesKey } from "@/shared/Stories";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useRef, useState } from "react";

type selectedStoriesState = (Story | null)[];

const inter = Inter({ subsets: ["cyrillic"], variable: "--font-inter" });

const ageGateKey = "isOldEnough";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedStories, setSelectedStories] = useState<selectedStoriesState>(
    []
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // get selected stories from local storage on first render
    if (typeof window !== "undefined" && window.localStorage) {
      setSelectedStories(getSelectedStoriesFromLocalStorage);

      // show age gate
      if (localStorage.getItem(ageGateKey) !== "true") {
        const modal = modalRef.current;
        modal?.showModal();
        return () => modal?.close();
      }
    }
  }, []);

  function handleAgeGateYes() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(ageGateKey, String(true));
      modalRef.current?.close();
    }
  }

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
      selectedStories.length === 5 &&
      selectedStories.every(story => story !== null)
    )
      return;

    // if there is a null story replace it with new story, otherwise add to the end
    let updatedSelectedStories;

    if (selectedStories.includes(null)) {
      updatedSelectedStories = [...selectedStories];
      updatedSelectedStories[selectedStories.indexOf(null)] = newStory;
    } else {
      updatedSelectedStories = [...selectedStories, newStory];
    }
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
    <div className={`${inter.className} ${inter.variable} ${RFDewi.variable}`}>
      <AgeGate ref={modalRef} onYes={handleAgeGateYes}>
        <NextNProgress stopDelayMs={20} options={{ showSpinner: false }} />
        <Component
          {...pageProps}
          selectedStories={selectedStories}
          onClick={handleClick}
        />
      </AgeGate>
    </div>
  );
}
