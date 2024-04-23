import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "../page/main";
import Faq from "../page/faq";
import {LangContext} from "../App";
import Root from "../page/root";
import News from "../page/news";

const Routers = () => {
    const {lang} = useContext(LangContext)
    return (
        <Routes>
            <Route path={'/:lang'} element={<Main/>}/>
            <Route path={'/:lang/faq'} element={<Faq/>}/>

            <Route path={'/:lang/news'} element={<News/>}/>
            <Route path={'/:lang/root'} element={<Root/>}/>
            <Route path={'/:lang/callback'} element={<Main/>}/>

            <Route path={'*'} element={<Navigate to={`/${lang?.toLowerCase()}`} replace/>}/>
        </Routes>
    );
};

export default Routers;
