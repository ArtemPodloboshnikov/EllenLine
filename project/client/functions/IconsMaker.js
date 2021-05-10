import Image from 'next/image';

const iconsMaker = (text, returnWord, color) => {

    const icons = { restaurant: {text: ['Ресторан', 'Столовая'], icon: 'fas fa-utensils'}, 
                bar: {text: ['Бар'], icon: 'fas fa-beer'}, 
                wifi: {text: ['Wi-fi', 'WiFi'], icon: 'fas fa-wifi'},
                parking: {text: ['Парковка'], icon: 'fas fa-parking'},
                swimmingPool: {text: ['Бассейн'], icon: 'fas fa-swimming-pool'},
                wheelChair: {text: ['Инвалиды', 'Инвалидов'], icon: 'fas fa-wheelchair'},
                animals: {text: ['Животные', 'Животными'], icon: 'fas fa-paw'},
                conditioner: {text: ['Кондиционер'], icon: 'fas fa-thermometer-empty'},
                beach: {text: ['Пляж'], icon: 'fas fa-umbrella-beach'},
                park: {text: ['Парк'], icon: 'fas fa-tree'},
                sportsEquipment: {text: ['Прокат'], icon: 'fas fa-bicycle'},
                washingMachine: {text: ['Прачечная'], icon: <Image src={`/images/washing_machine_${color}.svg`} layout='fill'/>},
                orthopedics: {text: ['Ортопедия'], icon: 'fas fa-bone'},
                cardiology: {text: ['Кардиология'], icon: 'fas fa-heartbeat'},
                neurology: {text: ['Неврология'], icon: 'fab fa-hubspot'},
                gastroenterology: {text: ['Гастроэнтерология'], icon: <Image src={`/images/stomach_${color}.svg`} layout='fill'/>},
                gynecology: {text: ['Гинекология'], icon: 'fas fa-female'},
                urology: {text: ['Урология'], icon: 'fas fa-male'},
                dermatology: {text: ['Дерматология'], icon: 'fas fa-allergies'},
                tooth: {text: ['Стоматология'], icon: 'fas fa-tooth'},
                psychology: {text: ['Психотерапия', 'Психология'], icon: 'fas fa-brain'},
                otorhinolaryngology: {text: ['Оториноларингология'], icon: 'fas fa-head-side-cough'},
                ophthalmology: {text: ['Офтальмология'], icon: 'far fa-eye'},
                balneology: {text: ['Бальнеология'], icon: 'fas fa-water'},
                physicalTherapy: {text: ['Физиотерапия'], icon: 'fas fa-running'},
                climatotherapy: {text: ['Климатотерапия'], icon: 'fas fa-wind'},
                pulmonology: {text: ['Пульмонология'], icon: 'fas fa-lungs'},
                nephrology: {text: ['Нефрология'], icon: ''}
            };
    let result = false;
    text = text.split(' ');
    for (let index in text)
    {
        let word = text[index];
        
        
        for (let key in icons)
        {
            
            for (let i = 0; i < icons[key].text.length; i++)
            {
                const keyWord = icons[key].text[i];
                const pattern = new RegExp(`^${keyWord}$`, 'gi') 

                if (pattern.test(word))
                {
                    
                    if (returnWord)
                    {
                        return {icon: icons[key].icon, word: icons[key].text[0]}
                    }
                    else
                    {
                        return icons[key].icon;

                    }
                    
                }
                    
            }

            
        }

        
    }

    return result;
}

export default iconsMaker;