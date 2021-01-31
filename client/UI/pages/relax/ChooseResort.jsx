import React, { useState } from 'react';                                                                        
import Link from 'next/link';
import SearchRelax from '../../components/Common/Search/SearchRelax.jsx';
import classes from './ChooseResort.module.scss';

const ChooseResort = (props) => {

    return(
        <div className={classes.resort + ' ' + props.className}>
            <SearchRelax className={classes.search}/>
            <div className={classes.choose}>
                <div className={classes.pansionat}>
                    <Link href={{ pathname: '/relax/[resort]', query: { resort: 'pensionats'}}}>
                        <h1 type='pensionats'>
                            Пансионаты
                        </h1>
                    </Link>
                </div>
                <div className={classes.sanatorium}>
                    <Link href={{ pathname: '/relax/[resort]', query: { resort: 'sanatoriums'}}}>
                        <h1 type='sanatoriums'>
                            Санатории
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ChooseResort;