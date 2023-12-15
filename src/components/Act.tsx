import { Act } from "@/interfaces/Act";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import Layout from "@/pages/Layout";
import { ACTS } from "@/shared/Act";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import AppLink from "./AppLink";
import AudioPlayer from "./AudioPlayer";
import ClientOnly from "./ClientOnly";
import Heading from "./Heading";
import Image from "next/image";
import BookIcon from "@/Book.svg";
import PlayIcon from "@/Play.svg";
import ProgressBarIcon from "@/progressBar.png";
import ActLink from "./ActLink";

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
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();

      const storyIndex = ACTS.findIndex(act => act.title === title);

      // 301 redirect
      if (selectedStories.length < 5) window.location.replace("/");

      setCurrentStory(selectedStories[storyIndex]);
    }
    // include title to silence error, although it shouldn't change through component's lifecycle
  }, [title]);

  return (
    <Layout>
      <main className="grid grid-rows-[1fr_auto] pt-[56px] px-[15px] pb-[30px]">
        <div>
          <div className="flex justify-between items-start">
            <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase">
              {`история\n`}
              <span className="text-[4.75rem] font-bold leading-[1] tracking-[-0.76px]">
                23
              </span>
            </h1>

            <div className="text-right">
              <p className="whitespace-pre font-mainHeading text-blackText text-[0.6875rem] not-italic font-semibold leading-[normal] tracking-[0.22px] uppercase">
                далее
              </p>
              <p className="text-[1.5rem] font-bold leading-[1] tracking-[-0.24px] mt-[8px]">
                9
              </p>
            </div>
          </div>

          <button
            className="flex items-center mt-[16px] gap-[8px]"
            type="button"
          >
            <div className="w-max rounded-[40px] bg-[#ECECEC] p-[8px]">
              <Image src={BookIcon} width="16" height="16" alt="Book icon" />
            </div>
            <p className="text-blackText font-mainHeading text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase">
              текст
            </p>
          </button>
        </div>

        <div>
          <button className="block mt-[82px] mx-auto" type="button">
            <Image src={PlayIcon} width="144" alt="Play icon" />
          </button>

          <p className="mt-[42px] text-blackText text-[1rem] not-italic font-medium leading-[normal] tracking-[0.32px] uppercase">
            04:25 / 05:28
          </p>

          <Image
            className="mt-[8px]"
            src={ProgressBarIcon}
            alt="placeholder for real progressBar"
          />

          <div className="flex flex-wrap justify-center items-center mx-auto gap-[10px] md:gap-[42px] mt-[42px]">
            <ActLink href={""}>продолжить</ActLink>
            <ActLink href={""}>следующая</ActLink>
          </div>
        </div>
      </main>
      {/* <AppLink href={goBackHref}>Назад</AppLink>
      <Heading>{title}</Heading>*/}

      {/* audio API only works correctly on client, so I render player component only on client */}
      {/* <ClientOnly>
        <AudioPlayer audioSrc={actAudioSrc} />
      </ClientOnly>
      {currentStory && (
        <>
          <Heading>История #{currentStory.title}</Heading>

          <ClientOnly>
            <AudioPlayer audioSrc={currentStory.audioSrc} />
          </ClientOnly>
        </>
      )}
      <br />
      <AppLink href={goNextHref}>Далее</AppLink>  */}

      <style jsx>{`
        :global(.rhap_controls-section) {
          flex-grow: 0;
        }

        :global(.rhap_time) {
          user-select: auto;
        }

        :global(.rhap_progress-section) {
          gap: 0.5rem;
        }
      `}</style>
    </Layout>
  );
}

export default Act;
