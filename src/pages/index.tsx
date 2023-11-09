import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "@/pages/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>1000 лет вместе</title>
      </Head>

      <Layout>
        <Heading>1000 лет вместе</Heading>

        <nav className="flex flex-col lg:flex-row lg:gap-2">
          <AppLink href="/feedback">Обратная связь</AppLink>
          <AppLink href="/tutorial">Инструкция</AppLink>
          <AppLink href="/about">О проекте</AppLink>

          <AppLink href="/choose-stories">Начать спектакль</AppLink>
        </nav>
      </Layout>
    </>
  );
}
