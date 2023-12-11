import AppLink from "@/components/AppLink";
import Footer from "@/components/Footer";
import LinkHome from "@/components/LinkHome";
import StickyAppLink from "@/components/StickyAppLink";
import { RFDewi } from "@/lib/fonts";
import Layout from "@/pages/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>1000 лет вместе</title>
      </Head>

      <Layout>
        <main className="grow flex flex-col">
          <section className="grow pt-[76px] px-[15px] pb-[370px] xsm:pb-[90px] xsm:pt-[50px] sm:pt-[37px] md:pt-0 lg:pb-[110px]">
            <div className="md:min-h-screen md:flex md:flex-col md:items-start md:pt-[30vh]">
              <h1
                className={`font-mainHeading text-blackHeading text-[2.75rem] leading-[0.9] tracking-[-0.0825rem] uppercase xsm:text-[3.25rem] xsm:tracking-[-0.0975rem] sm:text-[3.5rem] sm:tracking-[-0.105rem] md:text-[6.625rem] md:tracking-[-0.19875rem] lg:text-[8.875rem] lg:tracking-[-0.26625rem] xlg:text-[10.5rem] xlg:tracking-[-0.315rem]`}
              >
                Тысяча лет
                <br />
                вместе
              </h1>
              <p className="mt-[15px] text-blackText text-[0.5625rem] font-semibold uppercase max-w-[80px] md:text-[0.6875rem] md:mt-[25px]">
                В рамках 5&#8208;й Уральской биеннале современного искусства
              </p>

              <div className="hidden xsm:block self-center mt-[305px] sm:mt-[345px] md:mt-[110px] lg:mt-[150px] xlg:mt-[130px]">
                <AppLink href="/choose-stories">Начать спектакль</AppLink>
              </div>
            </div>

            <p className="hidden sm:block sm:max-w-[640px] sm:mx-auto sm:text-center sm:text-blackText sm:text-[1.125rem] sm:font-normal sm:leading-[1.5] sm:mt-[100px] lg:[1.125rem] lg:mt-[110px]">
              Спектакль стал результатом научно-театральной лаборатории «1000
              лет вместе», исследующей отношение к смерти людей разных
              поколений, социального положения и опыта. Премьера состоялась в
              2019 году в рамках 5-й Уральской индустриальной биеннале
              современного искусства.
            </p>
          </section>
        </main>

        <div className="h-[44px] sticky bottom-0 left-0 right-0 xsm:hidden">
          <StickyAppLink href="/choose-stories">Начать спектакль</StickyAppLink>
        </div>

        <LinkHome />
      </Layout>
    </>
  );
}
