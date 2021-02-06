import React, { useState, useEffect } from 'react';
//
import FormBooking from '../../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../../components/Common/InfoSection/InfoSection.jsx';
import PresentationMap from '../../../../../components/Common/Map/PresentationMap.jsx';
import Providers from '../../../../../components/Common/Providers/Providers.jsx';
import Timetable from '../../../../../components/Common/Timetable/Timetable.jsx';
import ClientLayout from '../../../../../layouts/ClientLayout.jsx';
//
import Global from '../../../../global.js';
import classes from './index.module.scss';

const Resort = (props) => {
    const type = props.type;
    //relax, tours, cruises
    const id = props.id;
    const images = props.images;
    const title = props.title;
    const price = props.price;
    const services = props.services;
    const text= props.text;
    const address = props.address;
    const points = props.points;
    //relax
    const stars = props.stars;
    //tours, cruises
    const info = props.info;
    const timetable = props.timetable;
    const duration = props.duration;

    function GenerateTimetable() {
        switch(type) 
        {
            case 'tours':
            case 'cruises':
                return <Timetable 
                timetable={timetable}/>;
            case 'relax':
                return;
            default:
                return console.log(type + ' don`t support');
        }
    }

    function GenerateMap() {
        switch(type)
        {
            case 'relax':
            case 'cruises':
                return <PresentationMap 
                className={classes.map}
                points={[{coordinates: points, 
                    hintContent: '', 
                    balloonContentBody: ''}]}/>
            case 'tours':
                return;
            default:
                return console.log(type + ' don`t support');
        }
    }

    return (
        <ClientLayout title={title}>
            <div className={classes.resort}>
                <InfoSection 
                title={title} 
                price={price} 
                text={text}
                images={images}
                type={type}
                //
                stars={stars}
                duration={duration}/>

                <Providers 
                services={services} 
                address={address}
                type={type}
                //
                info={info}
                points={points}/>

                {GenerateTimetable()}

                {GenerateMap()}

                <FormBooking 
                className={classes.form}
                price={price}
                type={type}/>
            </div>
        </ClientLayout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(Global.url + '/api/resorts');
    const resorts = await res.json();
    
    const paths = [];
    for(let i = 0; i < resorts.length; i++)
    {
        const res = await fetch(Global.url + '/api/resorts/' + resorts[i]);
        const answer = await res.json();
        Object.keys(answer).map((element) => {
            answer[element].forEach((thisElem) => {
                paths.push({ params: { type: resorts[i], resort: element, id: thisElem.id.toString() } });
            });
        });
    }
    //Macket
    //{ params: { type: '...', resort: '...', id: '...' } }
    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps(router) {
    const type = router.params.type;
    const resort = router.params.resort;
    const id = router.params.id;
    const res = await fetch(Global.url + '/api/resorts/' + type + '/' + resort + '/' + id);
    const item = await res.json();
    return {
        props: {
            type: type,
            //relax, tours, cruises
            id: item.id,
            images: item.images,
            title: item.title,
            price: item.price,
            services: item.services,
            text: item.text,
            address: item.address,
            points: item.points,
            //relax
            stars: item.stars || null,
            //tours, cruises
            info: item.info || null,
            timetable: item.timetable || null,
            duration: item.duration || null
        }
    };
}

export default Resort;
