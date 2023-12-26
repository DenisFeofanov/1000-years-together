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
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import Header from "../Header";
import ActButton from "./ActButton";
import Transcription from "./Modal";
import NextLink from "../NextLink";

type Props = {
  goBackHref: string;
  goNextHref: string;
  act: Act;
  clearAllStories?: () => void;
};

function Act({
  goBackHref,
  goNextHref,
  act: { title, audioSrc: actAudioSrc },
  clearAllStories,
}: Props) {
  const router = useRouter();

  const playerRef = useRef<H5AudioPlayer>(null);
  const playAnimationRef = useRef<number | null>(null);
  const previousTimeStamp = useRef<number | null>(null);
  const currentStory = useRef<Story | null>(null);
  const nextAct = useRef<string | null>(null);

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

  function handleLoadedMetadata() {
    if (playerRef.current?.audio.current) {
      setDuration(playerRef.current.audio.current.duration);
    }
  }

  function handleNext() {
    if (isIntroFinished) {
      router.push(goNextHref);
      if (goNextHref === "/end") {
        clearAllStories && clearAllStories();
      }
    } else {
      setIsIntroFinished(true);
    }
  }

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();

      const storyIndex = ACTS.findIndex(act => act.title === title);

      // 301 redirect
      if (selectedStories.length < 5)
        window.location.replace("/choose-stories");

      currentStory.current = selectedStories[storyIndex];
      nextAct.current = ACTS[storyIndex + 1]?.title || null;
    }

    router.prefetch(goNextHref);
  }, [title, goNextHref, router]);

  const storyTitle = isIntroFinished ? (
    <span className="text-[4.75rem] font-bold leading-[1] tracking-[-0.76px] lg:font-inter lg:text-[15.25rem] lg:text-grayDark lg:not-italic lg:font-bold lg:leading-[1] lg:tracking-[-24.4px]">
      {currentStory.current?.title}
    </span>
  ) : (
    <span className="inline-block text-grayDark text-[2rem] mt-[10px] lg:text-[7.625rem] lg:mb-[15px] lg:mt-[30px] not-italic font-bold leading-[1] lg:tracking-[-8.54px] uppercase">
      {title}
    </span>
  );
  const nextLinkWithInfo = (
    <NextLink
      next={
        isIntroFinished ? nextAct.current : currentStory.current?.title || null
      }
      onNext={handleNext}
    />
  );
  const heading = (
    <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase lg:text-[1rem]">
      {isIntroFinished ? `история\n` : `интро к истории\n`}
    </h1>
  );
  const nextLink = <ActButton onClick={handleNext}>следующая</ActButton>;
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
  const PlayButtonAsText = (
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
          <div className="relative min-h-screen grid grid-rows-[auto_1fr]">
            <Header />

            <div>
              {isDesktop ? (
                //  desktop layout
                <div className="h-full hidden lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:items-center">
                  <div className="ml-[15px] row-start-2">{heading}</div>
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    {audioPlayer}

                    <div className="mt-[42px] grid grid-cols-3 justify-items-center gap-[20px]">
                      {PlayButtonAsText}

                      {/* display only if text present */}
                      <ActButton onClick={() => setIsModalOpen(true)}>
                        Текст
                      </ActButton>

                      {nextLink}
                    </div>
                  </div>

                  <div className="mr-[15px] row-start-2 col-start-3">
                    {nextLinkWithInfo}
                  </div>

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

                      {nextLinkWithInfo}
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
                      {PlayButtonAsText}

                      {nextLink}
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
