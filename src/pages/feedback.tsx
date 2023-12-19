import AppLink from "@/components/AppLink";
import InfoMessage from "@/components/InfoMessage";
import FeedbackInput from "@/components/FeedbackInput";
import { FormData } from "@/interfaces/Form";
import Layout from "@/pages/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Status = "idle" | "isLoading" | "succeeded" | "failed";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    feedback: yup.string().required(),
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
      feedback: "Круто!",
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

  const isSucceeded = status === "succeeded";

  return (
    <>
      <Head>
        <title>Обратная связь</title>
      </Head>

      <Layout>
        <main
          className={`pt-[37px] px-[15px] pb-[120px] min-h-screen ${
            status !== "idle" && "flex flex-col justify-center items-center"
          }`}
        >
          {status === "idle" && (
            <>
              <p className="text-grayDark text-center text-[1.125rem] not-italic font-normal leading-[1.5]">
                Если хотите оставить отзыв, заполните форму:{" "}
              </p>
              <form
                onSubmit={handleSubmit(data => onSubmit(data))}
                className="mt-[62px] flex flex-col gap-[24px] "
              >
                <FeedbackInput
                  required
                  type="text"
                  placeholder="Ваше имя"
                  label="fullName"
                  register={register}
                />

                <FeedbackInput
                  required
                  type="email"
                  placeholder="Email"
                  label="email"
                  register={register}
                />

                <FeedbackInput
                  register={register}
                  label="feedback"
                  required
                  type="text"
                  placeholder="Текст отзыва"
                />

                <button
                  className={`mx-auto mt-[42px] leading-[normal] py-1 px-2 text-grayDark text-[1.125rem] font-semibold border-2 rounded-full border-transparent uppercase inline-flex gap-2 justify-center items-center before:content-["("] before:font-normal before:text-[1.33em] after:content-[")"] after:font-normal after:text-[1.33em] fine-pointer:hover:border-2 fine-pointer:hover:border-grayDark fine-pointer:hover:rounded-full fine-pointer:hover:before:opacity-0 fine-pointer:hover:after:opacity-0 active:bg-grayDark active:text-white active:border-2 active:border-grayDark active:rounded-full active:before:opacity-0 active:after:opacity-0 lg:text-[1.125rem]`}
                  type="submit"
                >
                  Отправить
                </button>

                <p className="mt-[62px] text-grayDark text-center text-[0.8125rem] not-italic font-normal leading-[1.5]">
                  Нажимая кнопку отправить вы соглашаетесь на <br />
                  <Link href={"/privacy"}>
                    <span className="text-greenAccent">
                      обработку персональных данных
                    </span>{" "}
                  </Link>
                </p>
              </form>
            </>
          )}

          {status === "isLoading" && <InfoMessage>Отправка...</InfoMessage>}
          {isSucceeded && (
            <>
              <InfoMessage>Спасибо за отзыв!</InfoMessage>

              <div className="mt-[56px]">
                <AppLink href={"/choose-stories"}>Выбрать истории</AppLink>
              </div>
            </>
          )}
          {status === "failed" && (
            <InfoMessage>Что-то пошло не так...</InfoMessage>
          )}
        </main>
      </Layout>
    </>
  );
}
