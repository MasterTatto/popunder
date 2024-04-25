import React, {useEffect} from 'react';
import TelegramLoginButton from "telegram-login-button";

const AuthButton = () => {
    // useEffect(() => {
    //     const button = document.createElement('script')
    //     button.async = true
    //     button.src = 'https://telegram.org/js/telegram-widget.js?22'
    //     button.setAttribute('data-telegram-login', 'clickunder_bot')
    //     button.setAttribute('data-size', 'large')
    //     button.setAttribute('data-radius', '20')
    //     button.setAttribute('data-auth-url', 'https://clickinder.com/api/site/auth')
    //     // button.setAttribute('data-request-access', 'write')
    //     button.setAttribute('data-onauth', 'onTelegramAuth')
    //
    //     document.body.appendChild(button)
    //
    //
    //     return () => {
    //         document.body.removeChild(button)
    //     }
    // }, [])

    return (
        <div>
            {/*wow*/}
            {/*<TelegramLoginButton*/}
            {/*    botName="clickunder_bot"*/}
            {/*    dataAuthUrl={'https://clickinder.com/api/site/auth'}*/}
            {/*    dataOnauth={(user) => console.log(user)}*/}
            {/*/>*/}
            {/*<html>*/}
            {/*<body>*/}
            {/*<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="clickunder_bot"*/}
            {/*        data-size="large" data-auth-url="https://clickinder.com/api/site/auth"*/}
            {/*        data-request-access="write"></script>*/}
            {/*</body>*/}
            {/*</html>*/}
        </div>

    );
};

export default AuthButton;
