import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import ClientOnly from "./ClientOnly";
import Navigation from "./Navigation";

export type TitleType = "text" | "link";

interface Props {
  title?: string;
  titleType?: TitleType;
}

export default function Header({ title, titleType = "link" }: Props) {
  let heading;
  if (title && titleType) {
    switch (titleType) {
      case "link":
        heading = <NavLink href={"/"}>{title}</NavLink>;
        break;
      case "text":
        heading = (
          <h2 className="md:text-blackHeading md:text-[1.125rem] md:font-medium md:tracking-[0.36px] md:uppercase">
            {title}
          </h2>
        );
        break;
      default:
        heading = null;
        break;
    }
  } else heading = null;

  return (
    <header className="sticky top-0 right-0 left-0 pr-2 flex items-center justify-between h-[44px] xsm:h-[40px] sm:h-[44px] md:h-[41px] md:px-2 z-10">
      <Link
        href="/"
        className="flex items-center justify-center h-full py-2 px-4 md:hidden"
      >
        <Image src="/biennial.svg" width="20" height="20" alt="Biennial logo" />
      </Link>

      <ClientOnly>
        <Navigation middleBlock={heading} />
      </ClientOnly>
    </header>
  );
}
