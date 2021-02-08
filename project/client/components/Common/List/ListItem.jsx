import React, { useState } from 'react';
import Link from 'next/link';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    const id = props.id;
    const images = props.images.split(',');
    const title = props.title;
    const address = props.address;
    const price = props.price;
    const services = props.services;
    const category = props.category;
    const [photoIndex, setPhotoIndex] = useState(0);
    const path = props.path;
    
    function ConvertServices(){
        let elements = [];
        if(services && services.length != 0)
        {
            let offset = 0;
            for(let i = 0; i < services.length; i++)
            {
                let service = services[i];
                let column_offset = {gridColumn: `${i + 1}`};

                //This is just example, services will be another
                switch(service)
                {
                    case 'food':
                        service = <i class="fa fa-cutlery" aria-hidden="true"
                                     style={column_offset}></i>;
                        break;
                    case 'bath':
                        service = <i class="fa fa-bath" aria-hidden="true"
                                     style={column_offset}></i>;
                        break;
                    default:
                        //console.log(service + ' service don`t support');
                        offset++;
                        continue;
                }
                // elements.push(<ConvertServic service={services[i]} style={{gridColumn: `${i + 1}`}}/>);
                elements.push(service);
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
    console.log(id)
    return (
        <Link href={`/resorts/${path}/${category}/${id}`}>
            <div className={classes.list_item + ' ' + classes.className} onMouseEnter={onHover}
            style={{transition: 'background-image 3s easy', backgroundImage: `url(/images/${path.toUpperCase()[0] + path.split('').splice(1).join('')}Dynamic/${images[photoIndex]})`}}>
                <div className={classes.top}>
                    <h1 className={classes.title}>
                        {title}
                    </h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <p>{address}</p>
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