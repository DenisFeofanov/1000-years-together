import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "@/pages/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  fullName: string;
  email: string;
}

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export default function Feedback() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Обратная связь</title>
      </Head>

      <Layout>
        <Heading>Обратная связь</Heading>

        <form
          onSubmit={handleSubmit(data => onSubmit(data))}
          className="flex flex-col gap-3 max-w-sm"
        >
          <input
            {...register("fullName", { required: true })}
            className="border"
            type="text"
          />
          {errors.fullName && <p>ФИО обязательно</p>}
          <input
            {...register("email", { required: true })}
            className="border"
            type="text"
          />
          {errors.email && <p>Введите корректный email</p>}

          <button type="submit">Отправить</button>
        </form>

        <AppLink href="/">На главную</AppLink>
      </Layout>
    </>
  );
}
