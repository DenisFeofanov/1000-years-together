import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
}

function NavLink({ href, children, disable = false, ...rest }: Props) {
  const isVisited = usePathname() === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <Link
      className={`leading-[normal] h-full py-1 text-grayDark text-[0.82rem] font-semibold border-2 rounded-full border-transparent uppercase flex gap-1 md:gap-2 justify-center items-center xsm:text-[0.875rem] xsm:before:content-["("] xsm:before:font-normal xsm:before:text-[1.33em] xsm:after:content-[")"] xsm:after:font-normal xsm:after:text-[1.33em] md:text-[1.125rem] ${visitedStyles} fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full xsm:active:before:opacity-0 xsm:active:after:opacity-0 inline-flex transition-all after:transition-all before:transition-all before:translate-x-[-3px] after:translate-x-[3px] ${disabledStyles} `}
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

export default NavLink;
