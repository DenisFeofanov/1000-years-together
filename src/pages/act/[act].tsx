import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import { Act } from "@/interfaces/Act";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import { ACTS } from "@/shared/Act";
import { stories } from "@/shared/Stories";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
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
  const goBackHref = previousSlug || "/choose-stories";
  const goNextHref = nextSlug || "/afterwards";

  const router = useRouter();
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const storyIndex = ACTS.findIndex(act => act.title === title);

      setCurrentStory(getSelectedStoriesFromLocalStorage()[storyIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.act]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout>
        <AppLink href={goBackHref}>Назад</AppLink>
        <Heading>{title}</Heading>

        {/* <StoryPlayer audioSrc={stories[0].audioSrc} title={stories[0].title} /> */}
        <audio controls src={stories[0].audioSrc}></audio>

        <Heading>История</Heading>

        {/* <StoryPlayer audioSrc={stories[0].audioSrc} title={stories[0].title} /> */}

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
