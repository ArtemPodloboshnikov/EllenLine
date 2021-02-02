import React, { useState } from 'react';                                                                        
import Link from 'next/link';
//
import SearchRelax from '../Search/SearchRelax.jsx';
//
import classes from './ChooseResort.module.scss';

//Возможно стоит поместить этот массив в БД, а может нет :/
const convert = 
{ 
    // /relax/
    'pensionats': 'Пансионаты', 
    'sanatoriums': 'Санатории',
    // /cruises
    'river': 'Речные',
    'marine': 'Морские'
};

const ChooseResort = (props) => {
    const OnClick = props.onClick;
    
    function ToLink(type)
    {
        let content = <h1 onClick={OnClick} type={type}>{convert[type]}</h1>;
        if(OnClick)
            return content;
        else
            return <Link href={`/${props.path}/${type}`}>{content}</Link>;
        //{ pathname: '/relax/[resort]', query: { resort: type }}
    }

    return(
        <div className={classes.resort + ' ' + props.className}>
            <SearchRelax className={classes.search}/>
            <div className={classes.choose}>
                <div className={classes.pansionat}>
                    {ToLink(props.left)}
                </div>
                <div className={classes.sanatorium}>
                    {ToLink(props.right)}
                </div>
            </div>
        </div>
    )
}

export default ChooseResort;