import Story from "@/components/Story";
import { Story as StoryInterface } from "@/interfaces/Story";
import { getStoryTranscription } from "@/lib/Stories";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  story: StoryInterface;
};

interface Params extends ParsedUrlQuery {
  storyNumber: string;
}

const StoryPage: NextPage<Props> = ({ story, ...rest }) => {
  return <Story story={story} {...rest} />;
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = stories.map(story => {
    return {
      params: {
        storyNumber: story.title,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async context => {
  // using ! because getStaticPaths will always return params object
  const currentSlug = context.params!.storyNumber;
  const currentStory = stories.find(story => story.title === currentSlug)!;
  currentStory.transcription = await getStoryTranscription(currentStory.title);

  return {
    props: {
      story: currentStory,
    },
  };
};

export default StoryPage;
