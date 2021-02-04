import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//
import FormBooking from '../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../components/Common/InfoSection/InfoSection.jsx';
import Providers from '../../../../components/Common/Providers/Providers.jsx';
import ClientLayout from '../../../../layouts/ClientLayout.jsx';
//
import Global from '../../../global.js';
import classes from './index.module.scss';

const Resort = (props) => {
    const id = props.id;
    const images = props.images;
    const title = props.title;
    const price = props.price;
    const services = props.services;
    const text= props.text;
    const address = props.address;
    //
    const type = 'tours';

    return (
        <ClientLayout title={title}>
            <div className={classes.resort}>
                <InfoSection 
                title={title} 
                price={price} 
                text={text}
                images={images}
                type={type}/>

                <Providers 
                services={services} 
                address={address}
                type={type}/>

                <FormBooking 
                className={classes.form}
                price={price}/>
            </div>
        </ClientLayout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(Global.url + '/api/tours');
    const resorts = await res.json();
    const paths = [];
    Object.keys(resorts).forEach((resort) => {
        //Получение только ID`s
        const id_s = resorts[resort].map((element) => { return element.id } );
        id_s.forEach((this_Id) => {
            paths.push({ params: { resort: resort, id: this_Id.toString() } });
        }); 
    });
    //Macket
    //{ params: { resort: '...', id: '...' } }
    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps(router) {
    const resort = router.params.resort;
    const id = router.params.id;
    const res = await fetch(Global.url + '/api/tours/' + resort + '/' + id);
    const item = await res.json();
    return {
        props: {
            id: item.id,
            images: item.images,
            title: item.title,
            price: item.price,
            services: item.services,
            text: item.text,
            address: item.address
        }
    };
}

export default Resort;
