import React, { useState } from 'react';
import Link from 'next/link';
import iconsMaker from '../../../functions/IconsMaker';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    const id = props.id;
    const images = props.images.split(',');
    const count_people = props.count_people;
    const title = (props.title.length <= 12) ? props.title : <div><div className='hint'>{props.title.substr(0, 8) + '...'}<div>{props.title}</div></div></div>;
    const price = props.price;
    const services = JSON.parse(props.services);
    const category = props.category;
    const [photoIndex, setPhotoIndex] = useState(0);
    const path = props.path;
    
    function ConvertServices(){
        let elements = [];
        if(services && services.length != 0)
        {
            // console.log(services)
            for (let key in services)
            {
                let countColumn = 0;
                for(let i = 0; i < services[key].length; i++)
                {
                    let service = services[key][i];
                    let icon = iconsMaker(service, true);
                    if (icon)
                    {
                        let column_offset = {gridColumn: `${++countColumn}`};
                        elements.push(
                            <div>
                                <div className='hint'>
                                    <i className={icon.icon} aria-hidden="true"></i>
                                    <div>{icon.word}</div>
                                </div>
                            </div>
                        );
                        
                    }
                }
            }
        }
        return elements;
    }

    function onHover () {
            if (images.length > photoIndex + 1)
                setPhotoIndex(photoIndex + 1);
            else
                setPhotoIndex(0);       
    }
   
    return (
        <Link href={`/resorts/${path}/${category}/${id}`}>
            <div className={classes.list_item + ' ' + classes.className} onMouseEnter={onHover}
            style={{transition: 'background-image 3s easy', backgroundImage: `url(/images/${path.toUpperCase()[0] + path.split('').splice(1).join('')}/${images[photoIndex]})`}}>
                <div className={classes.top}>
                    <h1 className={classes.title} style={(()=>{ if (typeof title != 'string') return {gridColumn: '2 / 3', gridRow: '4 / 5'}})()}>
                        {title}
                    </h1>
                </div>
                <div className={classes.bottom}>
                    {/* <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <p>{address}</p>
                    </div> */}
                    <div className={classes.count}>
                        <i class="fa fa-user-friends" aria-hidden="true"></i>
                        <p>{count_people}</p>
                    </div>
                    <div className={classes.price}>
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <p>{price} руб.</p>
                    </div>
                    <div className={classes.services}>
                        {ConvertServices()}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListItem;