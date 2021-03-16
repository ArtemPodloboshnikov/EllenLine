import {useState} from 'react';
import Link from 'next/link';
import classes from './BreadCrumbs.module.scss';

const BreadCrumbs = (props) => {

    const values = props.value;
    console.log(values);

    return (
        <div className={classes.wrap + ' ' + props.className}>
            {(()=>{

                let links = [];
                let сhar = '';
                values.map((value)=>{

                    links.push(<>{` ${сhar} `}<Link href={value.href} as={value.as}><a>{value.text}</a></Link></>);
                    сhar = '>';
                })
               
                return links;

            })()}
        </div>
    )
}

export default BreadCrumbs
