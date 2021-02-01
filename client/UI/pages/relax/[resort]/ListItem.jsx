import React, { useState } from 'react';
import Link from 'next/link';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    const idItem = props.idItem;
    const imgSrc = props.imgSrc.split(',');
    const title = props.title;
    const address = props.address;
    const price = props.price;
    const services = JSON.parse(props.services);
    const category = props.category;
    const [photoIndex, setPhotoIndex] = useState(0);
    
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
                        console.log(service + ' service don`t support');
                        offset++;
                        continue;
                }
                // elements.push(<ConvertServic service={services[i]} style={{gridColumn: `${i + 1}`}}/>);
                elements.push(service);
            }
        }
        return elements;
    }
    console.log();

    const onHover = () => {
        
        setTimeout(()=>{

            if (imgSrc.length > photoIndex + 1)
                setPhotoIndex(photoIndex + 1);
            else
                setPhotoIndex(0);

            onHover();
        }, 3000)
        
       
    }
    return (
        <Link href={{ pathname: '/relax/[resort]/[id]', }} as={'/relax/' + category + '/' + idItem}>
            <div className={classes.list_item + ' ' + props.className} onMouseOut={onHover}
            style={{transition: 'background 2.5s ease', background: `url('/images/RelaxDynamic/${imgSrc[photoIndex]}')`}}>
                <div className={classes.top}>
                    <h1 className={classes.title}>
                        {title}
                    </h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <p>
                            {address}
                        </p>
                    </div>
                    <div className={classes.price}>
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <p>
                            {price}
                        </p>
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