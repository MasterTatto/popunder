import React from 'react';
import s from './styles.module.css'

const Title = ({children, color = '#fff', colorLine = '#fff'}) => {
    return (
        <div className={s.title} style={{color: color}}>
            {children}
            <div className={s.line} style={{backgroundColor: colorLine}}/>
        </div>
    );
};

export default Title;
