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
      className={`leading-[normal] h-full py-1 px-2 text-grayDark text-[0.82rem] font-semibold border-2 rounded-full border-transparent uppercase flex gap-2 justify-center items-center xsm:text-[0.875rem] xsm:before:content-["("] xsm:before:font-normal xsm:before:text-[1.33em] xsm:after:content-[")"] xsm:after:font-normal xsm:after:text-[1.33em] md:text-[1.125rem] md:before:text-[1.5rem] md:after:text-[1.5rem] ${visitedStyles} fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full xsm:active:before:opacity-0 xsm:active:after:opacity-0 ${disabledStyles}`}
      style={
        {
          "--font-size": fontSize,
        } as React.CSSProperties
      }
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
