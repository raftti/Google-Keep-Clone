import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Note from "./Note";

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const [data, setData] = useState({});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //сделать строку пригодной для исползования JSON.parse
  const replacedQuotes = props.id.replace(/['"]/g, (match: string) =>
    match === "'" ? '"' : "'"
  );

  useEffect(() => {
    try {
      setData(JSON.parse(replacedQuotes));
      console.log(replacedQuotes);
      
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [props.id]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="m-3 active:z-50 bg-white flex flex-col justify-between border-1 rounded-md hover:shadow-for-note min-w-[170px] active:shadow-for-note-active active:cursor-grab hover:cursor-pointer max-w-[220px] min-h-[110px]"
    >
      {/* @ts-ignore */}
      <Note title={data.title} text={data.text} _id={data._id}/>
    </div>
  );
}
