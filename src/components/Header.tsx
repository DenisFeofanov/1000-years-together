import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

interface Props {
  title: string | React.ReactNode;
}

export default function Header({ title }: Props) {
  let middleBlock;
  if (typeof title === "string") {
    middleBlock = (
      <h2 className="md:text-blackHeading md:text-[1.125rem] md:font-medium md:tracking-[0.36px] md:uppercase">
        {title}
      </h2>
    );
  } else {
    middleBlock = title;
  }

  return (
    <header className="sticky top-0 right-0 left-0 h-[44px] pr-2 flex items-center justify-between xsm:h-[40px] sm:h-[44px] md:h-[48px] md:px-2">
      <Link
        href="/"
        className="flex items-center justify-center h-full py-2 px-4 md:hidden"
      >
        <Image src="/biennial.svg" width="20" height="20" alt="Biennial logo" />
      </Link>

      <div className="flex items-center justify-between h-4/5 gap-1 md:grow">
        <NavLink href="/about">О проекте</NavLink>

        <div className="hidden md:block">{middleBlock}</div>

        <NavLink href="/tutorial">Инструкция</NavLink>
      </div>
    </header>
  );
}
