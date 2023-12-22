import BookIcon from "@/Book.svg";
import AudioPlayer from "@/app/AudioPlayer";

import { Act } from "@/interfaces/Act";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { useWindowSize } from "@/lib/hooks";
import { formatTime } from "@/lib/utils";
import Layout from "@/pages/Layout";
import { ACTS } from "@/shared/Act";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import Header from "../Header";
import ActButton from "./ActButton";
import ActLink from "./ActLink";
import Transcription from "./Modal";

type Props = {
  goBackHref: string;
  goNextHref: string;
  act: Act;
};

function Act({
  goBackHref,
  goNextHref,
  act: { title, audioSrc: actAudioSrc },
}: Props) {
  const playerRef = useRef<H5AudioPlayer>(null);

  const playAnimationRef = useRef<number | null>(null);
  const previousTimeStamp = useRef<number | null>(null);
  const currentStory = useRef<Story | null>(null);
  const nextStory = useRef<Story | null>(null);

  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [width] = useWindowSize();
  const isDesktop = width >= 1280;

  // animation for player timer
  function repeat(timeStamp: DOMHighResTimeStamp) {
    if (previousTimeStamp.current === null) {
      previousTimeStamp.current = timeStamp;
    }

    // update 10 times per second, feels smooth enough
    if (
      timeStamp - previousTimeStamp.current >= 100 &&
      playerRef.current?.audio.current
    ) {
      setTimeProgress(playerRef.current.audio.current.currentTime);
      previousTimeStamp.current = timeStamp;
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }

  function onPlay() {
    playAnimationRef.current = requestAnimationFrame(repeat);
    setIsPlaying(true);
  }

  function onPause() {
    cancelAnimationFrame(playAnimationRef.current!);
    setIsPlaying(false);
  }

  function togglePlayPause() {
    if (isPlaying) {
      playerRef.current?.audio.current?.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    } else {
      playerRef.current?.audio.current?.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
    setIsPlaying(prev => !prev);
  }

  function handleNextAudio() {
    setIsIntroFinished(true);
  }

  function handleLoadedMetadata() {
    if (playerRef.current?.audio.current) {
      setDuration(playerRef.current.audio.current.duration);
    }
  }

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();

      const storyIndex = ACTS.findIndex(act => act.title === title);

      // 301 redirect
      if (selectedStories.length < 5) window.location.replace("/");

      currentStory.current = selectedStories[storyIndex];
      nextStory.current =
        selectedStories[ACTS.findIndex(act => act.title === title) + 1] || null;
    }
    // include title to silence error, although it shouldn't change through component's lifecycle
  }, [title]);

  const storyTitle = isIntroFinished ? (
    <span className="text-[4.75rem] font-bold leading-[1] tracking-[-0.76px] lg:font-inter lg:text-[15.25rem] lg:text-grayDark lg:not-italic lg:font-bold lg:leading-[1] lg:tracking-[-24.4px]">
      {currentStory.current?.title}
    </span>
  ) : (
    <span className="inline-block text-grayDark text-[2rem] mt-[10px] lg:text-[7.625rem] lg:mb-[15px] lg:mt-[30px] not-italic font-bold leading-[1] lg:tracking-[-8.54px] uppercase">
      {title}
    </span>
  );
  const nextStoryText = nextStory.current && (
    <div className="text-right">
      <p className="whitespace-pre font-mainHeading text-blackText text-[0.6875rem] not-italic font-semibold leading-[normal] tracking-[0.22px] uppercase lg:font-inter lg:text-[0.8125rem] lg:tracking-[0.26px]">
        далее
      </p>
      <p className="text-grayDark text-[1.5rem] font-bold leading-[1] tracking-[-0.24px] mt-[8px] lg:text-[1.875rem] lg:tracking-[-0.9px]">
        {nextStory.current.title}
      </p>
    </div>
  );
  const heading = (
    <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase lg:text-[1rem]">
      {isIntroFinished ? `история\n` : `интро к истории\n`}
    </h1>
  );
  const nextButton = isIntroFinished ? (
    <ActLink href={goNextHref}>следующая</ActLink>
  ) : (
    <ActButton onClick={handleNextAudio}>следующая</ActButton>
  );
  const audioPlayer = (
    <AudioPlayer
      audioSrc={isIntroFinished ? currentStory.current?.audioSrc : actAudioSrc}
      ref={playerRef}
      onEnded={() => setIsPlaying(false)}
      onLoadedMetadata={handleLoadedMetadata}
      time={
        <span className="whitespace-nowrap mt-[42px] text-blackText text-[1rem] not-italic font-medium leading-[normal] tracking-[0.32px] uppercase lg:hidden">
          {formatTime(timeProgress)} / {formatTime(duration)}
        </span>
      }
      onPlay={onPlay}
      onPause={onPause}
    />
  );
  const textButtonPlay = (
    <ActButton onClick={togglePlayPause}>
      {isPlaying ? "пауза" : "продолжить"}
    </ActButton>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Transcription
        title={currentStory.current?.title}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <Layout>
          <div className="min-h-screen grid grid-rows-[auto_1fr]">
            <Header />

            <div>
              {isDesktop ? (
                //  desktop layout
                <div className="h-full hidden lg:grid lg:grid-cols-3 lg:grid-rows-[auto,minmax(341px,1fr),auto] lg:items-center">
                  <div className="ml-[15px] row-start-2">{heading}</div>
                  <div className="row-start-2">
                    {audioPlayer}

                    <div className="mt-[42px] grid grid-cols-3 justify-items-center gap-[20px]">
                      {textButtonPlay}

                      {/* display only if text present */}
                      <ActButton onClick={() => setIsModalOpen(true)}>
                        Текст
                      </ActButton>

                      {nextButton}
                    </div>
                  </div>
                  <div className="mr-[15px] row-start-2">{nextStoryText}</div>

                  <div className="self-end overflow-hidden col-start-1 col-end-4 row-start-3">
                    {storyTitle}
                    <span className="whitespace-nowrap lg:text-blackText not-italic font-medium leading-[normal] uppercase hidden lg:inline lg:text-[1.125rem] lg:tracking-[0.36px] lg:ml-[30px] lg:font-inter">
                      {formatTime(timeProgress)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              ) : (
                // mobile layout
                <div className="h-full grid grid-rows-[1fr_auto] pt-[56px] px-[15px] pb-[30px] lg:hidden">
                  <div>
                    <div className="flex justify-between items-start">
                      <span>
                        {heading}
                        {storyTitle}
                      </span>

                      {nextStoryText}
                    </div>

                    {/* hide button if no text present */}
                    <button
                      className="flex items-center mt-[16px] gap-[8px]"
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <div className="w-max rounded-[40px] bg-iconGray p-[8px]">
                        <Image
                          src={BookIcon}
                          width="16"
                          height="16"
                          alt="Book icon"
                        />
                      </div>
                      <p className="text-blackText font-mainHeading text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase">
                        текст
                      </p>
                    </button>
                  </div>

                  <div>
                    <div className="mt-[82px]">{audioPlayer}</div>

                    <div className="flex justify-center items-center mx-auto gap-[10px] md:gap-[42px] mt-[42px]">
                      {textButtonPlay}

                      {nextButton}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </Transcription>
    </>
  );
}

export default Act;
