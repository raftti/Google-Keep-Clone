import React, { FC } from "react";
import Button from "../../components/ui/Button";
import { useRouter } from "next/router";
import clsx from "clsx";

interface IMenu {
  isMenuOpen: boolean;
}

const Menu: FC<IMenu> = ({ isMenuOpen }) => {
  const router = useRouter();

  return (
    <div className={clsx("bg-white flex flex-col pt-[.4vw] h-full z-10 fixed group/menu", isMenuOpen? '-left-[.9vw]' : 'hover:shadow-for-menu')}>
      <Button
        icon="/images/light.png" 
        isMenuOpen={isMenuOpen}
        flag="home"
        className={clsx('flex items-center gap-[2.5vw] group-hover/menu:w-[20vw] group-hover/menu:rounded-none group-hover/menu:rounded-r-full group-hover/menu:pl-[.9vw]  ml-[.9vw]', isMenuOpen ? 'pl-[.9vw] rounded-none rounded-r-full ml-0': 'rounded-[50%] group-hover/menu:ml-0')}
        clickAction={() => {
          router.push("/");
        }}
      >
          <h3 className={clsx('mr-[9.8vw] group-hover/menu:block', isMenuOpen ? "block" : "hidden")}>Заметки</h3>
      </Button>

      <Button
        icon="/images/archive.svg"
        isMenuOpen={isMenuOpen}
        flag="reminders"
        className={clsx('flex items-center gap-[2.5vw] group-hover/menu:w-[20vw] group-hover/menu:rounded-none group-hover/menu:rounded-r-full group-hover/menu:pl-[.9vw]  ml-[.9vw]', isMenuOpen ? 'pl-[.9vw] rounded-none rounded-r-full ml-0': 'rounded-[50%] group-hover/menu:ml-0')}
        clickAction={() => {
          router.push("/reminders");
        }}
      >
          <h3 className={clsx('mr-[9.8vw] group-hover/menu:block', isMenuOpen ? "block" : "hidden")}>Архив</h3>
      </Button>

      <Button
        icon="/images/trash.png" 
        isMenuOpen={isMenuOpen}
        flag="trash"
        className={clsx('flex items-center gap-[2.5vw] group-hover/menu:w-[20vw] group-hover/menu:rounded-none group-hover/menu:rounded-r-full group-hover/menu:pl-[.9vw]  ml-[.9vw]', isMenuOpen ? 'pl-[.9vw] rounded-none rounded-r-full ml-0': 'rounded-[50%] group-hover/menu:ml-0')}
        clickAction={() => {
          router.push("/trash");
        }}
      >
          <h3 className={clsx('mr-[9.8vw] group-hover/menu:block', isMenuOpen ? "block" : "hidden")}>Корзина</h3>
      </Button>
    </div>
  );
}

export default Menu;
