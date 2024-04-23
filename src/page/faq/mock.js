import {NavLink} from "react-router-dom";

export const mock = {
    'ru': [
        {
            title: 'Как осуществляются выплаты?',
            sub_title: [
                'Выплаты осуществляются на следующие сутки после заказа, минимальная сумма для снятия - $2',
                'Кроме того, возможны "автоматическая", "срочная" и "моментальная" выплаты - ищите в разделе "Финансы".'
            ]
        },
        {
            title: 'Где нужно размещать код сети?',
            sub_title: [
                "Код сети лучше всего размещать как можно выше после тега <body>"
            ]
        },
        {
            title: 'Есть ли у Вас вознаграждение за лояльность?',
            sub_title: [
                <>Владельцы сайтов, непрерывно работающие с сетью месяц, получат бонус 3% от заработка. <br/> За два
                    месяца
                    непрерывной работы месячная премия составит 5%. <br/> Три месяца и более - плюс 7% ежемесячно.</>,
                'Допустимые месячные простои составляют не более 2-х дней единовременно и не более 3-х в совокупности.',
                'Трафик не должен падать более, чем на 50%.'
            ]
        },
        {
            title: 'Что такое PHP код и как его использовать?',
            sub_title: [
                'PHP код - это код, оптимизированный для обхода блокираторов рекламы и детектирования нелояльными системами.\n' +
                'Такой код приносит больше дохода.',
                'Установка PHP кода:',
                '1) необходимо получить php файл;',
                '2) переименовать произвольно (без упоминания popunder) и разместить на том же сайте, где будет размещён рекламный код;',
                '3) скопировать код;',
                '4) установить рекламный код, обязательно после открывающего тэга <body>, заменив в нём стандартный текст вместе со скобками [[your_file_url.php]] - ссылкой на php файл;',
                '5) в итоге Вы получите код вида:',
                <code>{'<script src="http://mysite.com/code.php?sid=mysiteID" async="" charset="UTF-8"></script>'}</code>

            ]
        },
        {
            title: 'Можно ли зарегистрировать себе новый аккаунт по реферальной ссылке от своего другого аккаунта?',
            sub_title: [
                'Нет - это рассматривается как искусственное и необоснованное увеличение доходности.'
            ]
        },
        {
            title: 'За что я получаю деньги?',
            sub_title: [
                <>
                    "Попандер" - оплата начисляется за переходы на сайты рекламодателей после того, как посетитель
                    Вашего
                    сайта нажал "закрыть"(X) на баннере.
                    <br/>
                    "Кликандер" - оплата также начисляется за переходы на сайты рекламодателей при клике посетителя на
                    любой
                    области Вашего сайта.
                    <br/>
                    Для баннерных форматов оплата возможна за показ и за переход - в зависимости от конкретного типа, а
                    также - от того, за что платит рекламодатель, однако не за то и другое вместе для одной загрузки
                    кода.
                </>
            ]
        },
        {
            title: 'Что такое "тень", "полутень" и для чего они нужны?',
            sub_title: [
                'Тень и полутень служат для увеличения выкупа - Ваш сайт или баннер накрывается полупрозрачной тенью до нажатия на "закрыть" (X), а после перехода, когда Вы получили за него доход - тень исчезает.'
            ]
        },
        {
            title: 'Мне нужно постоянно заходить на свой сайт, но каждый раз срабатывает реклама и я делаю переход. Могу ли я получить бан за накрутку?',
            sub_title: [
                'Нет. Вы можете спокойно работать, так как в системе присутствует функция "свой айпи".',
                'Однако злоупотреблять этим не стоит и если на сайте предстоит большой объём работ, то лучше всего на это время снимать код сети.'
            ]
        },
        {
            title: 'Посещаемость моего сайта больше, чем выкупается показов, почему?',
            sub_title: [
                'Во-первых, следует учесть эффект скрипта (действия фаерволов и т.п.) - рекомендуем использование кода через "выделенный домен" или php код для устранения этого фактора.',
                'Во-вторых, реклама показывается только при наличии соответствующего рекламодателя-покупателя, а если его нет и не установлена "заглушка", то и код ведёт себя так, как будто его нет на сайте. ',
                'В-третьих, для баннерных форматов существует CTR, то есть не все посетители на сайте кликают по ним, а количество рекламодателей, которые платят за показы - обычно небольшое.'
            ]
        },
        {
            title: 'Как увеличить доход и выкуп?',
            sub_title: [
                'Для увеличения выкупа и дохода выполняйте максимум пунктов из раздела "Образцовый партнёр" в пункте меню "Заработать больше".'
            ]
        },
        {
            title: 'Какая часть дохода вебмастеров от трат рекламодателей?',
            sub_title: [
                'Комиссия сети к базовым ставкам вебмастеров составляет всего 15%, почти все из которых уходят на многочисленные бонусы – реферальные, бонусы за лояльность, за места в ТОПе, "Образцовый партнёр", "За качество", "За активность" и другие дополнительные, проводятся различные конкурсы-акции.'
            ]
        },
        {
            title: 'Где можно ознакомиться с расценками на выкуп?',
            sub_title: [
                <>
                    Цена за каждый отдельный показ или переход - разная и формируется она на основе конкуренции
                    <br/>
                    между рекламодателями, а также зависит от характеристик каждого отдельного посетителя:
                    <br/>
                    географии, браузера, ОС и т.д. и настроек каждой отдельной площадки аккаунта.
                </>,
                'Поэтому узнать заранее цену для конкретного случая, к сожалению, возможности нет - лучше всего пробовать и отслеживать результат.'
            ]
        },
        {
            title: 'Хостинг блокирует размещение кода Popunder. Что делать?',
            sub_title: [
                'В разделе "Площадки", "Получить код", "Смена домена" подробно описано использование кода через "свой" и "выделенный домен".',
                'В первом случае, Вы создаете синоним (CNAME) popunder на своем домене и устанавливаете его в специальную форму на сайте, после чего код сети изменяется на новый.',
                'Во втором - у Вас есть возможность приобрести персональный выделенный домен, который однозначно неизвестен любым нелояльным системам (в том числе поисковикам).',
                <>
                    Выделенный домен можно купить как для себя лично, так и в компании с другими вебмастерами(до 4-х на
                    домен).
                    <br/>
                    При покупке на 4-х предоставляется значительная скидка.
                </>
            ]
        },
        {
            title: 'Что такое "заглушка"?',
            sub_title: [
                <>
                    "Заглушка" - одна из настроек площадки, позволяющая выгодно использовать трафик, который не
                    выкупился
                    сетью.
                    <br/>
                    Вы можете:
                </>,
                <>
                    указать ссылку, на которую пойдёт такой трафик;
                    <br/>
                    указать код другой системы, который будет срабатывать вместо кода Popunder
                </>,
                'Однако при использовании чужого кода он довольно часто может стать причиной санкций различных нелояльных систем.'
            ]
        },
        {
            title: 'Реклама не отображается, в чем проблема?',
            sub_title: [
                'Рекламодатели задают географические/временные таргетинги и устанавливают ограничения на объем.',
                'При этом, вполне может оказаться, что на текущий показ (Ваш) не нашлось покупателя.',
                'Когда это происходит, то баннер и реклама не показывается - Вы можете прописать "заглушку" в аккаунте для того, чтобы извлекать выгоду из такого непроданного трафика.',
                'Иногда скрипты сети блокируются на бесплатных хостингах и сервисах по созданию сайтов (к примеру Ucoz). В таких случаях рекомендуем загружать код со "своего" или "выделенного домена".'
            ]
        },
        {
            title: 'Разрешено ли размещение клонов?',
            sub_title: [
                'Размещение кодов систем, аналогов Popunder, разрешено, однако следует учитывать, что рекламодатель, вероятно, откажется от подобного трафика, ввиду его низкого качества. ',
                'Как правило, спрос на трафик c сайтов со множеством кодов в системе значительно ниже.'
            ]
        },
        {
            title: 'Что я получу, если активирую все установки в разделе "Образцовый партнёр"?',
            sub_title: [
                <>
                    Если у Вас отмечены все пункты, кроме №6 и №7, то Вы будете получать +0,5% к лояльности за каждый
                    полный
                    срок (30дней), в течение которого они были активны.
                    <br/>
                    Если у Вас отмечены все пункты кроме №6 или №7, то Вы будете получать +1% к лояльности за каждый
                    полный
                    срок (30дней), в течение которого они были активны.
                    <br/>
                    Если у Вас отмечены все 7 пунктов, то Вы будете получать +1,5% к лояльности за каждый полный срок
                    (30дней), в течение которого они были активны.
                </>,
                'Помимо этого каждый отдельный активированный пункт значительно увеличивает выкуп и доход.'
            ]
        },
        {
            title: 'Могу ли я выбрать один или несколько типов рекламы для отображения на сайте?',
            sub_title: [
                'Да - это возможно.',
                'Управление рекламными форматами находится в разделе "Площадки", "Настройки", "Показать доп. настройки": Отображаемые типы рекламы.',
                'При этом, если активированы все форматы одновременно, то отображаются они не все сразу, а в зависимости от того, в каком из них есть рекламодатель-покупатель и в каком будем самая высокая ставка, которая принесёт Вам больший доход.',
                'После изменений обновлять код на сайте не нужно. '
            ]
        },
    ],
    'en': [
        {
            title: 'When do you pay?',
            sub_title: [
                'Payments are made on the next day after the order. The minimum amount for withdrawal is $2 ',
                'In addition, there are options of "Automated","Urgent" and "Immediate" payments. You can read about it in the "Finance" section.'
            ]
        },
        {
            title: 'Where to put ad code?',
            sub_title: [
                "Best place to embed ad code of our advertising network is as high as possible in source code of your pages, right after the opening <body> tag."
            ]
        },
        {
            title: 'Do you have a reward for long term cooperation?',
            sub_title: [
                <>
                    Publishers, who are working with us for a month non-stop, will get a bonus of 3% of profit.
                    <br/>
                    The monthly bonus for two months of non-stop cooperation is 5%.
                    <br/>
                    After three months you'll get 7% bonus.
                </>,
                'We allow monthly downtime not more than 2 days at a time, also it should be not more than 3 days in total. Of course, this is only about the bonus.'
            ]
        },
        {
            title: 'What is PHP ad code and how to use it?',
            sub_title: [
                'PHP ad code is acode which effectively reduces the probability of detection by ad-blocker and any other not-good-for-site-owner systems.\n' +
                'Statistically, it leads to significant increase of your income.',
                'Installation of PHP ad code:',
                '1) Download php file;',
                '2) Rename it arbitrarily (better select name with no connection to advertising) and upload it to your site which is going to show the ad code.',
                '3) Save code.',
                '4) Place ad code right after the opening <body> tag, and change default text (including braces): [[your_file_url.php]] with a link to uploaded previously php file.',
                '5) Eventually, for domain mysite.com you should place an ad code:',
                <code>{'<script src="http://mysite.com/code.php?sid=mysiteID" async="" charset="UTF-8"></script>'}</code>

            ]
        },
        {
            title: 'Can I register a new account as a referral link of my current account?',
            sub_title: [
                'No, you can\'t. We treat it as violating of our policy.'
            ]
        },
        {
            title: 'What do I get the money for?',
            sub_title: [
                'It depends of advertising format.',
                'For display ads, video and fullscreen we pay money using the PPC (pay per click) of the CPM (cost per mile, that is pay per one thousand impressions) models.',
                'For Popunder and Clickunder formats we pay money using the PPC (pay per click) model only. It means when visitor of your site clicks on “close” button (of ad in center of screen) or on any place of your website you\'ll get payment for this operation and visitor will get a new window with advertiser\'s page on it.'
            ]
        },
        {
            title: 'What is "shadow", "half-shadow" and what are they for?',
            sub_title: [
                'Shadow and half-shadow serve to increase CTR. Your site became covered with translucent "shadow", which completely disappears after "close"-button is pressed by visitor. It is effective way to concentrate his attention.'
            ]
        },
        {
            title: 'I need to visit my site to manage it, and sometimes I click on ads. Can I get banned for cheating?',
            sub_title: [
                'No. Our network has a function "Your ip", it helps us to distinguish your clicks from your “real visitors”.',
                'However, if you are planning long term site maintenance it\'s better to turn off system code temporary.'
            ]
        },
        {
            title: 'Number of visitors on my site is higher than I see in network\'s stats. Why?',
            sub_title: [
                'You should take into account the effect of ad-blockers, firewalls, etc. We recommend you to use ad code “dedicated domain” or php code to get rid of this issue;',
                'The ads will be shown to your visitors only if eligible advertiser have been found. Sometimes this doesn\'t happen, so no ads are shown. Unless you set up "Traffic back” in settings of your site.',
                'Ads have CTR property, it means that not all visitors want to click on them. In PPC model we pay only for clicks and put in statistic only accomplished clicks.'
            ]
        },
        {
            title: 'How to increase my revenue?',
            sub_title: [
                'We recommend you to fulfill all the conditions of "Best partner". Also you can visit “Earning more” section of your account and get there whole list of bonuses which definitely increase you profits.'
            ]
        },
        {
            title: 'What is the income of publishers from costs of advertisers?',
            sub_title: [
                'We don\'t have fixed values for this, however our pricing is pretty simple:',
                'For a small base fee (only 15% from the advertisers expenses) we process whole this system, almost all of which goes to the bonuses: referral, loyalty bonuses, for a place in the top, "Best partner", "For quality", "For the activity" and various contests and activities.'
            ]
        },
        {
            title: 'Where can I find the rates?',
            sub_title: [
                'We have no fixed prices for the traffic , since its formation occurs on the principle of exchange.'
            ]
        },
        {
            title: 'My hosting provider blocks your ad code. What should I do?',
            sub_title: [
                'In "My sites" - "Get ad code" – "Change domain" section you\'ll find description of usage of ad code with "Your domain" or “Dedicated domain”. It\'s easy way to get around those odd providers.'
            ]
        },
        {
            title: 'What is "Traffic back"?',
            sub_title: [
                '"Traffic back" is one of the site\'s settings, which allows to use of traffic that our network, for some reason, haven\'t bought.',
                'You can select one of this:',
                'Use referral link. To send unsold visitors to your referral link of our network;',
                <>
                    Use own link. Select a link to send there this, unsold, visitors;
                    <br/>
                    Show the code of other system. Show ads of another advertising network or CPA system;
                    <br/>
                    Show nothing. Sometimes your visitors may need to rest.
                </>,
                'However, codes of other networks are likely to lead to blocking by anti-virus and penalties from the search engines.'
            ]
        },
        {
            title: 'Sometimes I don\'t see any ads on my site. What\'s the problem?',
            sub_title: [
                'Advertisers use many options to select target audience (such as geo or device targetings), as well as they use limits for their campaigns. It leaves the mark on ads visibility especially for site owner: current impression (your) couldn\'t find a buyer. When this happens, no ads are shown, unless you set up "Traffic back” in settings of your site.',
                'Also, sometimes the network\'s ad code is being blocked by free hosting services and site-creation services. In such cases, we recommend you to use ad code with "Your domain" or a “Dedicated domain”.'
            ]
        },
        {
            title: 'Is it allowed to combine the usage of your network with any other?',
            sub_title: [
                'Of course it is. However, our advertising network for now is one of the biggest and the most profitable, so that won\'t be necessary in the vast majority of cases. Moreover, some of advertisers might want to reduce volume of cooperation with your site.'
            ]
        },
        {
            title: 'What do I get if I fulfill all the conditions of "Best partner"?',
            sub_title: [
                <>
                    If you have got all ticks except №6 AND №7, you'll receive 0.5% increase of “loyalty" bonus for each
                    full term (30 days) of their activity.
                    <br/>
                    If you have got all ticks except №6 OR №7, you'll receive 1% increase of “loyalty" bonus for each
                    full term (30 days) of their activity.
                    <br/>
                    If you have got all ticks, you'll receive 1.5% increase of “loyalty" bonus for each full term (30
                    days) of their activity.
                </>,
                'In addition, each activated option significantly increases your profit.'
            ]
        },
        {
            title: 'How to choose one or more types of advertising which will display on my site?',
            sub_title: [
                'Management of advertising formats you may find there: "My sites", "Settings", "Show additional settings", "Types of advertising".',
                'Moreover, if all of the formats are activated simultaneously, they aren\'t displayed all at once. We select most profitable and relatively less-annoying combination of them with care about your audience.',
                'You don\'t need to update ad code on site after this changes.'
            ]
        },
    ]
}

