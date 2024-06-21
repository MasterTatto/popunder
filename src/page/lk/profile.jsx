import React from 'react';
import s from "./styles.module.css";
import {Avatar} from "@mui/material";
import {useTranslation} from "react-i18next";

const Profile = ({user}) => {
    const {t} = useTranslation()

    return (
        <div className={s.navigate_info}>
            <Avatar src={user?.user?.photo} sx={{height: '50px', width: '50px'}}/>
            <div className={s.navigate_desc}>

                <p className={s.name}>{user?.user?.name || 'Incognito'}</p>
                <p className={s.uid}>
                    id: {user?.user?.chatId || 'none'}
                </p>
                <p className={s.uid}>
                    {t("Баланс")}: {(user?.user?.balance || 0).toFixed(2) || '0'}$
                </p>
            </div>
        </div>
    );
};

export default Profile;