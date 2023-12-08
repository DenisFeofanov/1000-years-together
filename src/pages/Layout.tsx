import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavLink from "@/components/NavLink";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const isMain = router.pathname === "/";
  let headerTitle;
  if (router.pathname === "/tutorial" || router.pathname === "/about") {
    headerTitle = "тысяча лет вместе";
  } else {
    headerTitle = "Бессмертие";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={headerTitle} />
      {children}

      {!isMain && <Footer />}
    </div>
  );
}
