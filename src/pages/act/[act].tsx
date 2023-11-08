import audioSrc from "@/../public/stories/test.mp3";
import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import { ACTS, Act } from "@/shared/Act";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import Story from "@/components/Story";

type Props = {
  previousSlug: string | null;
  nextSlug: string | null;
  title: string;
};

interface Params extends ParsedUrlQuery {
  act: string;
}

const Act: NextPage<Props> = ({ previousSlug, nextSlug, title }) => {
  const dummyStories = Array.from({ length: 8 }, (_, i) => i + 1);
  const goBackHref = previousSlug || "/";
  const goNextHref = nextSlug || "/afterwards";

  const audioRef = useRef(null as any);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc); // only call client
    console.log(audioRef);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function handleClick() {
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout>
        <AppLink href={goBackHref}>Назад</AppLink>
        <Heading>{title}</Heading>

        <button onClick={handleClick}>Switch {String(isPlaying)}</button>

        <Heading>Истории</Heading>
        <ul>
          {dummyStories.map(item => (
            // <Story story={item} key={item}/>
            <li key={item}>{item}-я история</li>
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
