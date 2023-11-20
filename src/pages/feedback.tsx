import AppLink from "@/components/AppLink";
import Heading from "@/components/Heading";
import Layout from "@/pages/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  fullName: string;
  email: string;
}

type Status = "idle" | "isLoading" | "succeeded" | "failed";

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
    defaultValues: {
      fullName: "Боба",
      email: "test@gmail.com",
    },
  });
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (data: FormData) => {
    try {
      setStatus("isLoading");

      // imitates delay in 1s and returns successful fakeResponse
      const response: { status: number } = await new Promise(
        (resolve, reject) => {
          setTimeout(() => resolve({ status: 200 }), 1000);
        }
      );

      // actual email sending
      // const { fullName, email } = data;
      // await axios.post("/api/email", {
      //   fullName,
      //   email,
      // });

      setStatus("succeeded");
    } catch (error) {
      setStatus("failed");
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Обратная связь</title>
      </Head>

      <Layout>
        <Heading>Обратная связь</Heading>

        {status === "idle" && (
          <form
            onSubmit={handleSubmit(data => onSubmit(data))}
            className="flex flex-col gap-3 max-w-sm"
          >
            <input
              {...register("fullName", { required: true })}
              className="border p-2"
              type="text"
              placeholder="ФИО"
            />
            {errors.fullName && <p>ФИО обязательно</p>}
            <input
              {...register("email", { required: true })}
              className="border p-2"
              type="text"
              placeholder="Email"
            />
            {errors.email && <p>Введите корректный email</p>}

            <button type="submit">Отправить</button>
          </form>
        )}

        {status === "isLoading" && <p>Отправка...</p>}
        {status === "succeeded" && <p>Успех!</p>}
        {status === "failed" && <p>Что-то пошло не так...</p>}

        <AppLink href="/">На главную</AppLink>
      </Layout>
    </>
  );
}
