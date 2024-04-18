import React from 'react';
import Page1 from "./components/Main";
import Page2 from "./components/Discount";
import RtbAndApi from "./components/RtbAndApi";

const Main = () => {
    return (
        <div style={{minHeight: '100%'}}>
            <Page1/>
            <Page2/>
            <RtbAndApi/>
        </div>
    );
};

export default Main;
