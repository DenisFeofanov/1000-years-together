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

interface Props {
  title: string;
  transcription: string | null;
  audioSrc: string;
}

function ListenStory({ title, transcription, audioSrc }: Props) {
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
      {title}
    </span>
  );
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
  const backButton = <ActLink href={"/archive"}>вернуться</ActLink>;
  const hasTranscription = transcription !== null;

  return (
    <Modal
      title={title}
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
      // ! because open modal button not showing without transcription
      htmlText={transcription!}
    >
      <Layout>
        <div className="relative fullscreen-height grid grid-rows-[auto_1fr]">
          <Header title="тысяча лет вместе" titleType="link" />

          <div>
            {isDesktop ? (
              //  desktop layout
              <div className="h-full hidden lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:items-center">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[32rem]">
                  {audioPlayer}

                  <div className="mt-[42px] grid grid-cols-3 justify-items-center gap-[20px]">
                    {textButtonPlay}

                    {hasTranscription && (
                      <ActButton onClick={() => setIsModalOpen(true)}>
                        Текст
                      </ActButton>
                    )}

                    <div className="col-start-3">{backButton}</div>
                  </div>
                </div>

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
                    <span>{storyTitle}</span>
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

                    {backButton}
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
