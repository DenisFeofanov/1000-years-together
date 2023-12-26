import Footer from "@/components/Footer";
import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currPathname = usePathname();
  const pagesWithCustomFooter =
    currPathname === "/choose-stories" || currPathname?.split("/")[1] === "act";

  return (
    <>
      <div className="p-4 text-center">
        <NavLink href="/archive">Архив</NavLink>
      </div>
      {/* <main>{children}</main>

      {!pagesWithCustomFooter && <Footer />} */}
    </>
  );
}
