import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "@/pages/Layout";
import Head from "next/head";

function End() {
  return (
    <>
      <Head>
        <title>Послесловие</title>
      </Head>

      <Layout>
        <main className="py-[37px] px-[15px] flex flex-col justify-center items-center text-center min-h-[calc(100vh-44px)]">
          <Heading>Спектакль окончен</Heading>

          <div className="mt-[42px]">
            <AppLink href="/choose-stories" size="medium">
              Выбрать другие истории
            </AppLink>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default End;
