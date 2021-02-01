import React, { useState } from 'react';
import { useRouter } from 'next/router';
//
import FormBooking from '../../../../components/CustomElements/FormBooking.jsx';
import InfoSection from '../../../../components/CustomElements/InfoSection.jsx';
import ClientLayout from '../../../../layouts/ClientLayout.jsx';
//
import Global from '../../../global.js';
import classes from './index.module.scss';

const Resort = (props) => {
    // По идее здесь должен идти запрос к бд, а не передача через пропсы
    // Но это временно для проверки пока бд не прикручена
    const router = useRouter();
    const id = props.idItem;
    const images = props.images;
    const title = props.title;
    const price = props.price;
    const services = props.services;
    const text= props.text;
    const address = props.address;
    //

    //#region Convert Object
    const convert = 
    { 
        'available': 
        {
            'restaurant': 
            [
                <i class="fa fa-cutlery" aria-hidden="true"></i>,
                <p>Ресторан</p>
            ], 
            'wifi': 
            [
                <i class="fa fa-wifi" aria-hidden="true"></i>,
                <p>Wi-Fi в лобби</p>
            ] 
        },
        'common': 
        {
            'bar': 
            [
                <i class="fa fa-beer" aria-hidden="true"></i>,
                <p>Бар</p>
            ]
        },
        'rooms': 
        {
            'wifi':
            [
                <i class="fa fa-wifi" aria-hidden="true"></i>,
                <p>Wi-Fi в номере</p>
            ]
        }
    };
    //#endregion


    function ConvertServices(service) {
        let massiv = services[service];
        let converts = convert[service];
        let elements = [];
        massiv.forEach(element => {
            elements.push(converts[element][0]);
            elements.push(converts[element][1]);
        });
        return elements;
    }

    return (
        <ClientLayout title={title}>
            <div className={classes.resort}>
                {/*  */}
                <InfoSection title={title} 
                            price={price} 
                            text={text}
                            images={images}/>
                {/*  */}
                <div className={classes.services}>
                    <div className={classes.available}>
                        <h1>В наличии</h1>
                        <div className={classes.service}>
                            {/* {ConvertServices('available')} */}
                        </div>
                    </div>
                    <div className={classes.common}>
                        <h1>Общие услуги</h1>
                        <div className={classes.service}>
                            {/* {ConvertServices('common')} */}
                        </div>
                    </div>
                    <div className={classes.rooms}>
                        <h1>Услуги в номерах</h1>
                        <div className={classes.service}>
                            {/* {ConvertServices('rooms')} */}
                        </div>
                    </div>
                    <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <h1>{address}</h1>
                    </div>
                </div>

                <div className={classes.map}>
                    
                </div>

                <FormBooking className={classes.form}/>
            </div>
        </ClientLayout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(Global.url + '/api/relax');
    const resorts = await res.json();
    const paths = [];
    Object.keys(resorts).forEach((resort) => {
        //Получение только ID`s
        const id_s = resorts[resort].map((element) => { return element.idItem } );
        id_s.forEach((this_Id) => {
            paths.push({ params: { resort: resort, id: this_Id.toString() } });
        }); 
    });
    console.log(paths);
    //Macket
    //{ params: { resort: '...', id: '...' } }
    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps(router) {
    console.log('Function Props');
    const resort = router.params.resort;
    const id = router.params.id;
    const res = await fetch(Global.url + '/api/relax/' + resort + '/' + id);
    const item = await res.json();
    console.log(item);
    return {
        props: {
            id: item.idItem,
            images: item.imgSrc,
            title: item.title,
            price: item.price,
            services: item.services,
            text: item.text,
            address: item.address
        }
    };
}

export default Resort;