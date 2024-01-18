import { Act } from "@/interfaces/Act";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { ACTS } from "@/shared/Act";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import ClientOnly from "../ClientOnly";
import ListenStory from "../ListenStory";

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
  const router = useRouter();
  const nextAct = useRef<string | null>(null);

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();

      const storyIndex = ACTS.findIndex(act => act.title === title);

      // 301 redirect
      if (selectedStories.length < 5)
        window.location.replace("/choose-stories");

      // currentStory.current = selectedStories[storyIndex];
      nextAct.current = ACTS[storyIndex + 1]?.title || null;
    }

    router.prefetch(goNextHref);
  }, [title, goNextHref, router]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <ClientOnly>
        <ListenStory
          title={title}
          audioSrc={actAudioSrc}
          transcription={null}
          proceedLink={goNextHref}
          nextPageTitle={nextAct.current}
        />
      </ClientOnly>
    </>
  );
}

export default Act;
