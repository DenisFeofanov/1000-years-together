import Layout from "@/pages/Layout";
import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import Head from "next/head";

export default function Feedback() {
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Обратная связь</title>
      </Head>

      <Layout>
        <Heading>Обратная связь</Heading>

        <form
          onSubmit={e => handleSubmit(e)}
          className="flex flex-col gap-3 max-w-sm"
        >
          <input className="border" type="text" />
          <input className="border" type="text" />

          <button type="submit">Отправить</button>
        </form>

        <AppLink href="/">На главную</AppLink>
      </Layout>
    </>
  );
}
