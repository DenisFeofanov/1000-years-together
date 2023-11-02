import Layout from "@/pages/Layout";
import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";

export default function Home() {
  return (
    <Layout>
      <Heading>Main page</Heading>

      <nav className="flex gap-2">
        <AppLink href="/feedback">To feedback page</AppLink>
        <AppLink href="/tutorial">To tutorial page</AppLink>
        <AppLink href="/about">To about page</AppLink>
      </nav>
    </Layout>
  );
}
