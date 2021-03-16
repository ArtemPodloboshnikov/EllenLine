import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import mathPriceWithDiscount from '../../../../../functions/MathPriceWithDiscount';
//
import FormBooking from '../../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../../components/Common/InfoSection/InfoSection.jsx';
import Providers from '../../../../../components/Common/Providers/Providers.jsx';
import Timetable from '../../../../../components/Common/Timetable/Timetable.jsx';
import ClientLayout from '../../../../../layouts/ClientLayout.jsx';
import ShowInfo from '../../../../../components/Common/DialogWindow/ShowInfo';
import templateMail from '../../../../../MailTemplates/OrderMail';
//
import Global from '../../../../global.js';
import classes from './index.module.scss';

const Resort = ({data}) => {

    const [dbData, setDbData] = useState(data);
    const router = useRouter();
    const type = router.query.type;
    const resort = router.query.resort;
    const id = router.query.id;
    const url_callback = Global.url + '/resorts/' + type + '/' + resort + '/' + id;
    const [mail, setMail] = useState(false);
    const [dialogWindow, setDialogWindow] = useState({style: {display: 'none'}, title: '', text: '', function_on_close: ()=>{}});

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

        if (router.query.result == 'success' && !mail)
        {
            setMail(true);
            updateOrderAndService();
            
        }
        else
        if (router.query.result == 'fail')
        {
            deleteOrder();
        }
        else
        if (!data)
        {
            get();
        }
        async function deleteOrder()
        {
            const res = await fetch(`${Global.urlServer}/api/orders`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    id: router.query.orderId
                })
            })

            router.push(url_callback.split('?')[0]);
        }
        async function updateOrderAndService()
        {
         
            const res = await fetch(`${Global.urlServer}/api/orders?success=true`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    id: id,
                    id_order: router.query.orderId,
                    payment_id: router.query.payment_id,
                    type: type
                })
            })
            console.log(router)
            const json = await res.json();
            console.log(json)
            get();
            const sendMail = await Email.send({
                Host : "smtp.timeweb.ru",
                Username : "info@ellinline.ru",
                Password : "6ca46WQE",
                To : json[0].email,
                From : "info@ellinline.ru",
                Subject : "Эллинлайн: Информация о вашем заказе",
                Body : templateMail(router.query.payment_id, json[0].title, json[0].client_name, json[0].clients, json[0].price, json[0].date_start, json[0].date_end, json[0].time)
            })
            console.log(url_callback)
            
            
            if (sendMail == 'OK')
            {
                    
                setDialogWindow({style: {display: 'grid'}, title: 'Письмо отправлено', text: 'Вся информация о заказе пришла к вам на почту (проверьте папку "Спам", если не нашли письма).', function_on_close: ()=>{router.push(url_callback.split('?')[0]);}});
            }

            
           
        
   
            
        
        }
        async function get()
        {
     
      
                const res = await fetch(`${Global.urlServer}/api/${type}?id=${id}`)
                let item = await res.json();
                item = item[0];
                console.log(item)
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
        
    }, [])

    const WrapForPreloader = ({data, type}) =>{

        return (
            <div className={classes.resort}>
                <InfoSection 
                title={data.title + ': ' + data.typeOfRoom} 
                price={data.discount != 0 ? mathPriceWithDiscount(data.discount, data.price) : data.price} 
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
                url_callback={url_callback}
                />
                <ShowInfo function_on_close={dialogWindow.function_on_close} setFunction={setDialogWindow} style={dialogWindow.style} title={dialogWindow.title} text={dialogWindow.text} />
            </div>
        )

    }
    return (
        <ClientLayout 
            title={dbData !== null ? dbData.title : 'Эллинлайн'} 
            description={dbData !== null ? dbData.text : ''} 
            keywords={dbData !== null ? `${dbData.title}, ${type}` : ''} 
            preloader={!dbData}
            crumbs={[{href: '/resorts/[type]', as: `/resorts/${type}`, text: Global.GetConvert(type).name}, 
                     {href: '/resorts/[type]/[resort]', as: `/resorts/${type}/${resort}`, text: Global.GetConvert(type)[resort]},
                     {href: '/resorts/[type]/[resort]/[id]', as: `/resorts/${type}/${resort}/${id}`, text: id},]}>
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
