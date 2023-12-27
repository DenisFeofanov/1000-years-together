import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface textSizes {
  normal: string;
  small: string;
  medium: string;
}

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
  size?: keyof textSizes;
}

function AppLink({
  href,
  children,
  disable = false,
  size = "normal",
  ...rest
}: Props) {
  const textSizeVariants: textSizes = {
    small: "text-[0.75rem] md:text-[1rem]",
    medium: "text-[1rem] md:text-[1.125rem]",
    normal: "text-[1.125rem]",
  };

  const isVisited = usePathname() === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <Link
      className={`inline-flex transition-all after:transition-all before:transition-all before:translate-x-[-3px] after:translate-x-[3px] leading-[normal] py-1 text-grayDark ${textSizeVariants[size]} font-semibold border-2 rounded-full border-transparent uppercase inline-flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] ${visitedStyles} fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0 ${disabledStyles}`}
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

export default AppLink;
