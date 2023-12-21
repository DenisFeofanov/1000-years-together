import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
}

function ChooseStoriesLink({
  href,
  children,
  disable = false,
  ...rest
}: Props) {
  const isVisited = usePathname() === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <Link
      className={`w-full h-full leading-[normal] py-1 px-2 text-grayDark text-[1.25rem] xsm:text-[1.5rem] font-semibold border-2 border-transparent uppercase flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] ${visitedStyles} max-md:fine-pointer:hover:bg-grayDark max-md:fine-pointer:hover:text-white max-md:fine-pointer:hover:border-2 max-md:fine-pointer:hover:border-grayDark max-md:active:bg-grayDark max-md:active:text-white max-md:active:border-2 max-md:active:border-grayDark md:text-[1rem] ${disabledStyles}`}
      href={href}
      // onClick check keeps link focusable for accessibility, keeps prefetch, but prevents going further
      onClick={e => isDisabled && e.preventDefault()}
      aria-disabled={isDisabled}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default ChooseStoriesLink;
