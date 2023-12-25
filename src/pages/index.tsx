import AppLink from "@/components/AppLink";
import Header from "@/components/Header";
import LinkHome from "@/components/LinkHome";
import NoWrap from "@/components/NoWrap";
import StickyAppLink from "@/components/StickyAppLink";
import Layout from "@/pages/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>1000 лет вместе</title>
      </Head>

      <Layout>
        <div className="min-h-screen grid grid-rows-[auto_1fr] xsm:mb-[70px] sm:mb-[0px]">
          <Header title="Бессмертие" titleType="text" />

          <div className="flex flex-col h-full pt-[76px] px-[15px] pb-[20px] xsm:pt-[50px] sm:pt-[37px] md:pt-0 lg:pb-[110px]">
            <div className="h-full md:grid md:grid-rows-[repeat(3,1fr)]">
              <div className="h-full md:row-start-2 md:row-end-4 flex flex-col justify-between md:justify-start">
                <div>
                  <h1
                    className={`font-mainHeading text-blackHeading text-[2.75rem] leading-[0.9] tracking-[-0.0825rem] uppercase xsm:text-[3.25rem] xsm:tracking-[-0.0975rem] sm:text-[3.5rem] sm:tracking-[-0.105rem] md:text-[6.625rem] md:tracking-[-0.19875rem] lg:text-[8.875rem] lg:tracking-[-0.26625rem] xlg:text-[10.5rem] xlg:tracking-[-0.315rem]`}
                  >
                    Тысяча лет
                    <br />
                    вместе
                  </h1>
                  <p className="mt-[15px] text-blackText text-[0.5625rem] font-semibold uppercase max-w-[80px] md:text-[0.6875rem] md:mt-[25px]">
                    В рамках <NoWrap>5-й</NoWrap>&nbsp;Уральской биеннале
                    современного искусства
                  </p>
                </div>

                <div className="hidden xsm:block xsm:mt-[100px] xsm:text-center md:mt-[110px] lg:mt-[150px] xlg:mt-[130px]">
                  <AppLink href="/choose-stories">Начать спектакль</AppLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="hidden sm:block sm:px-[15px] sm:mx-auto sm:mb-[90px] sm:max-w-[640px] sm:text-center sm:text-blackText sm:text-[1.125rem] sm:font-normal sm:leading-[1.5] sm:mt-[100px] lg:[1.125rem] lg:mt-[110px]">
          Спектакль стал результатом научно-театральной лаборатории
          «1000&nbsp;лет вместе», исследующей отношение к смерти людей разных
          поколений, социального положения и опыта. Премьера состоялась в
          2019&nbsp;году в рамках <NoWrap>5-й</NoWrap>&nbsp;Уральской
          индустриальной биеннале современного искусства.
        </p>

        <div className="h-[44px] fixed bottom-0 left-0 right-0 xsm:hidden">
          <StickyAppLink href="/choose-stories">Начать спектакль</StickyAppLink>
        </div>

        <LinkHome />
      </Layout>
    </>
  );
}
