import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
}

function StickyAppLink({ href, children, disable = false, ...rest }: Props) {
  const router = useRouter();

  const isVisited = router.pathname === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <Link
      className={`w-full h-full bg-white border-t border-t-grayDark leading-[normal] text-grayDark text-[1rem] font-semibold uppercase flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] ${visitedStyles} active:bg-grayDark active:text-white active:before:opacity-0 active:after:opacity-0 ${disabledStyles}`}
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

export default StickyAppLink;
