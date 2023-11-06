import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children: React.ReactNode;
}

function AppLink({ href, children, ...rest }: Props) {
  return (
    <Link className="border-black border p-2 m-4" href={href} {...rest}>
      {children}
    </Link>
  );
}

export default AppLink;
