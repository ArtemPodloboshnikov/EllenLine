const icons = {restaurant: {text: ['Ресторан'], icon: 'cutlery'}, 
                    bar: {text: ['Бар'], icon: 'beer'}, 
                    wifi: {text: ['Wi-fi', 'WiFi'], icon: 'wifi'}};

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
                        return {icon: icons[key].icon, word: keyWord}
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