export const mockv2 = {
    'ru': [
        {
            title: 'В каких валютах я могу пополнить счет?',
            sub_title: [
                'В данный момент системой принимаются ',
                'Capitalist, Paxum, Payeer, Visa, Mastercard,Mir, Advcash, Perfect Money, Webmoney, Yoomoney, QIWI',
                'Crypto(Tether, Tron, TON, Bitcoin, Ethereum, Bitcoincash, Litecoin, Ripple, Zcash, Dash, Dogecoin, Binance Coin, MATIC, BUSD, EOS, USD Coin, DAI, NixMoney, EXMO)'
            ]
        },
        {
            title: 'Какие требования к посетителям (таргетинги), которых мне нужно получить, я могу задать?',
            sub_title: [
                <>Описание всех возможностей сети доступно <NavLink to={'/'}>здесь</NavLink>.</>,
            ]
        },
        {
            title: 'Как мне увеличить объемы покупаемого трафика?',
            sub_title: [
                <>
                    Отключите избыточные таргетинги и снимите ограничения.
                    <br/>
                    Увеличьте "Максимальную", а если это необходимо и "Минимальную цену" выкупа - это позволит перебить
                    ставки других рекламодателей-конкурентов.
                    <br/>
                    Воспользуйтесь функцией "Выкупать одного посетителя раз в сутки", указывая необходимое для Вас
                    значение.
                    <br/>
                    Используйте и добавляйте максимум рекламных материалов всех доступных типов: тексты, картинки, видео
                    и
                    отслеживайте наиболее эффективный для каждого конкретного случая или оффера.
                </>,
            ]
        },
        {
            title: 'Что даёт увеличение цены выкупа?',
            sub_title: [
                'Более высокая цена даёт возможность получить больше посетителей, а кроме того - повышает место Вашего предложения в рекламной очереди, что напрямую влияет на уровень конверта.'
            ]
        },
        {
            title: 'Я заказал у Вас 1000 переходов, а мой счетчик Яндекс(Google) засчитал всего 400 переходов. В чем дело?',
            sub_title: [
                'Системой абсолютно точно к Вам отправлено именно столько посетителей, сколько указано в кабинете - здесь нет ошибки, по каждому из них есть подробные данные: точное время, IP, география и т.д.',
                'Для начала попробуйте подождать, так как не все счётчики отображают данные в реальном времени. Убедитесь, что рекламируемый сайт откликается максимально быстро и доступен, иначе вместе с ним не срабатывают и счётчики. ',
                'Кроме того, у многих пользователей установлены различные антивирусы и фаерволлы, которые блокируют загрузку графики на сайтах. Счетчики основных рейтингов устроены таким образом, что пользователь регистрируется ими только в том случае, если он загрузил картинку счетчика. Если же у пользователя на компьютере блокируется загрузка графики - он не будет замечен счетчиком, хотя в действительности посетит сайт.',
                'Расчёт отправленного трафика и расходов на рекламу производится исключительно по данным статистики кабинета системы Popunder'
            ]
        },
        {
            title: 'Почему в статистике счётчика Яндекс я вижу так много "отказов"(переходов с временем 0 секунд)?',
            sub_title: [
                'В Яндекс.Метрике среднее время, проведенное посетителем на сайте, рассчитывается как разница между временем последнего и первого зарегистрированного просмотра страницы в рамках одного визита.',
                'Если просмотр был только один (и не было "рефрешей"), то время на сайте не может быть определено и указывается, как 0.(хотя по факту могло быть любым по продолжительности).',
                'По точно такой же схеме работает и счётчик от Google, так что с большой вероятностью и остальные подобные сервисы ведут учёт таким же образом.'
            ]
        },
        {
            title: 'При создании рекламной кампании я поставил ограничение 15000 переходов UA трафика в сутки, но по Вашей статистике показывается не более 12 000. Почему?',
            sub_title: [
                'По всей видимости в сети оказалось меньше трафика, который подходит под Ваши требования или указана недостаточно высокая цена.',
                'Попробуйте, пожалуйста, отключить не самые важные таргетинги (избыточные) или поднять цену.'
            ]
        },
        {
            title: 'Есть ли возможность передавать во внешние системы, к примеру счётчики или партнёрские программы, данные о сайтах, вебмастерах, ключевых словах, по которым приходит трафик?',
            sub_title: [
                <>
                    Да, есть.
                    <br/>
                    Для этого необходимо добавить в ссылку соответствующие параметры:
                </>,
                '{wm_account_id} - ID вебмастера;',
                '{wm_site_id} - ID площадки;',
                '{campaign_id} - ID кампании;',
                '{kwlist} - ключевые слова;',
                '{ad_type} - тип баннера (слайдер, топлайн и тд.)',
                '{location} - город;',
                '{country} - страна;',
                '{topic_id} - тематика;',
                '{banner_id} - ID баннера;',
                '{browser} - браузер;',
                '{provider} - оператор;',
                '{platform} - операционная система.',
            ]
        },
        {
            title: 'Как определить тематику по ID, переданному в макросе?',
            sub_title: [
                'ID тематик:',
                '5 Авто/Транспорт',
                '6 Дом/Здоровье',
                '7 Заработок в интернете/Вебдизайн',
                '8 Коммуникации/Электроника',
                '9 Личное',
                '10 Недвижимость',
                '11 Общество/СМИ',
                '12 Путешествия/Туризм',
                '13 Развлечения и игры/Скачать',
                '14 Реклама/Справки',
                '15 Строительство/Ремонт',
                '16 Учёба/Работа',
                '17 Финансы',
                '18 Шопинг/ Женское',
                '19 Эротика/Сайты для взрослых',
                '20 Разное',
                '23 Торренты',
            ]
        },
        {
            title: 'Как я могу вернуть уже потраченные средства?',
            sub_title: [
                'Это, к сожалению, невозможно, так как данные средства уже переданы владельцам площадок-сайтов, предоставившим посетителей на Ваш ресурс.'
            ]
        },
        {
            title: 'Можно ли мне вывести заработанные на рефералах деньги?',
            sub_title: [
                'Аккаунт рекламодателя предназначен для проведения рекламных кампаний и соответственно - для пополнений, поэтому заработанные на рефералах средства вывести, к сожалению, возможности нет, но Вы можете направить их на рекламу.'
            ]
        },
        {
            title: 'Можно ли мне забрать неизрасходованные средства с моего акаунта?',
            sub_title: [
                'Да, это возможно, но только в случае, если через Ваши кампании не распространялись вирусы или они не были признаны таковыми модерационной группой.',
                'Период возврата средств - до 24 часов. Комиссия 10% от суммы пополнения.'
            ]
        },
        {
            title: 'Есть ли рекомендации по цене для выкупа в рекламной кампании?',
            sub_title: [
                'Сеть автоматически анализирует переходы за последние 30 минут, которые подходят под указанные Вами таргетинги и далее, исходя из наличия ставок других рекламодателей, рекомендует сумму, достаточную для того, чтобы трафик гарантированно приобретался Вашей рекламной кампанией.',
                'Если же рекламодателей-конкурентов нет, то посетители приобретаются по минимальной возможной цене.'
            ]
        },
    ],
    'en': [
        {
            title: 'What payment options are available here?',
            sub_title: [
                'At the moment we accept payments via ',
                'Capitalist, Paxum, Payeer, Visa, Mastercard,Mir, Advcash, Perfect Money, Webmoney, Yoomoney, QIWI',
                'Crypto(Tether, Tron, TON, Bitcoin, Ethereum, Bitcoincash, Litecoin, Ripple, Zcash, Dash, Dogecoin, Binance Coin, MATIC, BUSD, EOS, USD Coin, DAI, NixMoney, EXMO)'
            ]
        },
        {
            title: 'What targeting methods are available with Popunder?',
            sub_title: [
                'Categories and Geo targeting are available by default. You can also set up Schedule, Language, Devices and Platforms. Moreover, you can easily collect data about visitors of your website, and return them with help of "Retargeting".'
            ]
        },
        {
            title: 'How to increase the amount of visitors that I can purchase?',
            sub_title: [
                <>
                    Remove some of excessive targeting methods.
                    <br/>
                    Increase Maximum and Minimum price: it will allow you to get ahead of other advertisers.
                    <br/>
                    Use the option "Buy the same visitor". Sometimes visitors change their behavior.
                    <br/>
                    Use as many types of advertising formats as available simultaneously: it opens the door to all our
                    publishers and their sites.
                </>,
            ]
        },
        {
            title: 'What gives me increase of the price in campaign settings?',
            sub_title: [
                'The higher price yields more visitors you can get to your campaign. Besides that, higher price gives you the audience which more likely to interact with your landing page due to higher tier in competition.'
            ]
        },
        {
            title: 'I bought 1000 visitor\'s clicks, but Google Analitics has detected a total of 400 of them. Why so?',
            sub_title: [
                'We sent to your page exactly as many visitors as indicated in Statistic of your account. We are sure. However, there are some reasons for such a difference:',
                'First of all, we recommend you wait. Many statistic systems don\'t display stats in real time.',
                'Make sure that landing page responds with no delay, as fast as possible, especially while it\'s receiving visitors. Some servers became unavailable (or partly available) due to influx of users, therefore it leads to stats losses.',
                'In addition, users have a variety of anti-virus software, firewalls and ad-blocking software that often prevent normal loading of statistic system\'s tracking image. It also leads to the differences.'
            ]
        },
        {
            title: 'I\'ve set the limit of 15 000 UK visitors per night, but you send me not more than 12 000 every day. Why?',
            sub_title: [
                'Apparently our network has less amount of visitors, which are met your requirements or you set up not big enough maximum price. Please try to remove some of excessive targeting methods or raise the price.'
            ]
        },

        {
            title: 'How to get the information about each visitor I\'m buying? For instance: source site id, publisher id, keyword e.t.c.',
            sub_title: [
                <>
                    It's quite easy. All you need is to add to your ad link a "tracking macros":
                </>,
                "{wm_account_id} - publisher id;",
                "{wm_site_id} – site id;",
                "{campaign_id} – id of your campaign;",
                "{kwlist} – keywords of latter user's search, sometimes we can't provide it;",
                "{ad_type} – type of your ad (it can be Slider, Topline e.t.c.);",
                "{location} – city of visitor's location;",
                "{country} – country of visitor's location;",
                "{topic_id} – category of site where visitor came from;",
                "{banner_id} – id of your certain ad;",
                "{browser}- browser;",
                "{provider}- visitor's ISP;",
                "{platform} – visitor's platform (OS, it can be Windows, Android, e.t.c.).",
            ]
        },
        {
            title: 'How to identify category by ID, transferred in the macro?',
            sub_title: [
                'Category ID:',

                "5 Auto / Transportation",
                "6 Home/Health",
                "7 Money on the Internet / Web Design",
                "8 Communications / Electronics",
                "9 Personal",
                "10 Real Estate",
                "11 Society / Media",
                "12 Travel / Tourism",
                "13 Fun and games / Download",
                "14 Advertising / Help",
                "15 Construction / Renovation",
                "16 Education / Work",
                "17 Finance",
                "18 Shopping / Women",
                "19 Erotic / Adult websites",
                "20 Various",
                "23 Torrents",
            ]
        },
        {
            title: 'How I can return the money that I\'ve already spent?',
            sub_title: [
                'Unfortunately it is impossible because we\'ve already transferred the funds to publishers who provided visitors for your advertising campaign.'
            ]
        },
        {
            title: 'As an advertiser, can I participate in your referral program?',
            sub_title: [
                'Yes you can, however you can use the earnings of the program only for payments for future advertising campaigns. Advertiser\'s account designed primarily for advertising and it has no option of withdrawal money.'
            ]
        },
        {
            title: 'Can I get the remaining funds from my account?',
            sub_title: [
                'Yes, it is possible, but only in case your campaigns have no history of violating our policy (such as viruses e.t.c.). Review period of that kind of applications is 24 hours. Fee is 10% of deposit amount.'
            ]
        },
        {
            title: 'How to place bid wisely? Are there any recommendations?',
            sub_title: [
                'Our network automatically analyzes bids of all advertisers within the last 30 minutes and shows you recommended price, sufficient to win in competition for visitors. Use this suggestion to select suitable maximum price.',
                'If there are advertisers that compete for this visitors, bid will be set to the lowest possible value.'
            ]
        },
    ]
}
