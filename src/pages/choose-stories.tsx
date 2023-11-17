import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import StoryTile from "@/components/StoryTile";
import { Story } from "@/interfaces/Story";
import Layout from "@/pages/Layout";
import { ACTS } from "@/shared/Act";
import { stories } from "@/shared/Stories";
import Head from "next/head";

interface Props {
  selectedStories: Story[];
  onClick: (story: Story) => void;
}

function ChooseStories({ selectedStories, onClick }: Props) {
  const isSelectingDone =
    selectedStories.length === 5 &&
    selectedStories.every(story => story !== null);
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
            alert("localStorage is cleared successfully");
          }}
        >
          Очистить Local Storage
        </button>
        <AppLink href="/">Назад</AppLink>
        <Heading>Выбор историй</Heading>

        <p>
          Выбранные истории:{" "}
          {selectedStories &&
            selectedStories.map(act =>
              act === null ? " _ " : <span key={act.title}>{act.title} </span>
            )}
        </p>

        <div className="m-3 grid grid-cols-6 gap-1 lg:gap-4 w-full h-full justify-items-stretch items-stretch aspect-square">
          {stories.map(story => {
            return (
              <StoryTile
                key={story.title}
                isSelected={selectedStories.some(
                  selectedStory => selectedStory?.title === story.title
                )}
                isSelectingDone={isSelectingDone}
                onTileClick={() => onClick(story)}
                title={story.title}
              />
            );
          })}
        </div>

        <AppLink href={`/act/${ACTS[0].slug}`} isDisabled={!isSelectingDone}>
          Начать спектакль
        </AppLink>
      </Layout>
    </>
  );
}

export default ChooseStories;
