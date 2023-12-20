import Footer from "@/components/Footer";
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
      <main>{children}</main>

      {!pagesWithCustomFooter && <Footer />}
    </>
  );
}
