import React from 'react';
import s from './styles.module.css'
import Container from "../container";

const Footer = () => {
    return (
        <div className={s.footer}>
            <Container>
                <div className={s.content}>
                    <div className={s.footer_top}></div>

                    <div className={s.footer_bottom}>
                        <div className={s.footer_date}>© Popunder 2007-2024</div>

                        <div className={s.icons_box}>
                            <div className={s.icon_social}>
                                <i className="fa fa-facebook  waves-effect waves-light waves-circle blue"
                                   aria-hidden="true"></i>
                            </div>
                            <div className={s.icon_social}>
                                <i className="fa fa-twitter  waves-effect waves-light waves-circle light-blue lighten-2"
                                   aria-hidden="true"></i>
                            </div>
                            <div className={s.icon_social}>
                                <i className="fa fa-vk  waves-effect waves-light waves-circle blue"
                                   aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
