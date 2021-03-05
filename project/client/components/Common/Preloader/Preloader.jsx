import {useState} from 'react'
import classes from './Preloader.module.scss';
import Image from 'next/image';

const Preloader = (props) => {

    let display;
    if (props.action == 'start')
    {
        display = classes.wrap_start;
    }
    else
    if (props.action == 'none')
    {
        display = classes.wrap_none;
    }
    else
    if (props.action == 'stop')
    {
        display = classes.wrap_stop;
    }
    console.log(display)
    return (

        <div className={classes.wrap + ' ' + display}>
            <Image src='/images/logo.svg' width={300} height={300} />
        </div>
    )
}

export default Preloader
