import React from 'react';
import s from './styles.module.css'
import Container from "../../../../component/container";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useTranslation} from "react-i18next";

const linksBottom = [
    {title: 'ТАРГЕТИНГИ'},
    {title: 'РЕКЛАМНЫЕ ФОРМАТЫ'},
    {title: 'ПОПОЛНЕНИЕ И ВЫВОД СРЕДСТВ'},
    {title: 'CКИДКИ И БОНУСЫ'},
    {title: 'RTB И API'},
    {title: 'НОВОСТИ'},
    {title: 'ПАРТНЁРЫ СЕТИ'},
]

const Page1 = () => {
    const {t} = useTranslation()

    return (
        <div className={s.main}>
            <Container className={s.container}>
                <div className={s.content}>
                    <div className={s.left}>
                        <div className={s.left_box}>
                            <h3 className={s.left_box_title}>{t('Создавайте рекламные кампании, получайте посетителей')}</h3>
                            <div className={s.left_box_items}>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('Пополнение баланса без комиссии')}
                                </div>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('11 рекламных форматов')}
                                </div>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('15 таргетингов для настройки')}
                                </div>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('Оплата за показы или переходы')}
                                </div>
                            </div>
                        </div>
                        <div className={s.left_box}>
                            <h3 className={s.left_box_title}>{t('Продавайте трафик, используя эффективные рекламные форматы')}</h3>
                            <div className={s.left_box_items}>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('Платим 85% цены рекламодателя')}
                                </div>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('Ежедневные выплаты')}
                                </div>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('Оперативная Поддержка')}
                                </div>
                                <div className={s.left_box_item}>
                                    <CheckCircleIcon sx={{color: '#fff', marginRight: '6px'}}/>
                                    {t('Реферальная программа')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.right}/>
                </div>
            </Container>
            <div className={s.navigate_bottom}>
                {linksBottom?.map((el) => <div className={s.navigate_bottom_item} key={el.title}>{t(el.title)}</div>)}
            </div>
        </div>
    );
};

export default Page1;
