import ChooseStoriesLink from "@/components/ChooseStoriesLink";
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
  const amountOfSelectedStories = selectedStories.filter(
    story => story !== null
  ).length;

  // creating "selected stories" line
  const selectedStoriesNumbers = selectedStories.map(story =>
    story === null ? "_" : story.title
  );
  const selectedStoriesText =
    selectedStories.length > 0
      ? "Вы выбрали: " + selectedStoriesNumbers.join(", ")
      : "Вы еще ничего не выбрали";

  // creating tooltips text
  let headingTooltip, storiesTooltip;
  if (isSelectingDone) {
    headingTooltip = `Отлично, вы выбрали все 5 историй. \nНажмите «Начать спектакль» и включите звук`;
  } else {
    switch (amountOfSelectedStories) {
      case 0:
        headingTooltip = `Выберете пять разных историй в любом \nпорядке. Ни больше, не меньше.`;
        break;
      case 1:
        headingTooltip = `Хорошо, для начала необходимо \nвыбрать еще четыре истории`;
        storiesTooltip = `Вам надо выбрать еще \nчетыре истории`;
        break;
      case 2:
        headingTooltip = `Хорошо, для начала необходимо \nвыбрать еще три истории`;
        storiesTooltip = `Вам надо выбрать еще \nтри истории`;
        break;
      case 3:
        headingTooltip = `Хорошо, для начала необходимо \nвыбрать еще две истории`;
        storiesTooltip = `Вам надо выбрать еще \nдве истории`;
        break;
      case 4:
        headingTooltip = `Хорошо, для начала необходимо \nвыбрать еще одну историю`;
        storiesTooltip = `Вам надо выбрать еще \nодну историю`;
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Head>
        <title>Выбор историй</title>
      </Head>

      <Layout>
        <main className="grow flex flex-col justify-between">
          <div className="grow pt-[37px] px-[15px] md:pt-[75px]">
            <div className="flex items-start gap-[31px]">
              <Heading>Выберите 5 историй</Heading>

              <p
                className={`hidden lg:block lg:mt-[20px] lg:bg-greenSoft lg:rounded-[6px] lg:whitespace-pre lg:px-[10px] lg:py-[8px] lg:text-grayDark lg:text-[0.8125rem] lg:not-italic lg:font-medium lg:leading-[1.2] lg:tracking-[-0.13px] lg:relative lg:before:content-[url(../../public/headingTooltipArrow.svg)] lg:before:absolute lg:before:left-[-8px] lg:before:top-[50%] lg:before:h-[13px] lg:before:-translate-y-1/2`}
              >
                {headingTooltip}
              </p>
            </div>

            <div className="mt-[40px] grid grid-cols-3 gap-[15px] md:grid-cols-5 md:mt-[80px]">
              {stories.map((story, index) => {
                return (
                  <StoryTile
                    key={story.title}
                    isSelected={selectedStories.some(
                      selectedStory => selectedStory?.title === story.title
                    )}
                    isSelectingDone={isSelectingDone}
                    onTileClick={() => onClick(story)}
                    index={index + 1}
                    duration={story.duration}
                  />
                );
              })}
            </div>
          </div>

          <div
            className={`mt-[80px] h-[300px] border-t border-t-grayDark flex justify-center items-center md:h-[50px] md:px-[12px] md:py-[7px] md:sticky md:bottom-0 md:left-0 md:right-0 md:mt-[119px] md:grid md:grid-cols-3 ${
              isSelectingDone ? "bg-greenSoft" : "bg-grayNum md:bg-white"
            }`}
          >
            <div className="lg:relative">
              <p className="hidden md:block md:uppercase md:text-blackText md:text-[1rem] md:not-italic md:font-semibold md:leading-[normal]">
                {selectedStoriesText}
              </p>
              <p
                className={`hidden ${
                  isSelectingDone || amountOfSelectedStories === 0
                    ? "lg:hidden"
                    : "lg:block"
                } lg:whitespace-pre lg:absolute lg:bottom-[calc(100%+12px)] lg:left-[43px] lg:px-[10px] lg:pt-[7px] lg:pb-[11px] lg:bg-grayDark lg:rounded-[6px] lg:text-white lg:text-[0.8125rem] lg:not-italic lg:font-medium lg:leading-[1.2] lg:tracking-[-0.13px] lg:before:content-[url(../../public/storiesTooltipArrow.svg)] lg:before:absolute lg:before:left-[9px] lg:before:bottom-[-8px] lg:before:h-[13px]`}
              >
                {storiesTooltip}
              </p>
            </div>
            <ChooseStoriesLink
              href={`/act/${ACTS[0].slug}`}
              disable={!isSelectingDone}
            >
              Начать спектакль
            </ChooseStoriesLink>
          </div>

          {/* <footer
            className={`text-center flex flex-col items-center justify-center pt-[80px] pb-[38px] px-[15px] bg-gradient-to-b from-0% to-[rgba(255, 255, 255, 0.00)] to-[56%] ${
              isSelectingDone ? "from-[#2EF896]" : "from-grayNum"
            }`}
          >
            <p>
              Создан при поддержке
              <br />
              Уральского филиала Пушкинского музея
            </p>

            <address className="mt-[10px] md:mt-[30px] not-italic">
              <a
                className="hover:underline"
                target="_blank"
                href="https://anatolyivanov.ru"
              >
                <span className="text-grayReg ">Дизайн:</span> Анатолий Иванов
              </a>
            </address>
          </footer> */}
        </main>
      </Layout>
    </>
  );
}

export default ChooseStories;
