import { useState } from 'react';
import ListItem from './ListItem.jsx';
import classes from './List.module.scss';

/*
    {parking: true, playground: true, restaurant: true, pebblesBeach: true, sandyBeach: true, sportsGround: true, trainer: true, pool: true, poolUnderRoof: true, park: true, sauna: true, SPA: true, receptionWithAnimals: true, musculoskeletalSystem: true, gynecologicalDiseases: true, urologicalDiseases: true, cardiovascularSystem: true, respiratoryOrgans: true, nervousSystem: true, digestiveSystem: true, metabolicDiseases: true, childrenUnder3: true, singleOccupancy: true, familiesOf4: true}
    [59.87026708231266, 30.26207174039379]
*/


const List = (props) => {
    // const[category, setCategory] = useState(props.category);
    const items = (() => 
    {
        //В случаи если элементы не были прописанны изначально, идет запрос к бд
        if(!props.items)
        {
            
            if(category == 'pensionats')
            {
                //return items = Запрос к бд возврщающий санатории
                //Это имитация
                return [
                    { 
                        idItem: 0,
                        title: 'Север', 
                        imgSrc: 'https://i.pinimg.com/736x/29/7d/e8/297de8d6b53093e1e254db98e40ec69e--rd-birthday-happy-birthday.jpg',
                        address: 'Народная 46',
                        price: '20 000 руб.',
                        services: [ 'food', 'bath' ]
                    },
                    {
                        idItem: 1,
                        title: 'Юг', 
                        imgSrc: 'https://i.pinimg.com/736x/14/1f/25/141f256cf0a13745138a88c10c8df7fd.jpg',
                        address: 'Английская 3',
                        price: '10 000 руб.',
                        services: [ 'food' ]
                    }
                ];
            }
            else if(props.category == 'hotels')
            {
               
                return [
                    {
                        idItem: 2,
                        title: 'Восток', 
                        imgSrc: 'https://www.seekpng.com/png/detail/83-830189_fanmade-pinkie-pie-dancing-pinkie-pie-friendship-is.png',
                        address: 'Пражская 14',
                        price: '15 000 руб.',
                        services: [ 'bath' ]
                    },
                    {
                        idItem: 3,
                        title: 'Запад', 
                        imgSrc: 'https://i.pinimg.com/736x/a5/e3/0c/a5e30c45346dc50127eeb1b3587c77c9--rainbow-dash-my-little-pony.jpg',
                        address: 'Российский проспект 18',
                        price: '25 000 руб.',
                        services: [ ]
                    }
                ];
            }
        }
        return props.items;
    })(); 

    //Parametr`s item: 
    //{
    // category
    // idItem
    // title
    // imgSrc
    // address
    // price
    // services : []
    //}

    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let element = items[i];
                elements.push(<ListItem category={props.category}
                                        idItem={element.idItem}
                                        title={element.title}
                                        imgSrc={element.imgSrc}
                                        address={element.address}
                                        price={element.price}
                                        services={element.services}/>);
            }
        }
        return elements;
    }
    

    return (
        <div className={classes.list + ' ' + props.className}
             style={{gridAutoRows: (props.rowHeight ? props.rowHeight : '500px') }}>
            {InsertItems()}            
        </div>
    )
}

export default List;
