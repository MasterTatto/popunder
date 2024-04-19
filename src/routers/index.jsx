import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "../page/main";
import Faq from "../page/faq";

const Routers = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/faq'} element={<Faq/>}/>
            <Route path={'*'} element={<Main/>}/>
        </Routes>
    );
};

export default Routers;
