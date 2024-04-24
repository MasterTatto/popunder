import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "../page/main";
import Faq from "../page/faq";
import {LangContext} from "../App";
import Root from "../page/root";
import News from "../page/news";
import FaqWeb from "../page/faq/web";
import FaqAdvent from "../page/faq/advent";
import RootAdvent from "../page/root/advent";
import RootWeb from "../page/root/web";

const Routers = () => {
    const {lang} = useContext(LangContext)
    return (
        <Routes>
            <Route path={'/:lang'} element={<Main/>}/>
            <Route path={'/:lang/faq/'} element={<Faq/>}>
                <Route index path={'publisher'} element={<FaqWeb/>}/>
                <Route path={'advertiser'} element={<FaqAdvent/>}/>
            </Route>
            <Route path={'/:lang/rules/'} element={<Root/>}>
                <Route index path={'publisher'} element={<RootWeb/>}/>
                <Route path={'advertiser'} element={<RootAdvent/>}/>
            </Route>

            <Route path={'/:lang/news'} element={<News/>}/>
            <Route path={'/:lang/callback'} element={<Main/>}/>

            <Route path={'*'} element={<Navigate to={`/${lang?.toLowerCase()}`} replace/>}/>
        </Routes>
    );
};

export default Routers;
