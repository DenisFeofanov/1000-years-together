import { Act } from "@/interfaces/Act";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import Layout from "@/pages/Layout";
import { ACTS } from "@/shared/Act";
import { Wave } from "@foobar404/wave";
import { useEffect, useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
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
  const audioRef = useRef<H5AudioPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<Wave | null>(null);

  function createVizualization() {
    // if canvas and audioRef are rendered, but no animation yet
    if (
      audioRef.current?.audio.current &&
      canvasRef.current &&
      !animationRef.current
    ) {
      animationRef.current = new Wave(
        audioRef.current.audio.current,
        canvasRef.current
      );

      animationRef.current.addAnimation(
        new animationRef.current.animations.Lines()
      );
    }
  }

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

      {/* <ClientOnly>
        <AudioPlayer audioSrc={actAudioSrc} />
      </ClientOnly> */}

      {currentStory && (
        <>
          <Heading>История #{currentStory.title}</Heading>

          {/* audio API only works correctly on client, so I render player component only on client */}
          <ClientOnly>
            <AudioPlayer
              audioSrc={currentStory.audioSrc}
              ref={audioRef}
              onCanPlay={createVizualization}
            />
          </ClientOnly>
        </>
      )}

      <canvas ref={canvasRef}></canvas>
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
