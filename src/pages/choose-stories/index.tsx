import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import StoryTile from "@/components/StoryTile";
import { Story } from "@/interfaces/Story";
import { ACTS } from "@/shared/Act";
import { stories } from "@/shared/Stories";
import Head from "next/head";
import Layout from "../Layout";

interface Props {
  selectedStories: Story[] | null;
  handleClick: (story: Story) => void;
  isSelectingDone: boolean;
}

function ChooseStories({
  selectedStories,
  handleClick,
  isSelectingDone,
}: Props) {
  return (
    <>
      <Head>
        <title>Выбор историй</title>
      </Head>

      <Layout>
        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            console.log("localStorage is cleared successfully");
          }}
        >
          Очистить Local Storage
        </button>
        <AppLink href="/">Назад</AppLink>
        <Heading>Выбор историй</Heading>

        <p>
          Выбранные истории:{" "}
          {selectedStories &&
            selectedStories.map(act => (
              <span key={act.title}>{act.title} </span>
            ))}
        </p>

        <div className="m-3 grid grid-cols-6 gap-1 lg:gap-4 w-full h-full justify-items-stretch items-stretch aspect-square">
          {stories.map(story => {
            return (
              <StoryTile
                key={story.title}
                isSelected={Boolean(
                  selectedStories?.find(
                    selectedStory => selectedStory.title === story.title
                  )
                )}
                isSelectingDone={isSelectingDone}
                handleClick={handleClick}
                story={story}
              />
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
