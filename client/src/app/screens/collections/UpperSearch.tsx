import SearchField from "@/app/components/SearchField";
import Button from "@/app/components/ui/Button";
import appActions from "@/mobX/store/appActions";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface IUpperSearch {
    menuOpenAction: () => void
}

const UpperSearch: FC<IUpperSearch> = ({menuOpenAction}) => {

  const router = useRouter()
  const url = router.pathname

  function setPageTitle() {
    if (url == '/') return 'Главная'
    else if (url == '/reminders') return 'Напоминаяния'
    else return 'Корзина'
  }

  function changeNotesListRotation() {
    appActions.changeNotesListRotation()
  }

  function f() {
    console.log("asdf");
  }

  return (
    <div className='border-transparent border-b-gray-300 border-1'>
      <div className="flex justify-between m-[.5vw] ml-[.9vw] border-transparent">
        <div className="flex justify-between gap-[14vw]">
          <div className="flex items-center gap-[1vw]">
            <Button icon="/images/menu.svg" clickAction={menuOpenAction} />
            <h1 className=" text-xl">
              {setPageTitle()}
            </h1>
          </div>
            <SearchField clickAction={f} />
        </div>
        <div className={"flex justify-between items-center gap-[1vw]"}>
          <Button icon="/images/term.png" clickAction={changeNotesListRotation} />
          <Button icon="/images/settings.svg" clickAction={f} />
            <Button text='Войти' clickAction={() => router.push("/auth/login") } />
        </div>
      </div>
    </div>
  );
}

export default UpperSearch;
