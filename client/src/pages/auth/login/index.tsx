import Button from "@/app/components/ui/Button";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import api from "@/app/api/axiosInstance";
import userData from "@/mobX/store/userActions";
import Spinner from "@/app/components/features/Spinner";
import clsx from "clsx";

const Login = () => {
  const router = useRouter();
  const storeDataToLocalStorage = userData.storeDataToLocalStorage;
  const { handleSubmit, control, formState  } = useForm();
  const { errors } = formState;


  const [isLoader, setIsLoader] = useState<Boolean>(false);

  const onSubmit = (data: any) => {
    setIsLoader(true);
    api
      .post("auth/login", data)
      .then((response) => {
        console.log("Ответ от сервера:", response.data);
        storeDataToLocalStorage("refresh_token", response.data.refresh_token);
        storeDataToLocalStorage("access_token", response.data.access_token);
        storeDataToLocalStorage("username", response.data.username);
      })
      .then(() => {
        router.push("/");
        setIsLoader(false)
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
            {errors.username ? (<p className="text-red-500">Имя пользователя обязательно</p>) : (<p>Имя пользователя</p>)}
            
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  className={clsx("border", errors.username ? 'border-red-400' : 'border-gray-300')}
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
                  className={clsx("border", errors.password ? 'border-red-400' : 'border-gray-300')}
                  type="text"
                />
              )}
            />
          </label>
          {isLoader ? (
            <Spinner className='mt-2'/>
          ) : (
            <button
            className="border-1 border-gray-300 rounded-sm mt-2 hover:bg-moccasin hover:border-transparent active:bg-yellow-200 active:text-white w-24"
            type="submit"
          >
            Отправить
          </button>
          )}
        </form>
        <div className="flex gap-1 items-center">
          <h3>Ещё нет аккаунта?</h3>
            <Button
              className="hover:bg-transparent py-0 px-0 opacity-40"
              text="Зарегестрироваться"
              clickAction={() => {
                router.push("/auth/registration");
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default Login;
