import Act from "@/components/Act";
import ClientOnly from "@/components/ClientOnly";
import { Act as ActInterface } from "@/interfaces/Act";
import { ACTS } from "@/shared/Act";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type Props = {
  goBackHref: string;
  goNextHref: string;
  act: ActInterface;
};

interface Params extends ParsedUrlQuery {
  act: string;
}

const ActPage: NextPage<Props> = ({ goBackHref, goNextHref, act, ...rest }) => {
  const router = useRouter();

  return (
    <Act
      goBackHref={goBackHref}
      goNextHref={goNextHref}
      act={act}
      key={router.asPath}
      {...rest}
    />
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
  const currentAct = ACTS.find(act => act.slug === currentSlug)!;

  return {
    props: {
      goBackHref: previousSlug || "/choose-stories",
      goNextHref: nextSlug || "/end",
      act: currentAct,
    },
  };
};

function findAdjacentActSlugs(element: string, array: ActInterface[]) {
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

export default ActPage;
