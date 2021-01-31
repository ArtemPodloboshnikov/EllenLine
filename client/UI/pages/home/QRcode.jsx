import React from 'react'
import classes from './QRcode.module.scss';

const QRcode = () => {
    return (
        <div className='section'>
            <div className='section__title_right'>
                <p>Safe travels </p>
            </div>
            <div className={classes.code}>
                <img src='images/Home/qr_code.svg'/>
            </div>
        </div>
    )
}

export default QRcode
