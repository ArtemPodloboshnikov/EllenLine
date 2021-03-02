import { useEffect, useState } from 'react';
//
import Services from './Services.jsx';
import Advantages from './Advantages.jsx';
import Reviews from './Reviews.jsx';
import Clients from './Clients.jsx';
import QRcode from './QRcode.jsx';
import NemoTravel from './NemoTravel.jsx';
//
import classes from './Enter.module.scss';

// Стоит выделить Home в отдельный компонент в папку Home, вместе со стилями
const Home = () => {

    return (
        <div className={classes.home}>
            <NemoTravel/>
            {/* <Services data={data.services}/>
            <Advantages data={data.advantages}/> */}
            <Reviews/>
            <Clients/>
            <QRcode/>
        </div>
    )
}

export default Home;