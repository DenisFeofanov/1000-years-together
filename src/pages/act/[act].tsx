import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import StoryPlayer from "@/components/StoryPlayer";
import { Act } from "@/interfaces/Act";
import { ACTS } from "@/shared/Act";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import Layout from "../Layout";

type Props = {
  previousSlug: string | null;
  nextSlug: string | null;
  title: string;
};

interface Params extends ParsedUrlQuery {
  act: string;
}

const Act: NextPage<Props> = ({ previousSlug, nextSlug, title }) => {
  const goBackHref = previousSlug || "/";
  const goNextHref = nextSlug || "/afterwards";

  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  function handleSelect(storyTitle: string) {
    if (selectedStory) return;
    setSelectedStory(storyTitle);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout>
        <AppLink href={goBackHref}>Назад</AppLink>
        <Heading>{title}</Heading>

        <Heading>История</Heading>
        <ul>
          {stories.map(story => (
            <li key={story.title}>
              <StoryPlayer
                audioSrc={story.audioSrc}
                title={story.title}
                handleSelect={handleSelect}
                isDisabled={selectedStory === story.title ? false : true}
                isAnyStorySelected={Boolean(selectedStory)}
              />
            </li>
          ))}
        </ul>
        <AppLink href={goNextHref}>Далее</AppLink>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = ACTS.map(act => {
    return {
      params: {
        act: act.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async context => {
  const currentSlug = context.params!.act;

  const { previousSlug, nextSlug } = findAdjacentActSlugs(currentSlug, ACTS);
  const { title } = ACTS.find(act => act.slug === currentSlug)!;

  return {
    props: {
      previousSlug,
      nextSlug,
      title,
    },
  };
};

function findAdjacentActSlugs(element: string, array: Act[]) {
  const slugs = array.map(act => act.slug);
  const index = slugs.indexOf(element);

  if (index === -1) {
    throw new Error("Given element is not found in the array");
  }

  let previousSlug = slugs[index - 1] || null;
  let nextSlug = slugs[index + 1] || null;

  return {
    previousSlug,
    nextSlug,
  };
}

export default Act;
