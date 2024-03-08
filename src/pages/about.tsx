import image1 from "@/about-1.png";
import image2 from "@/about-2.png";
import image3 from "@/about-3.png";
import image4 from "@/about-4.png";
import image5 from "@/about-5.png";
import image6 from "@/about-6.png";
import image7 from "@/about-7.png";
import image8 from "@/about-8.png";
import image9 from "@/about-9.jpg";
import bienalleLogo from "@/bienalle-logo.png";
import elcinLogo from "@/elcin-logo.png";
import grantiLogo from "@/granti-logo.png";
import ranghisLogo from "@/ranghis-logo.png";
import zaartLogo from "@/zaart-logo.png";
import logo from "@/biennial.svg";
import Container from "@/components/About/Container";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import LinkHome from "@/components/LinkHome";
import NoWrap from "@/components/NoWrap";
import Paragraph from "@/components/Paragraph";
import SubHeading from "@/components/SubHeading";
import Layout from "@/pages/Layout";
import Head from "next/head";
import Image from "next/image";
import AnnotatedImage from "@/components/About/AnnotatedImage";
import AnnotatedVideo from "@/components/About/AnnotatedVideo";
import CreatorName from "@/components/CreatorName";
import IndentedParagraph from "@/components/About/IndentedParagraph";

