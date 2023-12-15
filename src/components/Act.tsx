import BookIcon from "@/Book.svg";
import PlayIcon from "@/Play.svg";
import logo from "@/biennial.svg";
import CrossIcon from "@/crossIcon.svg";
import { Act } from "@/interfaces/Act";
import { Story } from "@/interfaces/Story";
import { getSelectedStoriesFromLocalStorage } from "@/lib/Stories";
import Layout from "@/pages/Layout";
import ProgressBarIcon from "@/progressBar.png";
import { ACTS } from "@/shared/Act";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import ActLink from "./ActLink";
import ActModalSubheading from "./ActModalSubheading";
import ActModalText from "./ActModalText";

type Props = {
  goBackHref: string;
  goNextHref: string;
  act: Act;
};

function Act({
  goBackHref,
  goNextHref,
  act: { title, audioSrc: actAudioSrc },
}: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [nextStory, setNextStory] = useState<Story | null>(null);

  // on component mount load new stories from local storage
  useEffect(() => {
    if (window !== undefined && window.localStorage) {
      const selectedStories = getSelectedStoriesFromLocalStorage();

      const storyIndex = ACTS.findIndex(act => act.title === title);

      // 301 redirect
      if (selectedStories.length < 5) window.location.replace("/");

      setCurrentStory(selectedStories[storyIndex]);
      setNextStory(
        selectedStories[ACTS.findIndex(act => act.title === title) + 1] || null
      );
    }
    // include title to silence error, although it shouldn't change through component's lifecycle
  }, [title]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <main className="grid grid-rows-[1fr_auto] pt-[56px] px-[15px] pb-[30px]">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="whitespace-pre font-mainHeading text-blackText text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase">
                {isIntroFinished ? `история\n` : `интро к истории\n`}
                <span className="text-[4.75rem] font-bold leading-[1] tracking-[-0.76px]">
                  {currentStory?.title}
                </span>
              </h1>

              {nextStory && (
                <div className="text-right">
                  <p className="whitespace-pre font-mainHeading text-blackText text-[0.6875rem] not-italic font-semibold leading-[normal] tracking-[0.22px] uppercase">
                    далее
                  </p>
                  <p className="text-[1.5rem] font-bold leading-[1] tracking-[-0.24px] mt-[8px]">
                    {nextStory.title}
                  </p>
                </div>
              )}
            </div>

            <button
              className="flex items-center mt-[16px] gap-[8px]"
              type="button"
              onClick={() => modalRef.current?.showModal()}
            >
              <div className="w-max rounded-[40px] bg-iconGray p-[8px]">
                <Image src={BookIcon} width="16" height="16" alt="Book icon" />
              </div>
              <p className="text-blackText font-mainHeading text-[0.9375rem] not-italic font-semibold leading-[normal] tracking-[0.3px] uppercase">
                текст
              </p>
            </button>
          </div>

          <div>
            <button className="block mt-[82px] mx-auto" type="button">
              <Image src={PlayIcon} width="144" alt="Play icon" priority />
            </button>

            <p className="mt-[42px] text-blackText text-[1rem] not-italic font-medium leading-[normal] tracking-[0.32px] uppercase">
              04:25 / 05:28
            </p>

            <Image
              className="mt-[8px]"
              src={ProgressBarIcon}
              alt="placeholder for real progressBar"
            />

            <div className="flex flex-wrap justify-center items-center mx-auto gap-[10px] md:gap-[42px] mt-[42px]">
              <ActLink href={""}>продолжить</ActLink>

              {isIntroFinished ? (
                <ActLink href={goNextHref}>следующая</ActLink>
              ) : (
                <button
                  className={`leading-[normal] py-1 px-2 text-grayDark text-[0.9375rem] font-semibold border-2 rounded-full border-transparent uppercase flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0`}
                  type="button"
                  onClick={() => setIsIntroFinished(true)}
                >
                  следующая
                </button>
              )}
            </div>
          </div>

          <dialog
            className="rounded-[24px] bg-white backdrop:bg-[black]/80 w-full max-w-none h-full max-h-none mx-0 mb-0 mt-[59px]"
            ref={modalRef}
            onClick={e =>
              e.target === modalRef.current && modalRef.current?.close()
            }
          >
            <div className="pt-[30px] px-[20px] pb-[160px]">
              <button
                className="block ml-auto p-[8px] rounded-[40px] bg-iconGray"
                type="button"
                onClick={() => modalRef.current?.close()}
              >
                <Image
                  src={CrossIcon}
                  width={18}
                  height={18}
                  alt="close icon"
                />
              </button>

              <h2 className="mt-[5px] text-blackHeading text-center text-[2.625rem] not-italic font-bold leading-[1] tracking-[-1.26px]">{`#${currentStory?.title}`}</h2>

              <div className="mt-[30px]">
                <ActModalText>
                  Величие исторического лица измеряется долговечностью памяти о
                  нем — писал в свое время археограф, историк, журналист и
                  общественный деятель Петр Иванович Бартенев. Детские годы его
                  были связаны с Липецком, где он проживал на Дворянской улице
                  (ныне — улица Ленина). <br /> <br />
                  Происходил он из среднепоместного дворянства. По окончании
                  Благородного пансиона Рязанской гимназии (1847) и Московского
                  университета (1851) он поступил на службу в Московский главный
                  архив Министерства иностранных дел (1853–1858), заведовал
                  Чертковской библиотекой (1859–1873), первой публичной
                  библиотекой в Москве.
                </ActModalText>
              </div>

              <ActModalSubheading>Подзаголовок</ActModalSubheading>
              <div className="mt-[10px]">
                <ActModalText>
                  Главным занятием Бартенева с 1863 года стало редактирование
                  созданного им журнала «Русский архив», которым он руководил
                  фактически до своей кончины. В издании публиковались
                  многочисленные свидетельства о русских государственных и
                  общественных деятелях XVIII–XIX веков с его комментариями,
                  которые до настоящего времени являются незаменимым источником
                  для изучения этой эпохи. <br />
                  <br /> Также Бартеневым были опубликованы важные для
                  отечественной истории документы в изданиях «Осьмнадцатый век»
                  (книги 1–4, 1868–1869), «Девятнадцатый век» (книги 1–2, 1872),
                  «Архив князя Воронцова» (книги 1–40, 1870–1895), «Собрание
                  писем царя Алексея Михайловича» (1856), «Записки Г. Р.
                  Державина» (1860).
                </ActModalText>
              </div>

              <ActModalSubheading>Подзаголовок</ActModalSubheading>
              <div className="mt-[10px]">
                <ActModalText>
                  Кроме того, важнейшим делом его жизни стал сбор материалов о
                  биографии и произведениях Александра Пушкина. Именно он
                  заложил основы пушкиноведения в России. Его титанический труд
                  в этом отношении, стремление собрать сведения о великом поэте
                  у многих современников, тогда еще здравствовавших и лично
                  знавших Пушкина, ряд статей о нем и его жизни заслужили
                  уважение многих русских людей. <br />
                  <br /> По своим взглядам Петр Бартенев был близок к
                  славянофилам, а к началу XX века они эволюционировали в
                  сторону консерватизма; в сущности, он не принял «великих
                  реформ» и последующей демократизации российского общества,
                  революции 1905–1907 годов, оставшись до конца дней
                  монархистом, идеалом для которого была Россия первого
                  тридцатилетия XIX века.
                </ActModalText>
              </div>

              <Image
                className="block mx-auto mt-[52px]"
                src={logo}
                width="24"
                alt="biennial logo"
              />
            </div>
          </dialog>
        </main>

        {/* <AppLink href={goBackHref}>Назад</AppLink>
        <Heading>{title}</Heading>*/}

        {/* audio API only works correctly on client, so I render player component only on client */}
        {/* <ClientOnly>
          <AudioPlayer audioSrc={actAudioSrc} />
        </ClientOnly>
        {currentStory && (
          <>
            <Heading>История #{currentStory.title}</Heading>
  
            <ClientOnly>
              <AudioPlayer audioSrc={currentStory.audioSrc} />
            </ClientOnly>
          </>
        )}
        <br />
        <AppLink href={goNextHref}>Далее</AppLink>  */}

        <style jsx>{`
          :global(.rhap_controls-section) {
            flex-grow: 0;
          }

          :global(.rhap_time) {
            user-select: auto;
          }

          :global(.rhap_progress-section) {
            gap: 0.5rem;
          }
        `}</style>
      </Layout>
    </>
  );
}

export default Act;
