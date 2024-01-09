import { useWindowSize } from "@/lib/hooks";
import NavLink from "./NavLink";

interface Props {
  middleBlock: JSX.Element | null;
  isArchiveLinkShown?: boolean;
}

function Navigation({ middleBlock, isArchiveLinkShown }: Props) {
  let [width] = useWindowSize();

  const isDesktop = width >= 768;

  return (
    <nav className="flex items-center justify-between h-4/5 gap-[1.25rem] md:grow">
      <NavLink href="/about">О проекте</NavLink>

      <div
        className={`${
          isArchiveLinkShown ? "flex" : "hidden md:flex"
        } h-full items-center gap-4`}
      >
        {middleBlock && (
          <div className="hidden md:flex h-full items-center">
            {middleBlock}
          </div>
        )}
        {isArchiveLinkShown && <NavLink href="/archive">Архив</NavLink>}
      </div>

      <NavLink href="/tutorial">{isDesktop ? "Инструкция" : "?"}</NavLink>
    </nav>
  );
}

export default Navigation;
