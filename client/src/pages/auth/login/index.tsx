import Button from "@/app/components/ui/Button";
import { useRouter } from "next/router";
import React from "react";
import { useForm, Controller } from 'react-hook-form';

const Login = () => {
    const router = useRouter()
    const { handleSubmit, control } = useForm();
    
    const onSubmit = (data: any) => {
      console.log(data);
    };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-bg p-[2vw] rounded-md mb-40 w-[25vw]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-[1vw]">
          <label className="flex flex-col">
            Имя пользователя
            <input className="border border-gray-300" type="text" />
          </label>
          <label className="flex flex-col">
            Пароль
            <input className="border border-gray-300" type="text" />
          </label>
        </form>
        <Button className="hover:bg-moccasin mb-1" text='Войти' />
        <div className="flex gap-1 items-center">
            <h3>Ещё нет аккаунта?</h3>
            <Button className="hover:bg-transparent py-0 px-0 opacity-40" text='Зарегестрироваться' clickAction={() => {router.push('/auth/registration')}}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
