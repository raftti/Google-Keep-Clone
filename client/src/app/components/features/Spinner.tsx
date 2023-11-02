import clsx from 'clsx';
import React, { FC } from 'react';

interface ISpinner{
    className?: string
}

const Spinner: FC<ISpinner> = ({className}) => {
    return (
        <i className={clsx("loader --1",
        className != null ? className : "",
        )}></i>
    );
};

export default Spinner;