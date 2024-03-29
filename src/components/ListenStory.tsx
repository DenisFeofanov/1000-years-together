import BookIcon from "@/Book.svg";
import AudioPlayer from "@/app/AudioPlayer";
import ActButton from "@/components/Act/ActButton";
import ActLink from "@/components/Act/ActLink";
import Modal from "@/components/Act/Modal";
import Header from "@/components/Header";
import { useWindowSize } from "@/lib/hooks";
import { formatTime } from "@/lib/utils";
import Layout from "@/pages/Layout";
import Image from "next/image";
import { useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import NextLink from "./NextLink";

interface baseProps {
  transcription: string | null;
  audioSrc: string;
  proceedLink: string | null;
  isSingleStory?: boolean;
  nextPageTitle?: string | null;
}

interface SingleStoryProps extends baseProps {
  title: string;
}

interface ChainedStoriesProps extends baseProps {
  storyNumber: string;
}

interface implementationProps extends baseProps {
  title?: string;
  storyNumber?: string;
}

function ListenStory({
  title,
  transcription,
  audioSrc,
}: SingleStoryProps): React.JSX.Element;
function ListenStory({
  storyNumber,
  transcription,
  audioSrc,
}: ChainedStoriesProps): React.JSX.Element;
function ListenStory({
  title,
  storyNumber,
  transcription = null,
  audioSrc,
  proceedLink: proceedLinkHref,
  nextPageTitle,
  isSingleStory = false,
}: implementationProps) {
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

  // different styles for singleStory and chainedStories
  let storyTitle, heading;
  if (isSingleStory) {
    heading = (
      <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase lg:text-[1rem]">
        {`история\n`}
      </h1>
    );
  } else {
    heading = (
      <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase lg:text-[1rem]">
        {`интро к истории\n`}
      </h1>
    );
  }

  if (storyNumber !== undefined) {
    storyTitle = (
      <span className="text-[4.75rem] font-bold leading-[1] tracking-[-0.76px] lg:font-inter lg:text-[15.25rem] lg:text-grayDark lg:not-italic lg:font-bold lg:leading-[1] lg:tracking-[-24.4px]">
        {storyNumber}
      </span>
    );
  } else {
    storyTitle = (
      <span className="inline-block text-grayDark text-[2rem] mt-[10px] lg:text-[7.625rem] lg:mb-[15px] lg:mt-[30px] not-italic font-bold leading-[1] lg:tracking-[-8.54px] uppercase">
        {title}
      </span>
    );
  }

  const audioPlayer = (
    <AudioPlayer
      audioSrc={audioSrc}
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
  const proceedLink = proceedLinkHref && (
    <ActLink href={proceedLinkHref}>
      {isSingleStory ? "вернуться" : "следующая"}
    </ActLink>
  );
  const hasTranscription = transcription !== null && storyNumber !== undefined;

  const proceedLinkWithInfo = nextPageTitle !== undefined &&
    proceedLinkHref && <NextLink next={nextPageTitle} href={proceedLinkHref} />;

  return (
    <Modal
      // ! because open modal button not showing without storyNumber and transcription
      title={storyNumber!}
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
      htmlText={transcription!}
    >
      <Layout>
        <div className="relative fullscreen-height grid grid-rows-[auto_1fr]">
          <Header title="тысяча лет вместе" titleType="link" />

          <div>
            {isDesktop ? (
              //  desktop layout
              <div className="h-full hidden lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:items-center">
                {!isSingleStory && heading && (
                  <div className="ml-[15px] row-start-2">{heading}</div>
                )}
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[32rem]">
                  {audioPlayer}

                  <div className="mt-[42px] grid grid-cols-3 justify-items-center gap-[20px]">
                    {textButtonPlay}

                    {hasTranscription && (
                      <ActButton onClick={() => setIsModalOpen(true)}>
                        Текст
                      </ActButton>
                    )}

                    <div className="col-start-3">{proceedLink}</div>
                  </div>
                </div>

                {!isSingleStory && (
                  <div className="mr-[15px] row-start-2 col-start-3">
                    {proceedLinkWithInfo}
                  </div>
                )}

                <div className="overflow-hidden absolute bottom-0 left-0">
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

                    {!isSingleStory && proceedLinkWithInfo}
                  </div>

                  {hasTranscription && (
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
                  )}
                </div>

                <div>
                  <div>{audioPlayer}</div>

                  <div className="flex justify-center items-center mx-auto gap-[2rem] md:gap-[42px] mt-[42px]">
                    {textButtonPlay}

                    {proceedLink}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Modal>
  );
}

export default ListenStory;
