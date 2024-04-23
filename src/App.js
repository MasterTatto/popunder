import './App.css';
import Header from "./component/header";
import Footer from "./component/footer";
import Routers from "./routers";
import {createContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import 'moment/locale/ru';

import moment from "moment";

export const LangContext = createContext(null)

function App() {
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState('RU')
    const {pathname} = useLocation()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        const fakeLoadingProm = new Promise((resolve, reject) => {
            setTimeout(async () => {
                const langLoc = localStorage.getItem('lang') || 'ru'
                const lang_url = pathname?.slice(1, 3)
                const lang_choose = !lang_url ? langLoc?.toUpperCase() : (lang_url === 'ru' ? 'RU' : 'EN')
                setLang(lang_choose)
                moment.locale(lang_choose?.toLowerCase());
                await i18n.changeLanguage(lang_choose?.toLowerCase())
                resolve()
            }, 0)
        })

        fakeLoadingProm
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return null
    return (
        <>
            <LangContext.Provider value={{
                setLang: (lang) => setLang(lang),
                lang: lang
            }}>

                <div className="App">
                    <Header/>
                    <div className={'router'}>
                        <Routers/>
                    </div>
                    <Footer/>
                </div>
            </LangContext.Provider>
        </>
    );
}

export default App;
