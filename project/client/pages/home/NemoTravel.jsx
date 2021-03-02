import React, { useEffect } from 'react';
import classes from './NemoTravel.module.scss';

const NemoTravel = () => {

    useEffect(() => {
        FlightsSearchWidget.init({
            nemoURL: 'http://nemodemo.nemo.travel/',
            rootElement: document.getElementById('fillNemoTravel'),
            locale: 'ru'
        });
    });

    return <div>
        <div className={classes.title}>
            <p>Поиск авиабилетов</p>
        </div>
        <div id="fillNemoTravel" className={classes.nemoTravel}></div>
    </div>;
}

export default NemoTravel;