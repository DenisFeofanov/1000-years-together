import Footer from "@/components/Footer";
import { TitleType } from "@/components/Header";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currPathname = usePathname();
  const pagesWithCustomFooter =
    currPathname === "/choose-stories" || currPathname?.split("/")[1] === "act";
  let headerTitle, titleType: TitleType;

  switch (currPathname) {
    // case "/":
    //   headerTitle = "Бессмертие";
    //   titleType = "text";
    //   break;
    case "/about":
    case "/feedback":
    case "/tutorial":
    case "/privacy":
      headerTitle = "тысяча лет вместе";
      titleType = "link";
      break;
    default:
      headerTitle = "тысяча лет вместе";
      titleType = "text";
      break;
  }

  return (
    <>
      <main>{children}</main>

      {!pagesWithCustomFooter && <Footer />}
    </>
  );
}
