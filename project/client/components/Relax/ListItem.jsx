import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ConvertService from './../CustomElements/ConvertService.jsx';
import classes from './ListItem.module.css';

const ListItem = (props) => {
    const[idItem, setId] = useState(props.idItem);
    const[imgSrc, setImage] = useState(props.imgSrc);
    const[title, setTitle] = useState(props.title);
    const[address, setAddress] = useState(props.address);
    const[price, setPrice] = useState(props.price);
    const[services, setServices] = useState(props.services);
    
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


    return (
        <NavLink to={'/relax/' + props.category + '/' + idItem}>
            <div className={classes.list_item + ' ' + classes.className}
            style={{backgroundImage: `url(${imgSrc})`}}>
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
        </NavLink>
    )
}

export default ListItem;