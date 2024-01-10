import Header from "@/components/Header";
import Heading from "@/components/Heading";
import StoryTile from "@/components/StoryTile";
import { stories } from "@/shared/Stories";
import Head from "next/head";
import Link from "next/link";
import Layout from "../Layout";

function Archive() {
  return (
    <>
      <Head>
        <title>Архив историй</title>
      </Head>

      <Layout>
        <div className="fullscreen-height grid grid-rows-[auto_1fr] pb-[70px]">
          <Header title="Тысяча лет вместе" titleType="link" />

          <div className="flex flex-col justify-between">
            <div className="grow pt-[37px] px-[15px] md:pt-[75px]">
              <div className="flex items-start gap-[31px]">
                <Heading>Архив историй</Heading>

                <p
                  className={`hidden lg:block lg:mt-[20px] lg:bg-greenSoft lg:rounded-[6px] lg:whitespace-pre lg:px-[10px] lg:py-[8px] lg:text-grayDark lg:text-[0.8125rem] lg:not-italic lg:font-medium lg:leading-[1.2] lg:tracking-[-0.13px] lg:relative lg:before:content-[url(../../public/headingTooltipArrow.svg)] lg:before:absolute lg:before:left-[-8px] lg:before:top-[50%] lg:before:h-[13px] lg:before:-translate-y-1/2`}
                >
                  Все истории доступны&nbsp;
                  <br />в любом порядке
                </p>
              </div>

              <div className="mt-[40px] grid grid-cols-3 gap-[15px] md:grid-cols-5 md:mt-[80px]">
                {stories.map((story, index) => {
                  return (
                    <Link href={`/archive/${story.title}`} key={story.title}>
                      <StoryTile
                        index={story.title}
                        duration={story.duration}
                        isSelectable={false}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Archive;
