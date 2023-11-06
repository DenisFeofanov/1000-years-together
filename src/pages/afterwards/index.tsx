import AppLink from "@/components/AppLink";
import Layout from "../Layout";
import Head from "next/head";

function Afterwards() {
  return (
    <>
      <Head>
        <title>Послесловие</title>
      </Head>

      <Layout>
        <p>Спектакль окончен</p>
        <AppLink href="/">В начало</AppLink>
      </Layout>
    </>
  );
}

export default Afterwards;
