import React, { useState } from 'react';
import Link from 'next/link';
import SearchRelax from '../../components/Common/Search/SearchRelax.jsx';
import classes from './ChooseResort.module.scss';

const ChooseResort = (props) => {

    return(
        <div className={classes.resort + ' ' + props.className}>
            <SearchRelax className={classes.search}/>
            <div className={classes.choose}>
                
                <Link href='/relax/pensionats'>
                    <a>
                        Пансионаты
                    </a>
                </Link>
              
              
                <Link href='/relax/hotels'>
                    <a>
                        Отели
                    </a>
                </Link>
             
            </div>
        </div>
    )
}

export default ChooseResort;