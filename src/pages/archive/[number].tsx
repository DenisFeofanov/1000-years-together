import ClientOnly from "@/components/ClientOnly";
import ListenStory from "@/components/ListenStory";
import { Story } from "@/interfaces/Story";
import { getStoryTranscription } from "@/lib/Stories";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface Props {
  story: Story;
}

interface Params extends ParsedUrlQuery {
  number: string;
}

const ListenStoryPage = ({ story }: Props) => (
  <>
    <Head>
      <title>Архив</title>
    </Head>

    <ClientOnly>
      <ListenStory
        storyNumber={story.title}
        transcription={story.transcription}
        audioSrc={story.audioSrc}
        proceedLink="/archive"
        isSingleStory={true}
      />
    </ClientOnly>
  </>
);

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
  const currentStory = stories.find(story => story.title === currentSlug)!;
  currentStory.transcription = await getStoryTranscription(currentStory?.title);

  return {
    props: {
      story: currentStory,
    },
  };
};

export default ListenStoryPage;
