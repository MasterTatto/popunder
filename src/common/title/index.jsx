import React from 'react';
import s from './styles.module.css'
import classNames from "classnames";

const Title = ({children, color = '#fff', colorLine = '#fff', isFullWidth = false, className}) => {
    return (
        <div className={classNames(s.title, className)} style={{color: color}}>
            {children}
            <div className={s.line} style={{backgroundColor: colorLine, width: isFullWidth ? '100%' : '150px'}}/>
        </div>
    );
};

export default Title;
