export default class Global {
    static url = 'http://localhost:3000';
    static urlServer = 'http://localhost:4000';
    //Возможно стоит поместить этот массив в БД, а может нет :/
    static GetConvert(type) {
        switch(type)
        {
            case "relax":
                return {
                    'name': 'Отдых',
                    'pensionats': 'Пансионаты', 
                    'hotels': 'Отели',
                };
            case "cruises":
                return {
                    'name': 'Круизы',
                    'river': 'Речные',
                    'marine': 'Морские',
                };
            case "tours":
                return {
                    'name': 'Туры',
                    'oneday': 'Однодневные',
                    'multiday': 'Многодневные'
                };
            default:
                console.log(type + " don`t support")
                return 'ERROR';
        }
    }   
}