import AppLink from "@/components/AppLink";
import Header from "@/components/Header";
import Layout from "@/pages/Layout";
import Head from "next/head";

function End() {
  return (
    <>
      <Head>
        <title>Послесловие</title>
      </Head>

      <Layout>
        <div className="min-h-screen grid grid-rows-[auto_1fr]">
          <Header title="тысяча лет вместе" titleType="text" />

          <div className="py-[37px] px-[15px] flex flex-col justify-center items-center text-center">
            <h1
              className={`text-blackHeading text-[2rem] tracking-[-1px] not-italic font-semibold leading-none md:text-[4rem] md:tracking-[-4.8px] md:max-w-[1370px] lg:text-[6rem]`}
            >
              Спектакль окончен
            </h1>
            <div className="mt-[42px]">
              <AppLink href="/choose-stories" size="medium">
                Выбрать другие истории
              </AppLink>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default End;
