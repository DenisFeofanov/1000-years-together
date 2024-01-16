import logo from "@/biennial.svg";
import CrossIcon from "@/crossIcon.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ActModalSubheading from "../ActModalSubheading";
import ActModalText from "../ActModalText";

interface Props extends React.PropsWithChildren {
  title: string | undefined;
  isOpen: boolean;
  closeModal: () => void;
  text: string;
}

function Modal({ children, title, isOpen, closeModal, text }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog
        className="peer backdrop:bg-[black]/80 bg-transparent w-full max-w-none h-full max-h-none mx-0 my-0 lg:max-w-[38rem] lg:mx-auto hide-scrollbar"
        ref={modalRef}
        onClick={e => e.target === modalRef.current && closeModal()}
      >
        <div className="rounded-[24px] bg-white pt-[30px] px-[20px] pb-[160px] mt-[59px] lg:pb-[42px] lg:mb-[56px]">
          <button
            className="block ml-auto p-[8px] rounded-[40px] bg-iconGray"
            type="button"
            onClick={closeModal}
          >
            <Image src={CrossIcon} width={18} height={18} alt="close icon" />
          </button>

          {title && (
            <h2 className="mt-[5px] text-blackHeading text-center text-[2.625rem] not-italic font-bold leading-[1] tracking-[-1.26px] lg:text-[1.875rem] lg:tracking-[-0.3]">
              {`#${title}`}
            </h2>
          )}

          <p>{text}</p>

          {/* <div className="mt-[30px]">
            <ActModalText>
              Величие исторического лица измеряется долговечностью памяти о нем
              — писал в свое время археограф, историк, журналист и общественный
              деятель Петр Иванович Бартенев. Детские годы его были связаны с
              Липецком, где он проживал на Дворянской улице (ныне — улица
              Ленина). <br /> <br />
              Происходил он из среднепоместного дворянства. По окончании
              Благородного пансиона Рязанской гимназии (1847) и Московского
              университета (1851) он поступил на службу в Московский главный
              архив Министерства иностранных дел (1853–1858), заведовал
              Чертковской библиотекой (1859–1873), первой публичной библиотекой
              в Москве.
            </ActModalText>
          </div>

          <ActModalSubheading>Подзаголовок</ActModalSubheading>
          <div className="mt-[10px]">
            <ActModalText>
              Главным занятием Бартенева с 1863 года стало редактирование
              созданного им журнала «Русский архив», которым он руководил
              фактически до своей кончины. В издании публиковались
              многочисленные свидетельства о русских государственных и
              общественных деятелях XVIII–XIX веков с его комментариями, которые
              до настоящего времени являются незаменимым источником для изучения
              этой эпохи. <br />
              <br /> Также Бартеневым были опубликованы важные для отечественной
              истории документы в изданиях «Осьмнадцатый век» (книги 1–4,
              1868–1869), «Девятнадцатый век» (книги 1–2, 1872), «Архив князя
              Воронцова» (книги 1–40, 1870–1895), «Собрание писем царя Алексея
              Михайловича» (1856), «Записки Г. Р. Державина» (1860).
            </ActModalText>
          </div>

          <ActModalSubheading>Подзаголовок</ActModalSubheading>
          <div className="mt-[10px]">
            <ActModalText>
              Кроме того, важнейшим делом его жизни стал сбор материалов о
              биографии и произведениях Александра Пушкина. Именно он заложил
              основы пушкиноведения в России. Его титанический труд в этом
              отношении, стремление собрать сведения о великом поэте у многих
              современников, тогда еще здравствовавших и лично знавших Пушкина,
              ряд статей о нем и его жизни заслужили уважение многих русских
              людей. <br />
              <br /> По своим взглядам Петр Бартенев был близок к славянофилам,
              а к началу XX века они эволюционировали в сторону консерватизма; в
              сущности, он не принял «великих реформ» и последующей
              демократизации российского общества, революции 1905–1907 годов,
              оставшись до конца дней монархистом, идеалом для которого была
              Россия первого тридцатилетия XIX века.
            </ActModalText>
          </div> */}

          <Image
            className="block mx-auto mt-[52px] lg:mt-[20px]"
            src={logo}
            width="24"
            alt="biennial logo"
          />
        </div>
      </dialog>
      <div className="peer-open:lg:blur-[21px]">{children}</div>
    </>
  );
}

export default Modal;
