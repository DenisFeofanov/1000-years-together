import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  children: React.ReactNode;
  disable?: boolean;
  className?: string;
  fontSize?: string;
}

function AppLink({
  href,
  children,
  disable = false,
  className,
  fontSize = "1rem",
  ...rest
}: Props) {
  const router = useRouter();

  const isVisited = router.pathname === href;
  const isDisabled = disable || isVisited;
  const visitedStyles = isVisited && "text-grayReg";
  const disabledStyles =
    isDisabled && "pointer-events-none cursor-default text-grayMiddle";

  return (
    <Link
      className={`text-grayDark text-[length:var(--font-size)] font-semibold uppercase before:content-["("] before:font-normal before:text-[calc(1.33*var(--font-size))] after:content-[")"] after:font-normal after:text-[calc(1.33*var(--font-size))] flex gap-2 justify-center items-center px-2 h-full ${visitedStyles} fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0 ${disabledStyles} ${className}`}
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

export default AppLink;
