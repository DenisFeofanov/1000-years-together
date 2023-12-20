"use client";

import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "../pages/Layout";
import Header from "@/components/Header";

function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen grid grid-rows-[auto_1fr]">
        <Header title="тысяча лет вместе" titleType="text" />

        <div className="flex flex-col items-center justify-center p-8 text-center">
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
        </div>
      </div>
    </Layout>
  );
}
export default NotFound;
