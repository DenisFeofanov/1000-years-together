"use client";

import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "../pages/Layout";

function NotFound() {
  return (
    <Layout>
      <main className="grow min-h-[calc(100vh-44px)] md:min-h-[calc(100vh-41px)] flex flex-col items-center justify-center p-8 text-center">
        <Heading>
          Ошибка 404.
          <br />
          Чего искал тут нет,
          <br />
          или даже не было.
        </Heading>

        <div className="mt-[42px]">
          <AppLink href={"/"}>На главную</AppLink>
        </div>
      </main>
    </Layout>
  );
}
export default NotFound;
