import React, { useState } from 'react';                                                                        
import Link from 'next/link';
import SearchRelax from '../../components/Common/Search/SearchRelax.jsx';
import classes from './ChooseResort.module.scss';

const convert = { 'pensionats': 'Пансионаты', 'sanatoriums': 'Санатории'};

const ChooseResort = (props) => {
    const OnClick = props.onClick; //? (e) => props.onClick(e) : undefined;
    // OnClick({});
    function ToLink(type)
    {
        let content = <h1 onClick={OnClick} type={type}>{convert[type]}</h1>;
        if(OnClick)
            return content;
        else
            return <Link passHref href={{ pathname: '/relax/[resort]', query: { resort: type }}}>{content}</Link>
    }
    // let button_left = 

    return(
        <div className={classes.resort + ' ' + props.className}>
            <SearchRelax className={classes.search}/>
            <div className={classes.choose}>
                <div className={classes.pansionat}>
                    {ToLink('pensionats')}
                </div>
                <div className={classes.sanatorium}>
                    {ToLink('sanatoriums')}
                </div>
            </div>
        </div>
    )
}

export default ChooseResort;