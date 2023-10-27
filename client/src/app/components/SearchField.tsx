import React, { FC, useRef, useState } from 'react';
import Button from './ui/Button';
import clsx from 'clsx';

interface ISearchField {
    clickAction: () => void;
}

const SearchField: FC<ISearchField> = ({clickAction}) => {
    const inputRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);

    const toggleClickedState = () => {
        setIsClicked(!isClicked);
      };

      const focusInput = () => {
        //@ts-ignore
        inputRef.current.focus(); 
      };  
      
    return (
        <div className={clsx('flex justify-between bg-gray-200 rounded-md', { ' shadow-for-search bg-white': isClicked, })}>
        <Button
            icon='/images/search.svg' 
            clickAction={focusInput}
        />
            <input 
                ref={inputRef}
                className='ml-2 bg-gray-200 focus:bg-white focus:outline-none rounded-e-md w-[40vw]'
                type='text' 
                placeholder='Поиск' 
                onFocus={toggleClickedState}
                onBlur={toggleClickedState}
/>
        </div>
    );
};

export default SearchField;