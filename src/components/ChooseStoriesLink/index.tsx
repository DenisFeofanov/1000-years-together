import Link, { LinkProps } from "next/link";
import { useEffect, useRef } from "react";
import styles from "./index.module.css";

interface Props extends LinkProps {
  isSelectingDone: boolean;
  selectedStoriesText: string;
  amountOfSelectedStories: number;
  storiesTooltip: string | undefined;
}

function ChooseStoriesLink({
  href,
  isSelectingDone,
  selectedStoriesText,
  amountOfSelectedStories,
  storiesTooltip,
  ...rest
}: Props) {
  const linkRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (linkRef.current) {
        const buttonHeight = linkRef.current.offsetHeight;

        const scrollStart =
          window.scrollY -
          (document.body.offsetHeight - window.innerHeight - buttonHeight);

        const scrollProportion = scrollStart / buttonHeight;

        document.body.style.setProperty(
          "--animated-btn-scroll",
          scrollProportion > 0 ? String(scrollProportion) : "0"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDisabled = !isSelectingDone;
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <>
      <div className="hidden md:block md:h-[calc(var(--animated-btn-height)+119px)]"></div>
      <div
        className={`mt-[80px] h-[300px] border-t border-t-grayDark flex justify-center items-center md:h-[var(--animated-btn-height)] md:px-[12px] md:py-[7px] md:mt-[0] md:fixed md:bottom-0 md:left-0 md:right-0 md:grid md:grid-cols-3 ${
          isSelectingDone ? "bg-greenSoft" : "bg-grayNum md:bg-white"
        }`}
        ref={linkRef}
      >
        <div className="lg:relative">
          <p className="hidden md:block md:uppercase md:text-blackText md:text-[1rem] md:not-italic md:font-semibold md:leading-[normal]">
            {selectedStoriesText}
          </p>

          <p
            className={`hidden ${
              isSelectingDone || amountOfSelectedStories === 0
                ? "lg:hidden"
                : "lg:block"
            } lg:whitespace-pre lg:absolute lg:bottom-[calc(100%+12px)] lg:left-[43px] lg:px-[10px] lg:pt-[7px] lg:pb-[11px] lg:bg-grayDark lg:rounded-[6px] lg:text-white lg:text-[0.8125rem] lg:not-italic lg:font-medium lg:leading-[1.2] lg:tracking-[-0.13px] lg:before:content-[url(../../public/storiesTooltipArrow.svg)] lg:before:absolute lg:before:left-[9px] lg:before:bottom-[-8px] lg:before:h-[13px]`}
          >
            {storiesTooltip}
          </p>
        </div>

        <Link
          className={`w-full h-full leading-[normal] py-1 px-2 text-grayDark text-[1.25rem] xsm:text-[1.5rem] font-semibold border-2 border-transparent uppercase flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] max-md:fine-pointer:hover:bg-grayDark max-md:fine-pointer:hover:text-white max-md:fine-pointer:hover:border-2 max-md:fine-pointer:hover:border-grayDark max-md:active:bg-grayDark max-md:active:text-white max-md:active:border-2 max-md:active:border-grayDark md:text-[1rem] ${disabledStyles}`}
          href={href}
          // onClick check keeps link focusable for accessibility, keeps prefetch, but prevents going further
          onClick={e => isDisabled && e.preventDefault()}
          aria-disabled={isDisabled}
          {...rest}
        >
          Начать спектакль
        </Link>
      </div>
    </>
  );
}

export default ChooseStoriesLink;
