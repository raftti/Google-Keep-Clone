import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQuery, useQueryClient } from "react-query";
import React, { useState } from "react";
import { observer } from "mobx-react";
import clsx from "clsx";
import { SortableItem } from "../../components/SortableItem";
import appActions from "@/mobX/store/appActions";
import AddNote from "@/app/components/AddNote";
import userData from "@/mobX/store/userActions";
import Spinner from "@/app/components/features/Spinner";

const NotesContainer = observer(() => {
  const [letters, setLetters] = useState([""]);
  const [isLoader, setIsLoader] = useState<Boolean>(true);
  const queryClient = useQueryClient()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data, isLoading } = useQuery(
    "userCosts",
    () => userData.getUserCosts(localStorage.getItem("access_token") as string),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess(data) {
        if (data) {
          const formattedStrings = data?.data?.map((item: any) =>
            JSON.stringify(item).replace(/"/g, "'")
          );
          console.log(formattedStrings);
          setLetters(formattedStrings);
          setIsLoader(false);
        } else setLetters([""]);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  
function refetchData() {
  queryClient.invalidateQueries('userCosts')
  console.log('refetch');
}

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <AddNote className={clsx("")} updateNotesContainer={refetchData} />
      <SortableContext
        items={letters}
        strategy={
          appActions.isNotesListVertical
            ? horizontalListSortingStrategy
            : verticalListSortingStrategy
        }
      >
        <div
          className={clsx("pb-[8vw] pl-3 pt-[3vw] overflow-hidden flex-wrap", {
            flex: appActions.isNotesListVertical,
          })}
        >
          {isLoader ? (
            <Spinner className="ml-[33vw]" />
          ) : letters[0].length > 0 ? (
            letters.map((item) => <SortableItem key={item} id={item} />)
          ) : null}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id != over.id) {
      setLetters((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
});

export default NotesContainer;
