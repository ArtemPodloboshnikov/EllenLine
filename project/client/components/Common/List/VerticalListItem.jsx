import React from 'react'
import Link from 'next/link';
import iconsMaker from '../../../functions/IconsMaker';
import {useState} from 'react'; 
import Global from '../../../pages/global';
import classes from './VerticalListItem.module.scss';

function ConvertServices(services){
    
    let icons = [];

    if(services && services.length != 0)
    {
        // console.log(services)
        for (let key in services)
        {
            for(let i = 0; i < services[key].length; i++)
            {
                let service = services[key][i];
                let icon = iconsMaker(service, true);
                if (icon)
                {
                    icons.push(
                        <div>
                            <div className={'hint ' + classes.hint}>
                                <i className={icon.icon} aria-hidden="true"></i>
                                <div>{icon.word}</div>
                            </div>
                        </div>
                    );
                    
                }
            }
        }
    }
    return icons;
}

const VerticalListItem = ({item}) => {
    console.log(item)
    const [photoIndex, setPhotoIndex] = useState(0);
    const images = item.images.split(',');
    const path = Global.GetResort(item.type);
    const category = Global.GetTypeEn(item.type);
    const price = item.price;
    const count_people = item.count_people;
    const services = JSON.parse(item.services);
    const typeOfRoom = item.typeOfRoom;
    const title = item.title;
    const id = item.id;

    const splitString = (string) =>{

        if (string.length > 20)
        {
            return string.substr(0, 16) + '...';
        }
    }

    return (
        <Link href={`/resorts/${path}/${category}/${id}`}>
            <div className={classes.list__item}>
                <div style={{backgroundImage: `url('/images/${path.toUpperCase()[0] + path.split('').splice(1).join('')}/${images[photoIndex]}')`, transition: 'background-image 3s easy'}}></div>
                <div>
                    <h1>{(typeOfRoom !== undefined) ? title + ': ' + typeOfRoom : title}</h1>
                    <p>
                        <i class="fa fa-money" aria-hidden="true"></i> {price} руб.
                    </p>
                    <p>
                        <i class="fa fa-user-friends" aria-hidden="true"></i> {count_people}
                    </p>
                </div>
                <div>
                    {ConvertServices(services)}
                </div>
            </div>
        </Link>
    )
}

export default VerticalListItem
