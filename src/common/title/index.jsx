import React from 'react';
import s from './styles.module.css'

const Title = ({children, color = '#fff', colorLine = '#fff',isFullWidth = false}) => {
    return (
        <div className={s.title} style={{color: color}}>
            {children}
            <div className={s.line} style={{backgroundColor: colorLine,width:isFullWidth ? '100%' : '150px'}}/>
        </div>
    );
};

export default Title;
