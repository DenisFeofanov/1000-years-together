import { Story } from "@/interfaces/Story";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface Props {
  story: Story | undefined;
}

interface Params extends ParsedUrlQuery {
  number: string;
}

function ListenStory({ story }: Props) {
  return story ? (
    <>
      <p>Listen to archive {story.title}</p>
      <Link href="/archive">Back to archive</Link>
    </>
  ) : (
    <p>No story to listen :(</p>
  );
}

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
  const currentStory = stories.find(story => story.title === currentSlug);

  return {
    props: {
      story: currentStory,
    },
  };
};

export default ListenStory;
