import BookIcon from "@/Book.svg";
import AudioPlayer from "@/app/AudioPlayer";
import ActButton from "@/components/Act/ActButton";
import ActLink from "@/components/Act/ActLink";
import Modal from "@/components/Act/Modal";
import Header from "@/components/Header";
import { Story } from "@/interfaces/Story";
import { useWindowSize } from "@/lib/hooks";
import { formatTime } from "@/lib/utils";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { title } from "process";
import { ParsedUrlQuery } from "querystring";
import { useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import Layout from "../Layout";

interface Props {
  story: Story | undefined;
}

interface Params extends ParsedUrlQuery {
  number: string;
}

function ListenStory({ story }: Props) {
  const playerRef = useRef<H5AudioPlayer>(null);
  const playAnimationRef = useRef<number | null>(null);
  const previousTimeStamp = useRef<number | null>(null);

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

  const storyTitle = (
    <span className="text-[4.75rem] font-bold leading-[1] tracking-[-0.76px] lg:font-inter lg:text-[15.25rem] lg:text-grayDark lg:not-italic lg:font-bold lg:leading-[1] lg:tracking-[-24.4px]">
      {story?.title}
    </span>
  );
  const audioPlayer = (
    <AudioPlayer
      audioSrc={story?.audioSrc}
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
  const backButton = <ActLink href={"/archive"}>вернуться</ActLink>;

  return (
    <>
      <Head>
        <title>Архив</title>
      </Head>

      <Modal
        title={story?.title}
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
                  <div className="row-start-2 col-start-2">
                    {audioPlayer}

                    <div className="mt-[42px] grid grid-cols-3 justify-items-center gap-[20px]">
                      {textButtonPlay}

                      {/* display only if text present */}
                      <ActButton onClick={() => setIsModalOpen(true)}>
                        Текст
                      </ActButton>

                      {backButton}
                    </div>
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
                      <span>{storyTitle}</span>
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

                      {backButton}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </Modal>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = stories.map(story => {
    return {
      params: {
        number: story.title,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async context => {
  const currentSlug = context.params!.number;
  const currentStory = stories.find(story => story.title === currentSlug);

  return {
    props: {
      story: currentStory,
    },
  };
};

export default ListenStory;
