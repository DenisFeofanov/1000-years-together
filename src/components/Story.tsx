import { Act } from "@/interfaces/Act";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { ACTS } from "@/shared/Act";
import { CHOOSE_STORIES, END } from "@/shared/SLUGS";
import Head from "next/head";
import { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import ListenStory from "./ListenStory";

interface Props {
  story: Story;
}

function Story({ story: { title, audioSrc, transcription } }: Props) {
  const [nextPage, setNextPage] = useState<Act | null>(null);

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();
      // 301 redirect
      if (selectedStories.length < 5) window.location.replace(CHOOSE_STORIES);

      const storyIndex = selectedStories.findIndex(
        story => story.title === title
      );

      setNextPage(ACTS[storyIndex + 1]);
    }
  }, [title]);

  let proceedLink;
  if (nextPage === undefined) {
    proceedLink = END;
  } else {
    proceedLink = nextPage?.slug ? `/acts/${nextPage?.slug}` : null;
  }

  return (
    <>
      <Head>
        <title>{`История №${title}`}</title>
      </Head>

      <ClientOnly>
        <ListenStory
          storyNumber={title}
          audioSrc={audioSrc}
          transcription={transcription}
          proceedLink={proceedLink}
          nextPageTitle={nextPage?.title || null}
        />
      </ClientOnly>
    </>
  );
}

export default Story;
