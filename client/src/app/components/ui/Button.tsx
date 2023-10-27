import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";

import { useRouter } from 'next/router';
interface IButton {
  children?: React.ReactNode
  className?: string
  text?: any
  icon?: string;
  bgByClick?: string;
  flag?: string
  isMenuOpen?: boolean
  clickAction?: () => void;
  setOpen?: () => void
};


const Button: FC<IButton> = ({ icon, clickAction, className, flag, children, text }) => {
  const router = useRouter();

  return (
    <button onClick={clickAction} className={clsx('', 
      text == null ? 'btn-primary' : 'hover:bg-gray-bg py-1 px-4 rounded-md transition-colors duration-300',
      className != null ? className : '',
      (flag === 'home' && router.pathname === '/') ? 'bg-moccasin hover:bg-moccasin' : null,
      (flag === 'reminders' && router.pathname === '/reminders') ? 'bg-moccasin hover:bg-moccasin' : null,
      (flag === 'trash' && router.pathname === '/trash') ? 'bg-moccasin hover:bg-moccasin' : null,
    )}>
      {text}
      {icon && <Image width={24} height={24} className="m-[10px]" src={icon} alt="image" />}
      {children}
    </button>
  );
};


export default Button;