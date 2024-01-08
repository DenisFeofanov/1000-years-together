import Link from "next/link";
import { forwardRef } from "react";

interface Props extends React.PropsWithChildren {
  onYes: () => void;
}

const AgeGate = forwardRef<HTMLDialogElement, Props>(function AgeGate(
  { onYes, children },
  ref
) {
  return (
    <>
      <dialog
        className="peer bg-transparent backdrop:bg-greenAccent backdrop:blur-[32px] backdrop:rounded-[300px] lg:backdrop:blur-[150px] lg:backdrop:rounded-[900px] max-h-none backdrop:max-h-screen max-w-[35rem]"
        ref={ref}
      >
        <div className="p-[15px] bg-[rgba(255,255,255,0.03)] flex flex-col justify-center items-center">
          <p className="text-black text-center text-[1.125rem] not-italic font-medium leading-[normal] uppercase lg:text-[1.5rem]">
            Материалы нашего сайта не предназначены для лиц моложе 18 лет.
            Пожалуйста, подтвердите свое совершеннолетие.
          </p>

          <div className="mt-[42px] flex gap-[1rem] sm:gap-[32px] lg:gap-[42px]">
            <button
              className={`transition-all after:transition-all before:transition-all before:translate-x-[-3px] after:translate-x-[3px] text-center leading-[normal] py-1 text-grayDark text-[0.7rem] sm:text-[0.9375rem] font-semibold border-2 rounded-full border-transparent uppercase inline-flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0 lg:text-[1.125rem]`}
              type="button"
              onClick={onYes}
            >
              Да, мне есть 18
            </button>

            <Link
              href="https://google.com"
              className={`transition-all after:transition-all before:transition-all before:translate-x-[-3px] after:translate-x-[3px] text-center leading-[normal] py-1 text-grayDark text-[0.7rem] sm:text-[0.9375rem] font-semibold border-2 rounded-full border-transparent uppercase inline-flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0 lg:text-[1.125rem]`}
            >
              Нет, мне нет 18
            </Link>
          </div>
        </div>
      </dialog>
      <div className="peer-open:blur-[2.5px]">{children}</div>
    </>
  );
});

export default AgeGate;
