import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import { Story } from "@/interfaces/Story";
import { ACTS } from "@/shared/Act";
import { stories } from "@/shared/Stories";
import Head from "next/head";
import Layout from "../Layout";

interface Props {
  selectedStories: Story[] | null;
  addSelectedStory: (story: Story) => void;
}

function ChooseStories({ selectedStories, addSelectedStory }: Props) {
  return (
    <>
      <Head>
        <title>Выбор историй</title>
      </Head>

      <Layout>
        <AppLink href="/">Назад</AppLink>
        <Heading>Выбор историй</Heading>
        Выбранные истории:{" "}
        {selectedStories &&
          selectedStories.map(act => <p key={act.title}>{act.title}</p>)}
        <div className="grid grid-cols-6 gap-4 w-full h-full justify-items-stretch items-stretch aspect-square">
          {stories.map(story => (
            <button
              type="button"
              className="flex justify-center items-center bg-slate-500 text-5xl text-white"
              key={story.title}
              onClick={() => addSelectedStory(story)}
            >
              {story.title}
            </button>
          ))}
        </div>
        <AppLink href={`/act/${ACTS[0].slug}`} isDisabled={false}>
          Начать спектакль
        </AppLink>
      </Layout>
    </>
  );
}

export default ChooseStories;
