import React from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/app/components/ui/Button";
import router from "next/router";
import api from "@/app/api/axiosInstance";

const Registration = () => {
  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data: any) => {
    api
      .post("http://localhost:4200/auth/registration", data)
      .then((response) => {
        console.log("Ответ от сервера:", response.data);
        router.push("/");
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-bg p-[2vw] rounded-md mb-40 w-[25vw]">
        <h1 className="text-xl">Регестрация</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pb-[1vw] pt-[.5vw]"
        >
          <label className="flex flex-col">
            {errors.username ? (
              <p className="text-red-500">Имя пользователя обязательно</p>
            ) : (
              <p>Имя пользователя</p>
            )}
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300"
                  type="text"
                />
              )}
            />
          </label>
          <label className="flex flex-col">
          {errors.password ? (<p className="text-red-500">Пароль обязателен</p>) : (<p>Пароль</p>)}

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300"
                  type="text"
                />
              )}
            />
          </label>
          <button
            className="border-1 border-gray-300 rounded-sm mt-2 hover:bg-moccasin hover:border-transparent active:bg-yellow-200 active:text-white w-24"
            type="submit"
          >
            Отправить
          </button>
        </form>
        <div className="flex gap-1 items-center">
          <h3>Ещё нет аккаунта?</h3>
          <Button
            className="hover:bg-transparent py-0 px-0 opacity-40"
            text="Войти"
            clickAction={() => {
              router.push("/auth/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
