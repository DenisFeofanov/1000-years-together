import ClientOnly from "@/components/ClientOnly";
import ListenStory from "@/components/ListenStory";
import { Story } from "@/interfaces/Story";
import { getStoryTranscription } from "@/lib/Stories";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Props {
  story: Story | undefined;
}

interface Params extends ParsedUrlQuery {
  number: string;
}

const ListenStoryPage = ({ story }: Props) => (
  <ClientOnly>
    <ListenStory story={story} />
  </ClientOnly>
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

export const getStaticProps: GetStaticProps<Props, Params> = context => {
  const currentSlug = context.params!.number;
  const currentStory = stories.find(story => story.title === currentSlug)!;
  currentStory.transcription = getStoryTranscription(currentStory?.title);

  return {
    props: {
      story: currentStory,
    },
  };
};

export default ListenStoryPage;
