export default class Global {
    static url = 'http://localhost:3000';
    static urlServer = 'http://localhost:4000';

    static GetTypeRus(resort)
    {
        let typeResort;
        if (resort == 'hotels')
        {
            typeResort = 'отель'
        }
        else 
        if (resort == 'pensionats')
        {
            typeResort = 'пансионат'
        }
        else 
        if (resort == 'sanatoriums')
        {
            typeResort = 'санаторий'
        }
        else
        if (resort == 'clinics')
        {
            typeResort = 'клиника'
        }
        else
        {
            typeResort = resort;
        }
        return typeResort;
    }
    static GetTypeEn(resort)
    {
        let typeResort;
        if (resort == 'отель')
        {
            typeResort = 'hotels'
        }
        else 
        if (resort == 'пансионат')
        {
            typeResort = 'pensionats'
        }
        else 
        if (resort == 'санаторий')
        {
            typeResort = 'sanatoriums'
        }
        else
        if (resort == 'клиника')
        {
            typeResort = 'clinics'
        }
        else
        {
            typeResort = resort;
        }
        return typeResort;
    }
    static GetResort(type)
    {
        switch(type)
        {
            case 'отель':
            case 'пансионат': 
            {
                return 'relax';
            }
            case 'санаторий':
            case 'клиника':
            {
                return 'treatment';
            }
        }
    }
    //Возможно стоит поместить этот массив в БД, а может нет :/
    static GetConvert(type) {
        switch(type)
        {
            case "relax":
                return {
                    'name': 'Отдых',
                    'pensionats': 'Пансионаты', 
                    'hotels': 'Отели',
                    'description': 'У нас вы сможете найти отдых по доступной цене'
                };
            case "cruises":
                return {
                    'name': 'Круизы',
                    'river': 'Речные',
                    'marine': 'Морские',
                    'description': 'У нас вы сможете найти круизы по доступной цене'
                };
            case "tours":
                return {
                    'name': 'Туры',
                    'oneday': 'Однодневные',
                    'multiday': 'Многодневные',
                    'description': 'У нас вы сможете найти туры по доступной цене'
                };
            case "treatment":
                return {
                    'name': 'Лечение',
                    'clinics': 'Клиники',
                    'sanatoriums': 'Санатории',
                    'description': 'У нас вы сможете найти лечение по доступной цене'
                }
            case "Saint-Petersburg":
                return {

                    'name': 'Санкт-Петербург',
                    'description': 'Все туры, санатории и отели в Санкт-Петербурге'
                }
            default:
                console.log(type + " don`t support")
                return 'ERROR';
        }
    }   
}