import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children: React.ReactNode;
  isDisabled?: boolean;
}

function AppLink({ href, children, isDisabled = false, ...rest }: Props) {
  const disabledStyles =
    isDisabled &&
    "pointer-events-none cursor-default text-gray-300 border-gray-300";
  return (
    <Link
      className={`border-black border p-1 m-1 text-center lg:p-2 lg:m-4 ${disabledStyles}`}
      href={href}
      {...rest}
      // keeps focusable for accessibility, keeps prefetch, but prevents going further
      onClick={e => isDisabled && e.preventDefault()}
      aria-disabled={isDisabled}
    >
      {children}
    </Link>
  );
}

export default AppLink;
