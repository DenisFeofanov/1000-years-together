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
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (linkRef.current) {
        const PX_FOR_ANIMATION =
          Number.parseInt(
            getComputedStyle(linkRef.current).getPropertyValue(
              "--animated-btn-height"
            )
          ) -
          Number.parseInt(
            getComputedStyle(linkRef.current).getPropertyValue(
              "--animated-btn-height-min"
            )
          );

        const scrollStart =
          window.scrollY -
          (document.body.offsetHeight - window.innerHeight - PX_FOR_ANIMATION);

        const scrollProportion = scrollStart / PX_FOR_ANIMATION;

        linkRef.current.style.setProperty(
          "--animated-btn-scroll",
          scrollProportion > 0 ? String(scrollProportion) : "0"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDisabled = !isSelectingDone;

  return (
    <Link
      className={`${styles.link} ${
        isDisabled && "pointer-events-none cursor-default text-grayMiddle"
      }`}
      href={href}
      // onClick check keeps link focusable for accessibility, keeps prefetch, but prevents going further
      onClick={e => isDisabled && e.preventDefault()}
      aria-disabled={isDisabled}
      ref={linkRef}
      {...rest}
    >
      <div className="hidden md:block md:h-[calc(var(--animated-btn-height)+119px)]"></div>

      <div
        className={`${
          styles.container
        } mt-[80px] h-[300px] border-t border-t-grayDark text-blackText flex justify-center items-center md:px-[12px] md:fixed md:bottom-0 md:left-0 md:right-0 md:grid md:grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr)] ${
          isSelectingDone ? "bg-greenSoft" : "bg-grayNum md:bg-white"
        } fine-pointer:hover:bg-grayDark fine-pointer:hover:text-white active:bg-grayDark active:text-white`}
      >
        <div className="lg:relative self-end">
          <p className="hidden md:block md:uppercase md:text-[1rem] md:not-italic md:font-semibold md:leading-[normal] md:pb-[14px]">
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

        <button
          className={`${
            styles.container__title
          } whitespace-nowrap leading-[normal] py-1 px-2 text-[1.25rem] xsm:text-[1.5rem] font-semibold border-2 border-transparent uppercase flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] max-md:fine-pointer:hover:bg-grayDark max-md:fine-pointer:hover:text-white max-md:fine-pointer:hover:border-2 max-md:fine-pointer:hover:border-grayDark max-md:active:bg-grayDark max-md:active:text-white max-md:active:border-2 max-md:active:border-grayDark md:text-[1rem] ${
            isDisabled && "pointer-events-none cursor-default text-grayMiddle"
          }`}
          type="button"
          disabled={isDisabled}
        >
          Начать спектакль
        </button>
      </div>
    </Link>
  );
}

export default ChooseStoriesLink;
