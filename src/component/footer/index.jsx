import React from 'react';
import s from './styles.module.css'
import Container from "../container";
import {NavLink} from "react-router-dom";
import {scrollToTop} from "../../utils/scrollToTop";
import {useTranslation} from "react-i18next";

const links = [
    {title: 'Главная', link: '/'},
    {title: 'Новости', link: '/'},
    {title: 'FAQ', link: '/faq'},
    {title: 'Правила', link: '/'},
    {title: 'Вход', link: '/'},
    {title: 'Регистрация', link: '/'},
    {title: 'Контакты', link: '/'},
]
const Footer = () => {
    const {t} = useTranslation()
    return (
        <div className={s.footer}>
            <Container>
                <div className={s.content}>
                    <div className={s.footer_top}>
                        <div className={s.footer_top_left}>
                            <h3 className={s.footer_top_title}>{t('О нас')}</h3>

                            <div className={s.logo}>
                                <img src="https://ru.popunder.net/assets/index/images/popunder_logo.svg" alt="logo"/>
                            </div>

                            <div className={s.description}>
                                <p>{t('Рекламная сеть Popunder – продажа и покупка трафика.')}</p>
                                <p>{t('Рекламодателю – увеличение посещаемости, возможность выгодно купить трафик на сайт, а это – новые пользователи, клиенты, партнёры.')}</p>
                                <p>{t('Вебмастеру – многократный выкуп трафика по оптимальным ценам. Многочисленные бонусы и акции, стабильные выплаты.')}</p>
                            </div>

                        </div>
                        <div className={s.footer_top_right}>
                            <h3 className={s.footer_top_title}>{t('Меню')}</h3>

                            <div className={s.footer_navigate}>
                                {links?.map((el, i) => <NavLink to={el.link} key={i}
                                                                onClick={i === 0 && scrollToTop}>{t(el.title)}</NavLink>)}
                            </div>
                        </div>
                    </div>

                    <div className={s.footer_bottom}>
                        <div className={s.footer_date}>{`© Popunder 2023-${new Date().getFullYear()}`}</div>

                        <div className={s.icons_box}>

                            <a href={'https://t.me/clickunder_bot'} target={'_blank'} className={s.icon_social}>
                                <i className={`fa fa-telegram fa-2x`}
                                   aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
