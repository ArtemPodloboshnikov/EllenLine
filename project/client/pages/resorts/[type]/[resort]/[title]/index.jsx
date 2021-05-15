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
    const [roomIndex, setRoomIndex] = useState(0);
    const router = useRouter();
    const type = router.query.type;
    const resort = router.query.resort;
    const title = router.query.title;
    const [mail, setMail] = useState(false);
    const [dialogWindow, setDialogWindow] = useState({style: {display: 'none'}, title: '', text: '', function_on_close: ()=>{}});


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
            const url_callback = Global.url + '/resorts/' + type + '/' + resort + '/' + title;
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
                    id: dbData[roomIndex].id,
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

            const url_callback = Global.url + '/resorts/' + type + '/' + resort + '/' + title;
            console.log(url_callback)
            
            
            if (sendMail == 'OK')
            {
                    
                setDialogWindow({style: {display: 'grid'}, title: 'Письмо отправлено', text: 'Вся информация о заказе пришла к вам на почту (проверьте папку "Спам", если не нашли письма).', function_on_close: ()=>{router.push(url_callback.split('?')[0]);}});
            }

            
           
        
   
            
        
        }
        async function get()
        {
     
      
                const res = await fetch(`${Global.urlServer}/api/${type}?title=${encodeURI(title)}&markdown=true`)
                let items = await res.json();
                // item = item[0];
                console.log(items)
                setDbData(items);
                    
                
            
        }
        
    }, [])

    const WrapForPreloader = ({data, type}) =>{
        console.log(data)
        const url_callback = Global.url + '/resorts/' + type + '/' + resort + '/' + title;
        return (
            <div className={classes.resort}>
                <InfoSection 
                title={data[roomIndex].title}
                typeOfRoom={data[roomIndex].typeOfRoom} 
                price={(data[roomIndex].discount != 0 && data[roomIndex].discount !== undefined) ? mathPriceWithDiscount(data[roomIndex].discount, data[roomIndex].price) : data[roomIndex].price} 
                text={data[roomIndex].description}
                images={data[roomIndex].images}
                type={type}
                payment_term={data[roomIndex].payment_term}
                stars={data[roomIndex].stars}
                duration={data[roomIndex].duration}
                rooms={data}
                setRoomIndex={setRoomIndex}
                />

                <Providers 
                services={JSON.parse(data[roomIndex].services)} 
                address={data[roomIndex].address}
                type={type}
                program={data[roomIndex].program}
                info={data[roomIndex].info}
                points={data[roomIndex].coordinates.split(',')}/>

                {GenerateTimetable()}
            
                <FormBooking 
                title={data[roomIndex].title + ': ' + data[roomIndex].typeOfRoom}
                className={classes.form}
                price={data[roomIndex].price}
                pricePerChild={data[roomIndex].pricePerChild}
                id={data[roomIndex].id}
                date_leave={new Date()}
                discount={data[roomIndex].discount}
                type={type}
                countServices={data[roomIndex].count}
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
            preloader={!dbData}>
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
    const title = query.title;
    console.log(Global.urlServer + '/api/' + type + '?title=' + title);
    const res = await fetch(Global.urlServer + '/api/' + type + '?title=' + encodeURI(title) + '&markdown=true');
    let items = await res.json();
    // item = item[0];
    console.log(items)
    return {
        data: items
    };
}

export default Resort;
