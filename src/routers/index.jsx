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
import Lk from "../page/lk";
import PubWebsite from "../page/lk/pages/p_website";
import PubReports from "../page/lk/pages/p_reports";
import AdvReports from "../page/lk/pages/a_reports";
import AdvCampaigns from "../page/lk/pages/a_campaigns";
import Billing from "../page/lk/pages/billing";

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

            <Route path={'/:lang/lk'} element={<Lk/>}>
                <Route index path={'publisher/websites'} element={<PubWebsite/>}/>
                <Route path={'publisher/reports'} element={<PubReports/>}/>
                <Route path={'advertiser/campaigns'} element={<AdvCampaigns/>}/>
                <Route path={'advertiser/reports'} element={<AdvReports/>}/>
                <Route path={'billing'} element={<Billing/>}/>
            </Route>

            <Route path={'*'} element={<Navigate to={`/${lang?.toLowerCase()}`} replace/>}/>
        </Routes>
    );
};

export default Routers;
