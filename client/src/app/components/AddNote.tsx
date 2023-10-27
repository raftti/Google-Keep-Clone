import appActions from "@/mobX/store/appActions";
import clsx from "clsx";
import { observer } from "mobx-react";
import React, { ChangeEvent, FC, useState } from "react";
import Button from "./ui/Button";

interface IAddNote {
  clickAction?: () => void;
  className?: string;
}

const AddNote: FC<IAddNote> = observer(({ className }) => {
  const isNoteAdding = appActions.isNoteAdding;

  const [noteText, setNoteText] = useState('')
  const [noteTitleText, setNoteTitleText] = useState('')
  const handlerNoteTitleTextTyping = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteTitleText(event.target.value);
}
  const handlerNoteTextTyping = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value)
  }

  const setIsNoteAddingToTrue = () => {
    appActions.setIsNoteAddingToTrue();
  };
  const setIsNoteAddingToFalse = () => {
    appActions.setIsNoteAddingToFalse();
    setNoteText('')
    setNoteTitleText('')
  };

  return (
    <div
      className={clsx(
        " pb-1 pr-1 my-[2.4vw] flex flex-col rounded-md shadow-for-addInputCpnt",
        appActions.isMenuOpen
          ? "ml-[17.5vw] mr-[29.5vw]"
          : "ml-[19.5vw] mr-[35.5vw]",
        className != null ? className : ""
      )}
    >
      <form action="">
        {isNoteAdding && (
          <input
            value={noteTitleText}
            className="py-2 px-4 bg-white focus:outline-none w-[30vw] rounded-md"
            type="text"
            placeholder="Введите заголовок"
            onChange={(e) => {handlerNoteTitleTextTyping(e)}}
          />
        )}
        <input
          value={noteText}
          className="py-2 px-4 bg-white focus:outline-none w-[30vw] rounded-md"
          type="text"
          placeholder="Заметка..."
          onFocus={setIsNoteAddingToTrue}
          onChange={(e) => {handlerNoteTextTyping(e)}}
        />
        {isNoteAdding && (
          <div className="flex justify-between">
            <div></div>
            <Button text={noteTitleText || noteText ? 'Добавить' : "Закрыть"} clickAction={setIsNoteAddingToFalse} />
          </div>
        )}
      </form>
    </div>
  );
});

export default AddNote;
