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

                let service = services[key];
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
    return icons;
}

const VerticalListItem = (props) => {
    console.log(props)

    const path = Global.GetResort(props.type);
    const category = Global.GetTypeEn(props.type);
    const price = props.price;
    const services = props.services;
    const title = props.title;

    return (
        
            <div className={classes.list__item}>
                <div>
                    <Link href={`/resorts/${path}/${category}/${title}`}>{(title.length >= 20) ? <div style={{position: 'relative'}}><div className='hint'>{title.substr(0, 6) + '...'}<div>{title}</div></div></div>: <h1>{title}</h1>}</Link>
                </div>
                <div>
                        {price} руб.
                </div>
                <div>
                    {ConvertServices(services.inStock)}
                </div>
                <div>
                    {ConvertServices(services.commonServices)}
                </div>
            </div>
    
    )
}

export default VerticalListItem
