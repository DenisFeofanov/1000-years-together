import { Act } from "@/interfaces/Act";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { ACTS } from "@/shared/Act";
import { CHOOSE_STORIES } from "@/shared/SLUGS";
import Head from "next/head";
import { useEffect, useState } from "react";
import ClientOnly from "../ClientOnly";
import ListenStory from "../ListenStory";

type Props = {
  act: Act;
};

function Act({ act: { title, audioSrc: actAudioSrc } }: Props) {
  const [nextPage, setNextPage] = useState<string | null>(null);

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();
      // 301 redirect
      if (selectedStories.length < 5) window.location.replace(CHOOSE_STORIES);

      const storyIndex = ACTS.findIndex(act => act.title === title);

      setNextPage(selectedStories[storyIndex].title);
    }
  }, [title]);

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
          proceedLink={`/stories/${nextPage}`}
          nextPageTitle={nextPage}
        />
      </ClientOnly>
    </>
  );
}

export default Act;
