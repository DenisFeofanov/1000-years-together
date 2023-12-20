import Header from "@/components/Header";
import Heading from "@/components/Heading";
import LinkHome from "@/components/LinkHome";
import Paragraph from "@/components/Paragraph";
import Layout from "@/pages/Layout";
import Head from "next/head";

export default function Tutorial() {
  return (
    <>
      <Head>
        <title>Инструкция</title>
      </Head>

      <Layout>
        <div className="min-h-screen grid grid-rows-[auto_1fr]">
          <Header title="тысяча лет вместе" titleType="link" />

          <div className="pt-[37px] pb-[120px] md:pt-[75px] px-[15px]">
            <Heading>Инструкция</Heading>

            <div className="mt-[40px] md:mt-[70px] max-w-[640px] mx-auto">
              <Paragraph>
                Команда лаборатории провела интервью и собрала более 20 историй.
                В спектакле вы выберете и сможете услышать лишь 5 из них. Для
                выбора историй нажмите любые 5 цифр в той последовательности, в
                которой хотели бы их послушать.  После окончания спектакля вы
                сможете послушать все оставшиеся истории в свободном режиме или
                пройти спектакль заново, выбрав новые истории.
              </Paragraph>
            </div>
          </div>
        </div>
        <LinkHome />
      </Layout>
    </>
  );
}
