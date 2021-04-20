const icons = { restaurant: {text: ['Ресторан'], icon: 'fas fa-utensils'}, 
                bar: {text: ['Бар'], icon: 'fas fa-beer'}, 
                wifi: {text: ['Wi-fi', 'WiFi'], icon: 'fas fa-wifi'},
                parking: {text: ['Парковка'], icon: 'fas fa-parking'},
                swimmingPool: {text: ['Бассейн'], icon: 'fas fa-swimming-pool'},
                wheelChair: {text: ['Инвалиды', 'Инвалидов'], icon: 'fas fa-wheelchair'},
                animals: {text: ['Животные', 'Животными'], icon: 'fas fa-paw'},
                conditioner: {text: ['Кондиционер'], icon: 'fas fa-thermometer-empty'},
                beach: {text: ['Пляж'], icon: 'fas fa-umbrella-beach'},
                park: {text: ['Парк'], icon: 'fas fa-tree'},
                };

const iconsMaker = (text, returnWord) => {

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