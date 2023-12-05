import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
}

function AppLink({ href, children, disable = false, ...rest }: Props) {
  const router = useRouter();

  const isVisited = router.pathname === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";
  return (
    <Link
      className={`w-[184px] h-[54px] uppercase text-grayDark text-[1.125rem] font-semibold flex gap-2 justify-center items-center border-0 border-grayDark rounded-full [&:not(:hover)]:before:content-["("] before:font-normal before:text-[1.5rem] [&:not(:hover)]:after:content-[")"] after:font-normal after:text-[1.5rem] ${visitedStyles} fine-pointer:hover:border-2 active:border-2 active:bg-grayDark active:text-white ${disabledStyles}`}
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
