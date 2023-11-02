import Layout from "@/pages/Layout";
import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";

export default function About() {
  return (
    <Layout>
      <Heading>About page</Heading>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit cum
        mollitia suscipit ducimus unde eligendi sequi accusantium porro
        explicabo voluptatibus necessitatibus modi facilis magnam, minima, quia
        accusamus eum deserunt numquam.
      </p>

      <AppLink href="/">to main page</AppLink>
    </Layout>
  );
}
