import React from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import {useTranslation} from "react-i18next";
import Container from "../../../../component/container";
import classNames from "classnames";
import {Avatar} from "@mui/material";
import img1 from '../../../../assetss/api.jpg'

const mock = [
    // {
    //     // img: 'https://popunder.net/assets/index/images/rtbn.jpg',
    //     title: 'RTB, XML, JSON',
    //     description: [
    //         {
    //             sub_title: 'Мы сотрудничаем с различными сетями путём интеграции по ORTB, XML, JSON.'
    //         },
    //         {
    //             sub_title: 'Готовы работать с новыми партнёрами в обе стороны - на покупку и на продажу трафика.'
    //         },
    //         {
    //             sub_title: 'Обращайтесь, пожалуйста.'
    //         },
    //     ]
    // },
    {
        img: img1,
        title: 'API',
        description: [
            {
                sub_title: 'Для автоматизации процессов в системе доступны запросы через API.'
            },
            {
                sub_title: 'За подробностями обращайтесь, пожалуйста, в Поддержку.'
            }
        ]
    },
]
const RtbAndApi = () => {
    const {t} = useTranslation()

    return (
        <div className={s.main} id={'rtb'}>
            <Container className={s.test}>
                <Title color={'#247ba0'} colorLine={'#247ba0'}>{t('RTB И API')}</Title>

                <div className={s.container}>
                    {mock?.map((el, i) => {
                        return <div className={classNames(s.item)} key={i}>
                            <div className={s.img_box}>
                                <Avatar src={el.img} sx={{
                                    width: '100%', borderRadius: '0px', height: '100%',
                                    transition: 'transform .6s ease-out',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        opacity: '.5'
                                    }
                                }}/>
                            </div>

                            <div className={s.content}>
                                <h4 className={s.content_title}>{t(el.title)}</h4>

                                <div className={s.description_box}>
                                    {el.description?.map((desc, ind) => {
                                        return <div className={s.desc_item} key={ind}>
                                            {desc.title && <p className={s.desc_title}>{t(desc.title)}</p>}
                                            <p className={s.desc_subtitle}>{t(desc.sub_title)}</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </Container>
        </div>
    );
};

export default RtbAndApi;
