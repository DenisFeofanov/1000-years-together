import Layout from "@/pages/Layout";
import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Head from "next/head";

export default function Tutorial() {
  return (
    <>
      <Head>
        <title>Инструкция</title>
      </Head>

      <Layout>
        <main className="grow py-[75px] px-[15px]">
          <Heading>Инструкция</Heading>

          <p className="mt-[70px] text-[1rem] leading-[25px] max-w-[640px] mx-auto md:text-[1.25rem] font-normal md:leading-[30px]">
            Команда лаборатории провела интервью и собрала более 20 историй. В
            спектакле вы выберете и сможете услышать лишь 5 из них. Для выбора
            историй нажмите любые 5 цифр в той последовательности, в которой
            хотели бы их послушать.  После окончания спектакля вы сможете
            послушать все оставшиеся истории в свободном режиме или пройти
            спектакль заново, выбрав новые истории.
          </p>
        </main>
      </Layout>
    </>
  );
}
