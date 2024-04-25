import './App.css';
import Header from "./component/header";
import Footer from "./component/footer";
import Routers from "./routers";
import React, {createContext, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import 'moment/locale/ru';

import moment from "moment";
import {scrollToTop} from "./utils/scrollToTop";
import AuthButton from "./common/auth_button";
import {api} from "./utils/api";

export const LangContext = createContext(null)
export const AuthContext = createContext(null)

function App() {
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState('RU')
    const [auth, setIsAuth] = useState(false)
    const {pathname} = useLocation()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        const fakeLoadingProm = new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const res = await api().get('api/site/user')
                    setIsAuth(res?.data?.ok)
                } catch (e) {
                    console.log(e)
                    setIsAuth(false)
                } finally {

                    const langLoc = localStorage.getItem('lang') || 'ru'
                    const lang_url = pathname?.slice(1, 3)
                    const lang_choose = !lang_url ? langLoc?.toUpperCase() : (lang_url === 'ru' ? 'RU' : 'EN')
                    setLang(lang_choose)
                    moment.locale(lang_choose?.toLowerCase());
                    await i18n.changeLanguage(lang_choose?.toLowerCase())
                    resolve()
                }

            }, 0)
        })

        fakeLoadingProm
            .finally(() => {
                setLoading(false)
            })
    }, [])


    useEffect(() => {
        scrollToTop()
    }, [pathname])

    if (pathname.includes('api/site/auth')) {
        return <Navigate to={`/${lang?.toLowerCase()}`} replace/>
    }

    if (loading) return null
    return (
        <>
            <LangContext.Provider value={{
                setLang: (lang) => setLang(lang),
                lang: lang
            }}>
                <AuthContext.Provider value={{
                    setIsAuth: setIsAuth,
                    auth: auth
                }}>

                    <div className="App">
                        <Header/>
                        <div className={'router'}>
                            <Routers/>
                        </div>
                        <Footer/>
                    </div>
                </AuthContext.Provider>
            </LangContext.Provider>
        </>
    );
}

export default App;
