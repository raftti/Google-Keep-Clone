import React, { FC } from "react";
import Button from "./ui/Button";
import userData from "@/mobX/store/userActions";

interface INote {
  title?: string;
  text?: string;
  _id: string
}

const Note: FC<INote> = ({ title, text, _id}) => {
  

  console.log('id ', _id);
  const handlerButtonClick = (id = _id) => {
    console.log('id ', _id);
    
  userData.deleteUserCost(id, localStorage.getItem('access_token') as string)
};

  return (
    <>
      <div className="p-3 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <h3>{title}</h3>
          <h3>{text}</h3>
        </div>
        <div className="flex justify-between ">
          <Button icon="/images/trash.png" size={14} className=" active:" clickAction={handlerButtonClick} />
        </div>
      </div>
    </>
  );
};

export default Note;
