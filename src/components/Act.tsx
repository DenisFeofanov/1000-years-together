import BookIcon from "@/Book.svg";
import AudioPlayer from "@/app/AudioPlayer";
import logo from "@/biennial.svg";
import CrossIcon from "@/crossIcon.svg";
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
import ActButton from "./ActButton";
import ActLink from "./ActLink";
import ActModalSubheading from "./ActModalSubheading";
import ActModalText from "./ActModalText";
import Header from "./Header";

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
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const playAnimationRef = useRef<number | null>(null);
  const previousTimeStamp = useRef<number | null>(null);
  const currentStory = useRef<Story | null>(null);

  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [nextStory, setNextStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
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

  function togglePlayPause() {
    if (isPlaying) {
      cancelAnimationFrame(playAnimationRef.current!);
    } else {
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
      setNextStory(
        selectedStories[ACTS.findIndex(act => act.title === title) + 1] || null
      );
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
  const nextStoryText = nextStory && (
    <div className="text-right">
      <p className="whitespace-pre font-mainHeading text-blackText text-[0.6875rem] not-italic font-semibold leading-[normal] tracking-[0.22px] uppercase lg:font-inter lg:text-[0.8125rem] lg:tracking-[0.26px]">
        далее
      </p>
      <p className="text-grayDark text-[1.5rem] font-bold leading-[1] tracking-[-0.24px] mt-[8px] lg:text-[1.875rem] lg:tracking-[-0.9px]">
        {nextStory.title}
      </p>
    </div>
  );
  const heading = (
    <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase lg:text-[1rem]">
      {isIntroFinished ? `история\n` : `интро к истории\n`}
    </h1>
  );

  const playerDuration = (
    <span className="whitespace-nowrap mt-[42px] text-blackText text-[1rem] not-italic font-medium leading-[normal] tracking-[0.32px] uppercase lg:text-[1.125rem] lg:tracking-[0.36px] lg:ml-[30px] lg:font-inter lg:mt-0">
      {formatTime(timeProgress)} / {formatTime(duration)}
    </span>
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
      onPlay={togglePlayPause}
      onPause={togglePlayPause}
    />
  );
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <>
        {/* modal */}
        <dialog
          className="peer backdrop:bg-[black]/80 bg-transparent w-full max-w-none h-full max-h-none mx-0 my-0 lg:max-w-[600px] lg:mx-auto hide-scrollbar"
          ref={modalRef}
          onClick={e =>
            e.target === modalRef.current && modalRef.current?.close()
          }
        >
          <div className="rounded-[24px] bg-white pt-[30px] px-[20px] pb-[160px] mt-[59px] lg:pb-[42px] lg:mb-[56px]">
            <button
              className="block ml-auto p-[8px] rounded-[40px] bg-iconGray"
              type="button"
              onClick={() => modalRef.current?.close()}
            >
              <Image src={CrossIcon} width={18} height={18} alt="close icon" />
            </button>

            <h2 className="mt-[5px] text-blackHeading text-center text-[2.625rem] not-italic font-bold leading-[1] tracking-[-1.26px] lg:text-[1.875rem] lg:tracking-[-0.3]">{`#${currentStory.current?.title}`}</h2>

            <div className="mt-[30px]">
              <ActModalText>
                Величие исторического лица измеряется долговечностью памяти о
                нем — писал в свое время археограф, историк, журналист и
                общественный деятель Петр Иванович Бартенев. Детские годы его
                были связаны с Липецком, где он проживал на Дворянской улице
                (ныне — улица Ленина). <br /> <br />
                Происходил он из среднепоместного дворянства. По окончании
                Благородного пансиона Рязанской гимназии (1847) и Московского
                университета (1851) он поступил на службу в Московский главный
                архив Министерства иностранных дел (1853–1858), заведовал
                Чертковской библиотекой (1859–1873), первой публичной
                библиотекой в Москве.
              </ActModalText>
            </div>

            <ActModalSubheading>Подзаголовок</ActModalSubheading>
            <div className="mt-[10px]">
              <ActModalText>
                Главным занятием Бартенева с 1863 года стало редактирование
                созданного им журнала «Русский архив», которым он руководил
                фактически до своей кончины. В издании публиковались
                многочисленные свидетельства о русских государственных и
                общественных деятелях XVIII–XIX веков с его комментариями,
                которые до настоящего времени являются незаменимым источником
                для изучения этой эпохи. <br />
                <br /> Также Бартеневым были опубликованы важные для
                отечественной истории документы в изданиях «Осьмнадцатый век»
                (книги 1–4, 1868–1869), «Девятнадцатый век» (книги 1–2, 1872),
                «Архив князя Воронцова» (книги 1–40, 1870–1895), «Собрание писем
                царя Алексея Михайловича» (1856), «Записки Г. Р. Державина»
                (1860).
              </ActModalText>
            </div>

            <ActModalSubheading>Подзаголовок</ActModalSubheading>
            <div className="mt-[10px]">
              <ActModalText>
                Кроме того, важнейшим делом его жизни стал сбор материалов о
                биографии и произведениях Александра Пушкина. Именно он заложил
                основы пушкиноведения в России. Его титанический труд в этом
                отношении, стремление собрать сведения о великом поэте у многих
                современников, тогда еще здравствовавших и лично знавших
                Пушкина, ряд статей о нем и его жизни заслужили уважение многих
                русских людей. <br />
                <br /> По своим взглядам Петр Бартенев был близок к
                славянофилам, а к началу XX века они эволюционировали в сторону
                консерватизма; в сущности, он не принял «великих реформ» и
                последующей демократизации российского общества, революции
                1905–1907 годов, оставшись до конца дней монархистом, идеалом
                для которого была Россия первого тридцатилетия XIX века.
              </ActModalText>
            </div>

            <Image
              className="block mx-auto mt-[52px] lg:mt-[20px]"
              src={logo}
              width="24"
              alt="biennial logo"
            />
          </div>
        </dialog>
        <div className="peer-open:lg:blur-[21px]">
          <Layout>
            <div className="min-h-screen grid grid-rows-[auto_1fr]">
              <Header title="тысяча лет вместе" titleType="text" />

              <div>
                {isDesktop ? (
                  //  desktop layout
                  <div className="h-full hidden lg:grid lg:grid-cols-3 lg:grid-rows-[auto,minmax(341px,1fr),auto] lg:items-center">
                    <div className="ml-[15px] row-start-2">{heading}</div>
                    <div className="row-start-2">
                      {audioPlayer}

                      <div className="mt-[42px] grid grid-cols-3 justify-items-center gap-[20px]">
                        <ActButton onClick={togglePlayPause}>
                          {isPlaying ? "пауза" : "продолжить"}
                        </ActButton>

                        {/* display only if text present */}
                        <ActButton
                          onClick={() => modalRef.current?.showModal()}
                        >
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
                        onClick={() => modalRef.current?.showModal()}
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
                        <ActButton onClick={togglePlayPause}>
                          {isPlaying ? "пауза" : "продолжить"}
                        </ActButton>

                        {nextButton}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Layout>
        </div>
      </>
    </>
  );
}

export default Act;
