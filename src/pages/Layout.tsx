import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currPathname = usePathname();
  const pagesWithCustomFooter = currPathname === "/choose-stories";
  let headerTitle;
  if (currPathname === "/tutorial" || currPathname === "/about") {
    headerTitle = "тысяча лет вместе";
  } else {
    headerTitle = "Бессмертие";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={headerTitle} />
      {children}

      {!pagesWithCustomFooter && <Footer />}
    </div>
  );
}
