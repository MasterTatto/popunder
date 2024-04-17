import React from 'react';
import s from './styles.module.css'
import classNames from "classnames";

const Container = ({children,className}) => {
    return (
        <div className={classNames(s.main,className)}>
            {children}
        </div>
    );
};

export default Container;
