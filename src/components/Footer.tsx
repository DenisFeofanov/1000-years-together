import { usePathname } from "next/navigation";
import AppLink from "./AppLink";
import NoWrap from "./NoWrap";

export default function Footer() {
  const currPathname = usePathname();

  return (
    <footer className="px-[15px] pb-[85px] flex flex-col items-center text-center text-grayDark text-[0.6875rem] font-normal leading-[1.5] md:text-[0.8125rem] md:px-0 md:p-0 md:bg-[#F5F5F5] md:pt-[30px] md:pb-[65px]">
      <p className="hidden sm:block sm:px-[15px] sm:mx-auto sm:mb-[30px] sm:max-w-[640px] sm:text-center sm:text-blackText sm:text-[1.125rem] sm:font-normal sm:leading-[1.5] lg:[1.125rem]">
        Спектакль стал результатом научно-театральной лаборатории «1000&nbsp;лет
        вместе», исследующей отношение к смерти людей разных поколений,
        социального положения и опыта. Премьера состоялась в 2019&nbsp;году в
        рамках <NoWrap>5-й</NoWrap>&nbsp;Уральской индустриальной биеннале
        современного искусства.
      </p>

      {currPathname !== "/feedback" && (
        <div className="mb-[30px]">
          <AppLink href="/feedback" size="small">
            Написать нам
          </AppLink>
        </div>
      )}

      <p>
        Создан при поддержке
        <br />
        Уральского филиала Пушкинского музея
        <br />
        18+
      </p>

      <address className="mt-[10px] md:mt-[30px] not-italic">
        <a
          className="hover:underline"
          target="_blank"
          href="https://anatolyivanov.ru"
        >
          <span className="text-grayReg ">Дизайн:</span> Анатолий Иванов
        </a>
      </address>

      <p className="mt-[50px]">© АНО «ЗА АРТ». Все права защищены.</p>
    </footer>
  );
}
