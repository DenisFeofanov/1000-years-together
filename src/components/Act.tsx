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
      <AppLink href={goBackHref}>Назад</AppLink>
      <Heading>{title}</Heading>

      {/* audio API only works correctly on client, so I render player component only on client */}
      <ClientOnly>
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
      <AppLink href={goNextHref}>Далее</AppLink>

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
