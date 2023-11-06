import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "@/pages/Layout";
import { ACTS } from "@/shared/acts";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>1000 лет вместе</title>
      </Head>

      <Layout>
        <Heading>1000 лет вместе</Heading>

        <nav className="flex gap-2">
          <AppLink href="/feedback">Обратная связь</AppLink>
          <AppLink href="/tutorial">Инструкция</AppLink>
          <AppLink href="/about">О проекте</AppLink>
        </nav>

        <AppLink href={`/act/${ACTS[0].slug}`}>Начать спектакль</AppLink>
      </Layout>
    </>
  );
}
