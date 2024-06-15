import React, {useEffect} from 'react';
import Page1 from "./components/Main";
import Page2 from "./components/Discount";
import RtbAndApi from "./components/RtbAndApi";
import News from "./components/News";
import {scrollToTop} from "../../utils/scrollToTop";

const Main = () => {

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <div style={{minHeight: '100%'}}>
            <Page1/>
            <Page2/>
            <RtbAndApi/>
            <News/>
        </div>
    );
};

export default Main;