export default function About() {
  const subHeadingMargin = "mt-[40px] rem:lg:mt-0";
  return (
    <>
      <Head>
        <title>О проекте</title>
      </Head>

      <Layout>
        <div className="fullscreen-height grid grid-rows-[auto_1fr] max-w-[1600px] mx-auto">
          <Header title="тысяча лет вместе" titleType="link" />

          <div className="rem:pt-[67px]">
            <Container>
              <Heading>
                Научно-театральная
                <br />
                лаборатория «1&nbsp;000&nbsp;лет вместе»
              </Heading>
            </Container>

            <div className="rem:mt-[30px] lg:rem:mt-[40px]">
              <Image
                className="w-full"
                src={image1}
                alt="Люди в наушниках перед ячейками историй"
                priority
                sizes="100vw"
              />
            </div>

            <Container className="rem:mt-[15px] lg:rem:mt-[70px] lg:rem:mb-[190px] lg:grid grid-cols-[1fr_1fr] lg:rem:gap-[40px]">
              <div className="lg:rem:max-w-[363px]">
                <div className="hidden lg:block">
                  <AnnotatedImage
                    image={image2}
                    imageAlt="Плакат проекта"
                    annotation="Проект в рамках 5-й Уральской индустриальной биеннале современного искусства"
                  />
                </div>

                <p className="text-[1.125rem] leading-[1.5] font-normal text-blackText lg:hidden">
                  Проект в рамках 5-й Уральской
                  <br />
                  индустриальной биеннале
                  <br />
                  современного искусства
                </p>
              </div>

              <div className="rem:mt-[42px] lg:mt-0 rem:lg:mr-[40px]">
                <Paragraph>
                  Лаборатория — проект «перевода» научного знания, а также
                  гипотез, формирующихся в гуманитарном знании, в формат
                  выступлений, перформансов и иммерсивных постановок. «Перевод»
                  осуществляется по мотивам текстов и исследований, которые
                  связаны с основной темой биеннале: бессмертие, социальная
                  смерть, «вечность» произведений искусства, трансформации
                  общества.
                </Paragraph>

                <Paragraph>
                  Работа лаборатории шла в два этапа: исследовательский
                  (научный) и театральный. Итогом стала экспериментальная
                  постановка, выполненная в жанре «театра инструкций»,
                  превращающего зрителя в активного участника и одного из
                  создателей спектакля. 
                </Paragraph>
              </div>
            </Container>

            <div className="rem:mt-[80px]">
              <Image
                className="w-full"
                src={image3}
                alt="Пустые стулья перед ячейками историй"
                sizes="100vw"
              />
            </div>

            <Container className="lg:rem:mt-[70px] lg:rem:mb-[190px] lg:grid grid-cols-[1fr_1fr] lg:rem:gap-[40px]">
              <div>
                <div className={`${subHeadingMargin}`}>
                  <SubHeading>Часть первая — научная:</SubHeading>
                </div>

                <div className="rem:mt-[24px] rem:lg:mt-[30px] lg:rem:mr-[40px]">
                  <Paragraph>
                    С 1&nbsp;по 4&nbsp;августа 28&nbsp;участников лаборатории
                    поучаствовали в тренинге по глубокому интервью, в тренинге
                    по документальному театру и разобрали тонкости
                    социологических исследований.
                  </Paragraph>

                  <Paragraph>
                    В последний день лаборатории участники тренинга собрали
                    более <NoWrap>20 тандемных</NoWrap> интервью в разных точках
                    Екатеринбурга. Они беседовали со случайно встреченными
                    собеседниками — на улицах, лавочках и в подъездах. Через
                    биографическое интервью они пытались выйти на разговоры о
                    близких, об ушедших, о собственном отношении к жизни и, как
                    следствие, смерти. Возраст собеседников — от{" "}
                    <NoWrap>33 до</NoWrap> <NoWrap>93 лет</NoWrap>.
                  </Paragraph>
                </div>
              </div>

              <div className="rem:mt-[43px] lg:-order-1 rem:lg:mt-0">
                <AnnotatedImage
                  image={image4}
                  imageAlt="Доска с именами"
                  annotation="Всего представлено 30 различных историй"
                />
              </div>
            </Container>

            <Image
              src={image5}
              className="w-full rem:mt-[100px]"
              alt="Люди сидят и слушают истории в освещенной красным комнате"
            />

            <Container className="lg:rem:mt-[70px] lg:rem:mb-[120px] lg:grid grid-cols-[1fr_1fr] lg:rem:gap-[40px]">
              <div>
                <div className={`${subHeadingMargin}`}>
                  <SubHeading>Часть вторая — театральная:</SubHeading>
                </div>

                <div className="rem:mt-[24px] rem:lg:mt-[30px] rem:lg:mr-[40px]">
                  <Paragraph>
                    Собранные интервью стали основой и отправной точкой для
                    создания драматургического текста. Помимо материалов
                    интервью, в него были включены документальные истории из
                    открытых источников.
                  </Paragraph>

                  <Paragraph>
                    Постановочная команда решила поработать в новом сценическом
                    формате: главные роли отданы самим зрителям, сталкивающимся
                    с документальными историями. Главным элементом спектакля
                    стала стена-колумбарий, в которой располагались
                    пронумерованные ячейки со спрятанными в них персональными
                    историями людей — медийных и «обычных», взрослых и молодых,
                    боящихся смерти и равнодушных к ней.
                  </Paragraph>

                  <Paragraph>
                    Постановочная команда решила поработать в новом сценическом
                    формате: главные роли отданы самим зрителям, сталкивающимся
                    с документальными историями. Главным элементом спектакля
                    стала стена-колумбарий, в которой располагались
                    пронумерованные ячейки со спрятанными в них персональными
                    историями людей — медийных и «обычных», взрослых и молодых,
                    боящихся смерти и равнодушных к ней.
                  </Paragraph>

                  <Paragraph>
                    После премьеры у проекта была короткая, но насыщенная
                    фестивальная жизнь.
                  </Paragraph>

                  <Paragraph>
                    В 2020&nbsp;году команду проекта пригласили провести
                    тренинг, собрать локальные истории и адаптировать спектакль
                    в Красноярске, в музейном центре{" "}
                    <NoWrap>«Площадь Мира»</NoWrap>. К сожалению, из-за
                    ограничений, связанных с <NoWrap>COVID-19</NoWrap>,
                    результат тренинга получилось презентовать только в цифровом
                    формате. Но осенью&nbsp;2020 года команде удалось
                    представить спектакль публично в рамках фестиваля THEATRUM в
                    Москве.
                  </Paragraph>

                  <Paragraph>
                    В 2021&nbsp;году Архангельский молодёжный театр позвал
                    проект на фестиваль «Европейская весна», для которого
                    команда вновь провела тренинг и адаптировала спектакль под
                    локальный контекст. В итоге, на один сезон спектакль стал
                    частью репертуара театра. За всё время в проекте было
                    78&nbsp;участников и было собрано больше 90&nbsp;разных
                    историй. Также по итогам лаборатории в Архангельске была
                    подготовлена публикация.
                  </Paragraph>
                </div>
              </div>

              <div className="rem:mt-[43px] lg:-order-1 rem:lg:mt-0">
                <AnnotatedImage
                  image={image6}
                  imageAlt="Человек собирается вставить наушники в ячейку истории"
                  annotation="Формат спектакля интерактивный"
                />
              </div>
            </Container>

            <Container>
              <hr className="rem:mt-[90px] rem:mb-[50px] lg:rem:mb-[70px]" />

              <div className="lg:grid lg:grid-cols-2 lg:rem:gap-[160px]">
                <div className={`${subHeadingMargin}`}>
                  <SubHeading>
                    Тренинг научно-театральной лаборатории «1&nbsp;000&nbsp;лет
                    вместе»:
                  </SubHeading>
                </div>

                <div className="rem:mt-[24px] rem:lg:pt-[120px] rem:lg:mr-[40px]">
                  <Paragraph>
                    Видео-эссе по мотивам первого, исследовательского, этапа
                    научно-театральной лаборатории «1000&nbsp;лет вместе»:
                    резкие, смешные и неочевидные рассуждения героев о старении
                    и смерти, которые собрал воедино Дмитрий Ложкин.
                  </Paragraph>
                </div>
              </div>

              <div className="rem:lg:mt-[100px]">
                <AnnotatedVideo url="yjoCtD5Bluk" />
              </div>

              <hr className="rem:mt-[90px] rem:mb-[50px] lg:rem:mt-[160px] lg:rem:mb-[70px]" />

              <div className="lg:grid lg:grid-cols-2 lg:rem:gap-[160px]">
                <div className={`${subHeadingMargin}`}>
                  <SubHeading>
                    Постановка научно-театральной лаборатории «1000&nbsp;лет
                    вместе»
                  </SubHeading>
                </div>

                <div className="rem:mt-[24px] rem:lg:pt-[120px] rem:lg:mr-[40px]">
                  <Paragraph>
                    Команда лаборатории рассказывает, как устроен спектакль
                  </Paragraph>
                </div>
              </div>

              <div className="rem:lg:mt-[100px]">
                <AnnotatedVideo url="mm6C9hj4V7s" />
              </div>

              <hr className="rem:mt-[90px] rem:mb-[50px] lg:rem:mt-[160px] lg:rem:mb-[70px]" />

              <div className="lg:grid lg:grid-cols-2 lg:rem:gap-[160px]">
                <div className={`${subHeadingMargin}`}>
                  <SubHeading>
                    (Не)случайный разговор о смерти / Дмитрий Рогозин, Анна
                    Ипатова. — М.:&nbsp;Common place, 2021
                  </SubHeading>
                </div>

                <div className="rem:mt-[24px] rem:lg:pt-[120px] rem:lg:mr-[40px]">
                  <Paragraph>
                    В разговорах, которые мы ведем с друзьями и близкими, всегда
                    существует круг запретных тем, говорить о которых нет
                    привычки и умения. Немногие могут поддержать разговор
                    старших о возможной смерти, а уж тем более — его завязать.
                    Социологи Дмитрий Рогозин и Анна Ипатова, опираясь на годы
                    полевой работы, просто и ясно рассказывают о том, как начать
                    и успешно провести такой разговор. Нескучные методические
                    рекомендации перемежаются разборами интервью, проведенных в
                    городе Архангельске. Читатели познакомятся с техниками
                    поддержания разговора, этическими дилеммами и отчаянно живым
                    полевым материалом.
                  </Paragraph>

                  <Paragraph>
                    Издание подготовлено при поддержке ЦСИ Архангельск,
                    Архангельского молодёжного театра и Архангельского
                    краеведческого музея.
                  </Paragraph>
                </div>
              </div>

              <hr className="rem:mt-[70px] rem:mb-[50px] lg:rem:mt-[120px] lg:rem:mb-[70px]" />

              <section className="lg:grid lg:grid-cols-2 rem:lg:gap-[80px]">
                <div>
                  <div className={`${subHeadingMargin}`}>
                    <SubHeading>Создатели:</SubHeading>
                  </div>

                  <div className="mt-[35px] lg:grid lg:grid-cols-[1fr,1.8fr] lg:gap-[14px_40px] lg:items-start">
                    <CreatorName
                      role="Кураторы:"
                      name="Валентина Ануфриева, Дмитрий Безуглов, Дмитрий Рогозин, Надежда Галиева"
                    />
                    <CreatorName role="Режиссер:" name="Дмитрий Зимин" />
                    <CreatorName role="Драматург:" name="Полина Бородина" />
                    <CreatorName role="Художник:" name="Владимир Кравцев" />
                    <CreatorName role="Звукорежиссер:" name="Евгений Робенко" />
                    <CreatorName
                      role="Техническая поддержка:"
                      name="Александр Ярусов"
                    />
                    <CreatorName
                      role="Участники лаборатории::"
                      name="Ирина Садчикова, Марина Крышталева, Дмитрий Ложкин, Анастасия Котылева, Ольга Фархитдинова, Дарья Сыскова, Евгений Андреев, Анастасия Перкина, Наталья Винокурова, Ника Манькова, Надежда Вологжанинова, Марина Говзман, Влада Березина, Юля Секушина, Ирина Ветрова, Дарья Сергеева, Ирина Корнеевская, Кристина Окладных, Данила Блинов, Дмитрий Безуглов, Юлия Голяк, Александр Думчиков, Лера Лепаловская, Семён Войнов, Екатерина Пирожок, Валентина Ануфриева, Кирилл Верхозин, Анна Устякина, Лариса Петрова, Анастасия Егорова"
                    />
                  </div>
                </div>

                <div className="rem:mt-[100px] lg:self-end">
                  <AnnotatedImage
                    className="rem:lg:h-[242px] lg:object-cover"
                    image={image9}
                    imageAlt="Пустые стулья перед ячейками историй"
                  />
                </div>
              </section>

              <hr className="rem:mt-[70px] rem:mb-[50px] lg:rem:mt-[190px] lg:rem:mb-[120px]" />

              <section className="lg:grid lg:grid-cols-2 rem:lg:gap-[40px]">
                <div>
                  <div className={`${subHeadingMargin}`}>
                    <SubHeading>
                      Рецензия на спектакль «1000&nbsp;лет вместе», кинотеатр
                      «Колизей», 2019
                    </SubHeading>
                  </div>

                  <p className="text-blackText text-[1.125rem] not-italic font-normal leading-[1.5] rem:mt-[10px]">
                    Галина Брандт
                  </p>

                  <div className="rem:mt-[40px]">
                    <IndentedParagraph>
                      Здесь все аскетично. Продолговатая, небольшая, почти
                      пустая, со светлыми стенами комната. На одной стене
                      несколько десятков ровных ячеек с разъемом для наушников
                      посередине. Рядом скамья с десятью — по числу
                      зрителей-участников — белыми коробочками, в которых
                      наушники и инструкция к применению. Коробочки и места на
                      скамье участниками спектакля выбираются произвольно, как и
                      ячейки, куда шесть раз предстоит воткнуть свой наушник.
                    </IndentedParagraph>

                    <IndentedParagraph>
                      Организация спектакля выверена посекундно, смена номера
                      прослушиваемой истории, когда снять/надеть наушники, —
                      выполняется по расписанию, отраженному на стене слева от
                      сидящих/стоящих лицом к основной стене с ячейками.
                      Изначальная информация о времени спектакля — 56 минут 27
                      секунд — абсолютно соответствует фактической длительности.
                    </IndentedParagraph>

                    <IndentedParagraph>
                      Этот аскетизм конструкции контрастирует с наполняющей ее
                      отчетливой непричесанностью жизни. Юноши и девушки ходят
                      по улицам, дворам, подъездам и пытаются вступить в контакт
                      с пожилыми людьми. Прекрасная акустика позволяет слышать
                      тяжелые шаги, затрудненное дыхание, свистящие вздохи.
                      Физически ощущаются неловкие паузы: как трудно и тем и
                      другим, как неопытны в этом непростом деле первые и как
                      скованно-боязливы другие. Эти попытки беседы составляют
                      как бы общий для всех компонент спектакля, который все
                      участники без наушников слышат в начале и в паузах между
                      пятью историями, которые у каждого участника свои. Выбор
                      ячейки-истории и конфигурация их построения — дело
                      случая/интуиции/судьбы.
                    </IndentedParagraph>

                    <IndentedParagraph>
                      Главное, конечно, творится там. Содержание этих историй,
                      их эмоциональный строй, степень искренности
                      свидетельствует о том, что контакт все-таки случился. Люди
                      (пусть далеко не все) — заговорили. Кто-то, рассказывая о
                      смерти близких, вдруг выруливал на потрясающую историю о
                      любви. Другой, весело утверждая, что о смерти никогда не
                      думает, главное — пивка попить, проговаривался, что с тех
                      пор, как умерла дочь, многое из того, чем он с
                      удовольствием занимался раньше: рыбалка, грибные/ягодные
                      заготовки, — перестало иметь смысл. Была страшная история
                      про женщину, которая, переехав в пожилом возрасте в другой
                      город, мертвой пролежала в своей квартире тринадцать лет.
                      Или отвратительный разговор (девушки держались очень
                      мужественно!) с пьяным, грубым, убившим, по сути, свою
                      жизнь человеком, «живым трупом». Еще мне попалась запись
                      из пассажирского салона самолета «Уральских авиалиний»,
                      осуществляющего экстренную посадку на кукурузное поле, —
                      случай двухмесячной давности: у кого-то оказался случайно
                      включенным на запись телефон, мертвая тишина была не менее
                      жуткой, чем последовавшие затем крики (все пассажиры в
                      результате выжили). В какой-то из ячеек Нюта Федермессер
                      рассказывала о последних минутах жизни своей мамы…
                    </IndentedParagraph>

                    <IndentedParagraph>
                      На небольшом обсуждении, которое проводится обычно после,
                      кто-то сожалел о том, что подлинных рассказчиков в
                      нескольких историях заменили актерами и это нарушило
                      аутентичность и доверие к подлинности спектакля.
                      Объяснение кураторов, что речь некоторых пожилых людей
                      была очень трудна для восприятия, было понято, хотя
                      чувства сожаления не снимало. Но, к счастью, не снималось
                      также, несмотря на отдельные несовершенства, общее
                      ощущение столкновения, что называется, лицом к лицу с
                      чем-то обычно не проговариваемым не только вслух, но и про
                      себя. Эффект был неожиданным. И дело не только в
                      содержании историй, трогательных, наивных или страшных,
                      дело в трансляции через эти живые голоса с паузами,
                      вздохами, словесными шероховатостями того чувства, что
                      смерть, которая всегда случается только с «другим»,
                      приблизилась. Ты как будто ощутил ее дыхание и, поскольку
                      это спектакль, где эффект отстранения всегда срабатывает,
                      оно не подавляет и не разрушает. Оно провоцирует сдвиг,
                      дает какой-то другой импульс, другую — не
                      суетно-повседневную — точку отсчета, точку видения. Своей
                      жизни, своих отношений к людям, к тому, что действительно
                      важно в ней.
                    </IndentedParagraph>
                  </div>

                  <Image
                    className="rem:my-[90px] mx-auto rem:lg:mb-[200px]"
                    src={logo}
                    alt="Logo"
                  />
                </div>

                <div className="lg:flex lg:justify-end rem:lg:mr-[40px] rem:lg:mt-[36px]">
                  <div className="rem:lg:max-w-[300px]">
                    <AnnotatedImage
                      isHiddenOnMobile
                      image={image8}
                      imageAlt="Галина Брандт"
                      annotation="Театральный критик, член СТД РФ, член жюри фестивалей: «Реальный театр», «Браво» и др., обозреватель «Петербургского театрального журнала». Доктор философских наук, профессор."
                      anotherAnnotation="Галина Брандт"
                    />
                  </div>
                </div>
              </section>

              <hr className="rem:mb-[50px]" />

              <div className="rem:mb-[80px] rem:mt-[10px] lg:rem:mb-[160px]">
                <p className="text-center text-blackText text-[1.125rem] not-italic font-normal leading-[1.5] lg:text-[1.25rem]">
                  Проект в Екатеринбурге реализован при поддержке
                </p>

                <div className="rem:mt-[40px] flex flex-wrap items-center rem:gap-[30px] lg:rem:gap-[100px] justify-center">
                  <Image
                    className="w-[64px] lg:w-[100px]"
                    src={zaartLogo}
                    alt="Logo"
                  />
                  <Image
                    className="w-[64px] lg:w-[100px]"
                    src={ranghisLogo}
                    alt="Logo"
                  />
                  <Image
                    className="w-[64px] lg:w-[100px]"
                    src={bienalleLogo}
                    alt="Logo"
                  />
                  <Image
                    className="w-[64px] lg:w-[100px]"
                    src={grantiLogo}
                    alt="Logo"
                  />
                  <Image
                    className="w-[64px] lg:w-[100px]"
                    src={elcinLogo}
                    alt="Logo"
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
        <LinkHome />
      </Layout>
    </>
  );
}
