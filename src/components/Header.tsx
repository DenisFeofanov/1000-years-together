import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { useRouter } from "next/router";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  const router = useRouter();
  let heading;
  if (router.pathname === "/tutorial") {
    heading = <NavLink href="/">тысяча лет вместе</NavLink>;
  } else {
    heading = (
      <h2 className="hidden md:block md:text-blackHeading md:text-[1.125rem] md:font-medium md:tracking-[0.36px] md:uppercase">
        {title}
      </h2>
    );
  }

  return (
    <header className="sticky top-0 right-0 left-0 h-[44px] pr-2 flex items-center justify-between xsm:h-[40px] md:h-[48px] md:px-2">
      <Link
        href="/"
        className="flex items-center justify-center h-full py-2 px-4 md:hidden"
      >
        <Image src="/biennial.svg" width="20" height="20" alt="Biennial logo" />
      </Link>

      <div className="flex items-center justify-between h-4/5 gap-1 md:grow">
        <NavLink href="/about">О проекте</NavLink>

        {heading}

        <NavLink href="/tutorial">Инструкция</NavLink>
      </div>
    </header>
  );
}
