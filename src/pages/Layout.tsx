import Footer from "@/components/Footer";
import { ACTS_SLUG, CHOOSE_STORIES, STORIES } from "@/shared/SLUGS";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const currPathname = usePathname() || "/";
  const firstSlug = `/${currPathname.split("/")[1]}`;
  const pagesWithCustomFooter =
    firstSlug === CHOOSE_STORIES ||
    firstSlug === ACTS_SLUG ||
    firstSlug === STORIES;

  return (
    <>
      {children}

      {!pagesWithCustomFooter && <Footer />}
    </>
  );
}
