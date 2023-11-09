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
  isSelectingDone: boolean;
}

function ChooseStories({
  selectedStories,
  addSelectedStory,
  isSelectingDone,
}: Props) {
  return (
    <>
      <Head>
        <title>Выбор историй</title>
      </Head>

      <Layout>
        <AppLink href="/">Назад</AppLink>
        <Heading>Выбор историй</Heading>
        <p>
          Выбранные истории:{" "}
          {selectedStories && selectedStories.map(act => <>{act.title} </>)}
        </p>
        <div className="m-3 grid grid-cols-6 gap-4 w-full h-full justify-items-stretch items-stretch aspect-square">
          {stories.map(story => {
            const selectedStoryStyle =
              selectedStories?.find(
                selectedStory => selectedStory.title === story.title
              ) && " border-black bg-gray-200";

            const disabledStyles =
              isSelectingDone && `pointer-events-none hover:bg-inherit`;

            return (
              <button
                type="button"
                className={`flex justify-center items-center border-2 text-5xl hover:bg-gray-100 ${selectedStoryStyle} ${disabledStyles}`}
                key={story.title}
                onClick={() => addSelectedStory(story)}
              >
                {story.title}
              </button>
            );
          })}
        </div>
        <AppLink href={`/act/${ACTS[0].slug}`} isDisabled={false}>
          Начать спектакль
        </AppLink>
      </Layout>
    </>
  );
}

export default ChooseStories;
