import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currPathname = usePathname();
  const pagesWithCustomFooter =
    currPathname === "/choose-stories" || currPathname?.split("/")[1] === "act";
  let headerTitle;
  if (currPathname === "/") {
    headerTitle = "Бессмертие";
  } else {
    headerTitle = "тысяча лет вместе";
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header title={headerTitle} />
      {children}

      {!pagesWithCustomFooter && <Footer />}
    </div>
  );
}
