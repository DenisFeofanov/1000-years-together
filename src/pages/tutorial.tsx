import AppLink from "@/components/AppLink";
import Header from "@/components/Header";
import LinkHome from "@/components/LinkHome";
import NoWrap from "@/components/NoWrap";
import OrderedItem from "@/components/OrderedItem";
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
        <div className="fullscreen-height grid grid-rows-[auto_1fr]">
          <Header
            title="тысяча лет вместе"
            titleType="link"
            isArchiveLinkShown={false}
          />

          <div className="pt-[37px] pb-[120px] md:pt-[75px] px-[15px]">
            <h1
              className={`text-blackHeading text-[1.5rem] xsm:text-[2rem] tracking-[-1px] not-italic font-semibold leading-none md:text-[4rem] md:tracking-[-4.8px] lg:text-[6rem]`}
            >
              Инструкция
            </h1>

            <section className="mt-[40px] md:mt-[70px] max-w-[40rem] mx-auto">
              <Paragraph>
                Вашему вниманию представляется архив спектакля. В нем —
                материалы, полученные и обработанные в Екатеринбурге в августе{" "}
                <NoWrap>2019 года</NoWrap> в ходе{" "}
                <NoWrap>научно-театральной</NoWrap> лаборатории{" "}
                <NoWrap>«1000 лет вместе».</NoWrap>
              </Paragraph>

              <Paragraph>
                Проект <NoWrap>«1000 лет вместе»</NoWrap> собирал людей,
                желающих освоить биографические интервью, научиться говорить с
                другими о жизни других. В течение целого дня участники
                лаборатории бродили по городу, завязывали разговоры со
                случайными людьми и надеялись, что беседа разовьется. Разговоры
                вели где угодно: от автомойки до продуктового магазина. И вели
                их с кем угодно: нет деления собеседников на интересных и
                обыденных. Случайность встречи — главный принцип отбора. Кто
                заговорит — того слушаем.
              </Paragraph>

              <Paragraph>
                Работа с архивом, в отличие от «живого» спектакля, дело
                индивидуальное. Свидетельства могут сложиться в историю, если вы
                будете воспринимать их одно за другим. Уважая правила спектакля,
                прошедшего в Екатеринбурге в <NoWrap>2019 году</NoWrap>, — мы
                лишь даем несколько подсказок.
              </Paragraph>
            </section>

            <ol className="max-w-[45rem] mt-[4.4rem]">
              <OrderedItem number={"1"}>
                Во время лаборатории участники собрали более{" "}
                <NoWrap>30 историй</NoWrap>. В цифровой версии, как и в
                оригинальном спектакле, вы выберете и сможете услышать лишь{" "}
                <NoWrap>5 из</NoWrap> них. Для выбора историй нажмите любые{" "}
                <NoWrap>5 цифр</NoWrap> в той последовательности, в которой
                хотели бы их послушать.
              </OrderedItem>

              <OrderedItem number={"2"}>
                Рекомендуем использовать наушники.
              </OrderedItem>

              <OrderedItem number={"3"}>
                Не каждая история начинается с разговора. Если видите: ползунок
                двигается, но герой еще молчит, — просим не останавливать трек и
                слушать дальше!
              </OrderedItem>

              <OrderedItem number={"4"}>
                Мы будем рады, если вы обратитесь к историям вновь. После
                окончания спектакля вы сможете послушать их в свободном режиме
                или пройти спектакль заново, выбрав новые истории.
              </OrderedItem>
            </ol>

            <div className="mt-[4.38rem] text-center">
              <AppLink href={"/archive"}>архив Историй</AppLink>
            </div>
          </div>
        </div>
        <LinkHome />
      </Layout>
    </>
  );
}
