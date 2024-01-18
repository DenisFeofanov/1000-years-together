import logo from "@/biennial.svg";
import CrossIcon from "@/crossIcon.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ModalText from "../ModalText";

interface Props extends React.PropsWithChildren {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  htmlText: string;
}

function Modal({ children, title, isOpen, closeModal, htmlText }: Props) {
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

          <ModalText htmlText={htmlText} />

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
