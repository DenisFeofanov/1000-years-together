import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const isMain = router.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Бессмертие" />
      {children}

      {!isMain && <Footer />}
    </div>
  );
}
