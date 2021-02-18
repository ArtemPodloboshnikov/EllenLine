import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//
import FormBooking from '../../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../../components/Common/InfoSection/InfoSection.jsx';
import Providers from '../../../../../components/Common/Providers/Providers.jsx';
import Timetable from '../../../../../components/Common/Timetable/Timetable.jsx';
import ClientLayout from '../../../../../layouts/ClientLayout.jsx';
//
import Global from '../../../../global.js';
import classes from './index.module.scss';

const Resort = ({data}) => {

    const [dbData, setDbData] = useState(data);
    const router = useRouter();
    const type = router.query.type;
    const resort = router.query.resort;
    const id = router.query.id;
    //relax, tours, cruises
    // const id = props.id;
    // const images = props.images;
    // const title = props.title;
    // const price = props.price;
    // const services = props.services;
    // const text= props.text;
    // const address = props.address;
    // const points = props.points;
    // //relax
    // const stars = props.stars;
    // //tours, cruises
    // const info = props.info;
    // const timetable = props.timetable;
    // const duration = props.duration;

    function GenerateTimetable() {
        return dbData.timetable ? <Timetable timetable={dbData.timetable}/> : '';
    }
    console.log(type)
    useEffect(() => {

        async function get()
        {
            
            const res = await fetch(`${Global.urlServer}/api/${type}?id=${id}`)
            let item = await res.json();
            item = item[0];
            
            setDbData({
            
                    //relax, tours, cruises
                    id: item.id,
                    images: item.images,
                    title: item.title,
                    price: item.price,
                    services: JSON.parse(item.services),
                    text: item.description,
                    address: item.address,
                    points: item.coordinates.split(','),
                    discount: item.discount,
                    countServices: item.count,
                    //relax
                    stars: item.stars || null,
                    pricePerChild: item.pricePerChild || null,
                    typeOfRoom: item.typeOfRoom || null,
                    //tours, cruises
                    info: item.info || null,
                    timetable: item.timetable || null,
                    duration: item.duration || null
                }
            );
                
            
        }
        if (!data)
        {
            get();
        }
    }, [])

    const WrapForPreloader = ({data, type}) =>{

        return (
            <div className={classes.resort}>
                <InfoSection 
                title={data.title + ': ' + data.typeOfRoom} 
                price={data.price} 
                text={data.text}
                images={data.images}
                type={type}
                //
                stars={data.stars}
                duration={data.duration}/>

                <Providers 
                services={data.services} 
                address={data.address}
                type={type}
                //
                info={data.info}
                points={data.points}/>

                {GenerateTimetable()}
            
                <FormBooking 
                title={data.title + ': ' + data.typeOfRoom}
                className={classes.form}
                price={data.price}
                pricePerChild={data.pricePerChild}
                id={data.id}
                discount={data.discount}
                type={type}
                countServices={data.countServices}
                url_callback={Global.url + '/resorts/' + type + '/' + resort + '/' + id}
                />
            </div>
        )

    }
    return (
        <ClientLayout title={dbData !== null ? dbData.title : 'Эллинлайн'} description={dbData !== null ? dbData.text : ''} keywords={dbData !== null ? `${dbData.title}, ${type}` : ''} preloader={!dbData}>
            <WrapForPreloader data={dbData} type={type}/>
        </ClientLayout>
    )
}


Resort.getInitialProps = async ({req, query}) => {

    if (!req)
    {
        return {data: null}
    }

    const type = query.type;
    const id = query.id;
    console.log(Global.urlServer + '/api/' + type + '?id=' + id);
    const res = await fetch(Global.urlServer + '/api/' + type + '?id=' + id);
    let item = await res.json();
    item = item[0];
    console.log(item)
    return {
        data: {
            
            //relax, tours, cruises
            id: item.id,
            images: item.images,
            title: item.title,
            price: item.price,
            services: JSON.parse(item.services),
            text: item.description,
            address: item.address,
            points: item.coordinates.split(','),
            discount: item.discount,
            countServices: item.count,
            //relax
            stars: item.stars || null,
            pricePerChild: item.pricePerChild || null,
            typeOfRoom: item.typeOfRoom || null,
            //tours, cruises
            info: item.info || null,
            timetable: item.timetable || null,
            duration: item.duration || null
        }
    };
}

export default Resort;
