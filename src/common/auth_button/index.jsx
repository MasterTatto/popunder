import React, {useEffect} from 'react';

const AuthButton = () => {
    useEffect(() => {
        const button = document.createElement('script')
        button.async = true
        button.src = 'https://telegram.org/js/telegram-widget.js?22'
        button.setAttribute('data-telegram-login', 'clickunder_bot')
        button.setAttribute('data-size', 'large')
        button.setAttribute('data-radius', '20')
        button.setAttribute('data-auth-url', 'https://clickinder.com/api/site/auth')
        button.setAttribute('data-request-access', 'write')
        button.setAttribute('data-onauth', 'onTelegramAuth')

        document.body.appendChild(button)

        window.onTelegramAuth = function (user) {
            alert(
                'Logged in as ' +
                user.first_name +
                ' ' +
                user.last_name +
                ' (' +
                user.id +
                (user.username ? ', @' + user.username : '') +
                ')'
            )
        }

        return () => {
            document.body.removeChild(button)
        }
    }, [])
    return (
        <div id="telegram-widget-container">
            tg
        </div>
    );
};

export default AuthButton;
