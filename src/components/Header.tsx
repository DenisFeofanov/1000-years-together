import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { useWindowSize } from "@/lib/hooks";

export type TitleType = "text" | "link";

interface Props {
  title?: string;
  titleType?: TitleType;
}

export default function Header({ title, titleType = "link" }: Props) {
  let [width] = useWindowSize();
  let middleBlock;
  switch (titleType) {
    case "link":
      middleBlock = <NavLink href={"/"}>{title}</NavLink>;
      break;
    case "text":
      middleBlock = (
        <h2 className="md:text-blackHeading md:text-[1.125rem] md:font-medium md:tracking-[0.36px] md:uppercase">
          {title}
        </h2>
      );
      break;
    default:
      break;
  }

  const isDesktop = width > 768;
  return (
    <header className="sticky top-0 right-0 left-0 pr-2 flex items-center justify-between h-[44px] xsm:h-[40px] sm:h-[44px] md:h-[41px] md:px-2 z-10">
      <Link
        href="/"
        className="flex items-center justify-center h-full py-2 px-4 md:hidden"
      >
        <Image src="/biennial.svg" width="20" height="20" alt="Biennial logo" />
      </Link>

      <div className="flex items-center justify-between h-4/5 gap-1 md:grow">
        <NavLink href="/about">О проекте</NavLink>

        <div className="flex h-full items-center gap-4">
          {title && (
            <div className="hidden md:flex h-full items-center">
              {middleBlock}
            </div>
          )}
          <NavLink href="/archive">Архив</NavLink>
        </div>

        <NavLink href="/tutorial">{isDesktop ? "Инструкция" : "?"}</NavLink>
      </div>
    </header>
  );
}
