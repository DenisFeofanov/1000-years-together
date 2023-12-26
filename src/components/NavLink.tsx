import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
  fontSize?: string;
}

function NavLink({
  href,
  children,
  disable = false,
  fontSize = "1rem",
  ...rest
}: Props) {
  const isVisited = usePathname() === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <Link
      className={`relative group inline-flex leading-[normal] h-full py-1 transition-all  text-grayDark text-[0.82rem] font-semibold border-2 rounded-full border-transparent uppercase gap-2 justify-center items-center xsm:text-[0.875rem] xsm:before:content-["("] xsm:before:font-normal xsm:before:text-[1.33em] xsm:after:content-[")"] xsm:after:font-normal xsm:after:text-[1.33em] md:text-[1.125rem] ${visitedStyles} fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full  active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full xsm:active:before:opacity-0 xsm:active:after:opacity-0 ${disabledStyles} after:relative after:right-0 hover:after:right-[-3px] before:transition-all after:transition-all hover:before:translate-x-[-3px] hover:after:opacity-0 hover:before:opacity-0`}
      href={href}
      // onClick check keeps link focusable for accessibility, keeps prefetch, but prevents going further
      onClick={e => isDisabled && e.preventDefault()}
      aria-disabled={isDisabled}
      {...rest}
    >
      {/* <span className="transition-all absolute top-[50%] -translate-y-1/2 left-[-3px] group-hover:opacity-0 text-[1.33em] font-normal leading-[normal] text-grayDark">
        (
      </span> */}
      {children}
      {/* <span className="transition-all absolute  top-[50%] -translate-y-1/2 right-[-3px] group-hover:opacity-0 text-[1.33em] font-normal leading-[normal] text-grayDark">
        )
      </span> */}
    </Link>
  );
}

export default NavLink;
