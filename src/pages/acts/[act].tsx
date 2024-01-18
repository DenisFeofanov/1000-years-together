import Act from "@/components/Act";
import { Act as ActInterface } from "@/interfaces/Act";
import { ACTS } from "@/shared/Act";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type Props = {
  act: ActInterface;
};

interface Params extends ParsedUrlQuery {
  act: string;
}

const ActPage: NextPage<Props> = ({ act, ...rest }) => {
  const router = useRouter();

  return <Act act={act} key={router.asPath} {...rest} />;
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

  const currentAct = ACTS.find(act => act.slug === currentSlug)!;

  return {
    props: {
      act: currentAct,
    },
  };
};

export default ActPage;
