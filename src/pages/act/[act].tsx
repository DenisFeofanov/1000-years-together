import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import { ACTS, Act, sharedSlug } from "@/shared/acts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
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
  return (
    <Layout>
      <AppLink href="/">Назад</AppLink>

      <Heading>{title}</Heading>

      <div className="flex gap-3 w-full justify-between">
        <div>
          {previousSlug && (
            <AppLink href={`/${sharedSlug}/${previousSlug}`}>
              Предыдущая часть
            </AppLink>
          )}
        </div>

        <div>
          {nextSlug && (
            <AppLink href={`/${sharedSlug}/${nextSlug}`}>
              Следующая часть
            </AppLink>
          )}
        </div>
      </div>

      <AppLink href="/stories">Далее</AppLink>
    </Layout>
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
