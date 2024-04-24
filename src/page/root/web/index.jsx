import React, {useContext} from 'react';
import {mock, mockv2} from "../mock";
import s from "../styles.module.css";
import {LangContext} from "../../../App";

const RootWeb = () => {
    const {lang} = useContext(LangContext)
    return (
        <>
            {mock[lang?.toLowerCase()]?.map((el, i) => {
                return <div key={i} className={s.item}>
                    <h4 className={s.item_title}>{el.title}</h4>
                    <div className={s.item_desription}>
                        {el?.sub_title?.map((sub, ind) => {
                            return <p key={ind} className={s.item_desription_title}>{sub}</p>
                        })}
                    </div>
                </div>
            })}
        </>
    );
};

export default RootWeb;
