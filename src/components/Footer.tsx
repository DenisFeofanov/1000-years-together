import AppLink from "./AppLink";

export default function Footer() {
  return (
    <footer className="px-[15px] pb-[40px] flex flex-col items-center text-center text-grayDark text-[0.6875rem] font-normal leading-[1.5] md:text-[0.8125rem] md:px-0 md:p-0 md:bg-[#F5F5F5] md:pt-[30px] md:pb-[65px]">
      <AppLink href="/feedback" size="small">
        Написать нам
      </AppLink>

      <p className="mt-[30px]">
        Создан при поддержке
        <br />
        Уральского филиала Пушкинского музея
        <br />
        18+
      </p>

      <address className="mt-[10px] md:mt-[30px] not-italic">
        <a target="_blank" href="https://anatolyivanov.ru">
          <span className="text-grayReg ">Дизайн:</span> Анатолий Иванов
        </a>
      </address>

      <p className="mt-[50px]">© АНО «ЗА АРТ». Все права защищены.</p>
    </footer>
  );
}
