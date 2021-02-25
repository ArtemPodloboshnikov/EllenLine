export default class Global {
    static url = 'https://ellen-line-84grpew8p-artempodloboshnikov.vercel.app:3000';
    static urlServer = 'https://ellen-line-84grpew8p-artempodloboshnikov.vercel.app:4000';
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
            default:
                console.log(type + " don`t support")
                return 'ERROR';
        }
    }   
}