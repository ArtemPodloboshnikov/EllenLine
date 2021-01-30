import React, { useState } from 'react';
import Link from 'next/link';
import Search from '../../components/Common/Search/Search.jsx';
import classes from './ChooseResort.module.scss';

const ChooseResort = (props) => {

    return(
        <div className={classes.resort + ' ' + props.className}>
            <Search className={classes.search}/>
            <div className={classes.choose}>
                <div className={classes.pansionat}>
                    <Link href='/relax/pensionats'>
                        <h1>
                            Пансионаты
                        </h1>
                    </Link>
                </div>
                <div className={classes.sanatorium}>
                    <Link href='/relax/sanatoriums'>
                        <h1>
                            Санатории
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ChooseResort;