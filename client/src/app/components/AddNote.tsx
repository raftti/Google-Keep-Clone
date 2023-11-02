import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { observer } from "mobx-react";
import React, { FC } from "react";
import clsx from "clsx";
import appActions from "@/mobX/store/appActions";
import api from "@/app/api/axiosInstance";
import { IForm } from "../types/types";
import Button from "./ui/Button";

interface IAddNote {
  updateNotesContainer?: () => void;
  className?: string;
}

const AddNote: FC<IAddNote> = observer(({ className, updateNotesContainer }) => {
  const isNoteAdding = appActions.isNoteAdding;
  const { handleSubmit, control, reset, watch } = useForm()
  const titleInputMessage = watch("title")
  const textInputMessage = watch("text")

  //@ts-ignore
  const mutation = useMutation((data: IForm) => postFormData(data), {
    onSuccess: () => {
      if (updateNotesContainer) {
        updateNotesContainer()
      }
    },
  })

  const setIsNoteAddingToTrue = () => {
    appActions.setIsNoteAddingToTrue()
  }
  const submit = () => {
    handleSubmit(onSubmit)()
    appActions.setIsNoteAddingToFalse()
  }

  function postFormData(data: IForm) {
    api.post("todos", data, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        if (updateNotesContainer) { updateNotesContainer() }
        console.log("Ответ от сервера:", response.data);
      })
      .catch((error) => { console.error("Ошибка:", error) });
  }

  const onSubmit =async (data: any) => {
  await  mutation.mutate(data)
   await   reset({
        title: "",
        text: "",
      });
  };

  return (
    <div
      className={clsx(
        " pb-1 pr-1 mt-[2.4vw] flex flex-col rounded-md shadow-for-addInputCpnt",
        appActions.isMenuOpen
          ? "ml-[17.5vw] mr-[29.5vw]"
          : "ml-[19.5vw] mr-[35.5vw]",
        className != null ? className : ""
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {isNoteAdding && (
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="py-2 px-4 bg-white focus:outline-none w-[30vw] rounded-md"
                type="text"
                placeholder="Введите заголовок"
              />
            )}
          />
        )}
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="py-2 px-4 bg-white focus:outline-none w-[30vw] rounded-md"
              type="text"
              placeholder="Заметка..."
              onFocus={setIsNoteAddingToTrue}
            />
          )}
        />
        {isNoteAdding && (
          <div className="flex justify-between">
            <div></div>
            {titleInputMessage || textInputMessage ? (
              <Button text={"Добавить"} clickAction={submit} />
            ) : (
              <Button
                text={"Закрыть"}
                clickAction={() => appActions.setIsNoteAddingToFalse()}
              />
            )}
          </div>
        )}
      </form>
    </div>
  );
});

export default AddNote;
