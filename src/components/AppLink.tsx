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
      className={`border-black border p-2 m-4 ${disabledStyles}`}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default AppLink;
