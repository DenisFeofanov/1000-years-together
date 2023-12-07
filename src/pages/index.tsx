import Mute from "@/components/Mute";
import Layout from "@/pages/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { RFDewi } from "./fonts";

export default function Home() {
  return (
    <>
      <Head>
        <title>1000 лет вместе</title>
      </Head>

      <Layout>
        <main className="grow flex flex-col justify-between">
          <section className="pt-[120px] px-[15px] pb-[40px] xsm:pt-[90px] sm:pt-[81px] md:pt-0">
            <div className="md:min-h-screen md:flex md:flex-col md:items-start md:pt-[30vh]">
              <h1
                className={`${RFDewi.className} text-blackHeading text-[2.75rem] leading-[0.9] tracking-[-0.0825rem] uppercase xsm:text-[3.25rem] xsm:tracking-[-0.0975rem] sm:text-[3.5rem] sm:tracking-[-0.105rem] md:text-[6.625rem] md:tracking-[-0.19875rem] lg:text-[8.875rem] lg:tracking-[-0.26625rem] xlg:text-[10.5rem] xlg:tracking-[-0.315rem]`}
              >
                Тысяча лет
                <br />
                вместе
              </h1>
              <p className="mt-[15px] text-blackText text-[0.5625rem] font-semibold uppercase max-w-[80px] md:text-[0.6875rem] md:mt-[25px]">
                В рамках 5&#8208;й Уральской биеннале современного искусства
              </p>

              {/* <div className="hidden xsm:flex xsm:justify-center mt-[305px] sm:mt-[345px] md:mt-[110px] lg:mt-[150px] xlg:mt-[130px]">
                <AppLink
                  href="/choose-stories"
                  className="xsm:text-[1.125rem] xsm:before:text-[1.5rem] xsm:after:text-[1.5rem]"
                >
                  Начать спектакль
                </AppLink>
              </div> */}
            </div>

            <p className="hidden sm:block sm:text-center sm:text-blackText sm:text-[1.125rem] sm:font-normal sm:leading-[1.5] sm:mt-[100px] lg:[1.125rem] lg:mt-[110px]">
              Спектакль стал результатом научно-театральной лаборатории «1000
              лет вместе», исследующей отношение к смерти людей разных
              поколений, социального положения и опыта. Премьера состоялась в
              2019 году в рамках 5-й Уральской индустриальной биеннале
              современного искусства.
            </p>
          </section>

          <footer className="px-[15px] pb-[40px] mt-[370px] flex flex-col items-center text-center text-grayDark text-[11px] font-normal leading-[1.5] xsm:mt-[90px] md:px-0 md:p-0 md:bg-[#F5F5F5] md:pt-[30px] md:pb-[65px] lg:mt-[110px]">
            {/* <AppLink
              className="hidden my-auto md:flex md:text-[1rem]"
              href="/feedback"
            >
              Написать нам
            </AppLink> */}

            <p className="md:mt-[30px]">
              Создан при поддержке
              <br />
              Уральского филиала Пушкинского музея
            </p>

            <address className="mt-[10px] md:mt-[30px] not-italic">
              <a target="_blank" href="https://anatolyivanov.ru">
                <span className="text-grayReg ">Дизайн:</span> Анатолий Иванов
              </a>
            </address>

            <p className="mt-[50px]">© АНО «ЗА АРТ». Все права защищены.</p>
          </footer>
        </main>

        <div className="h-[44px] sticky bottom-0 left-0 right-0 xsm:hidden">
          {/* <AppLink
            className={`!w-full h-full px-0 bg-white active:rounded-none rounded-none init:border-0 init:border-t init:border-grayDark before:content-["("] before:font-normal before:text-[1.375rem] after:content-[")"] after:font-normal after:text-[1.375rem]`}
            href="/choose-stories"
          >
            Начать спектакль
          </AppLink> */}
        </div>

        <Link
          href="/"
          className="hidden md:block md:fixed md:bottom-0 md:left-0 md:px-[18px] md:py-[13px]"
        >
          <Image
            src="/biennial.svg"
            width="24"
            height="24"
            alt="Biennial logo"
          />
        </Link>
        <Mute className="hidden md:block md:fixed md:bottom-0 md:right-0" />
      </Layout>
    </>
  );
}
