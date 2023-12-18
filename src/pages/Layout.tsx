import Footer from "@/components/Footer";
import Header, { TitleType } from "@/components/Header";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currPathname = usePathname();
  const pagesWithCustomFooter =
    currPathname === "/choose-stories" || currPathname?.split("/")[1] === "act";
  let headerTitle,
    titleType: TitleType = "link";
  if (currPathname === "/") {
    headerTitle = "Бессмертие";
    titleType = "text";
  } else {
    headerTitle = "тысяча лет вместе";
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header title={headerTitle} titleType={titleType} />
      {children}

      {!pagesWithCustomFooter && <Footer />}
    </div>
  );
}
