import React, { useState } from 'react';
import InfoSection from './../CustomElements/InfoSection.jsx';
import FormBooking from './../CustomElements/FormBooking.jsx';
import GeneralInfo from './GeneralInfo.jsx';
import classes from './Tour.module.css';

const Tour = (props) => {
    const [images, setImages] = useState(props.images);
    const [title, setTitle] = useState(props.title);
    const [price, setPrice] = useState(props.price);
    const [text, setText] = useState(props.text);
    const [duration, setDuration] = useState(props.duration ? props.duration : 'Не известно');
    const [index, setIndex] = useState(props.index ? props.index : 0)

    return (
        <div className={classes.tour}>
            <InfoSection images={images} 
                         title={title} 
                         price={price}
                         text={text}
                         duration={duration}/>
            <GeneralInfo timetable={
        [
            //1 day
            [
                [ '06:00 - 7:00', 'Едет в аиропоЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортЕдет в аиропортрт' ],
                [ '12:00 - 17:00', 'Забирите руну' ]
            ],
            //2 day
            [
                [ '06:00 - 7:00', 'Едет в аиропорт' ],
                [ '12:00 - 17:00', 'Забирите руну' ]
            ]
        ]}
        paid_services={['Проживание', 'Питание', 'Транс']}
        additional={['Входные билеты', 'Общественный транспорт', 'Авиа перелет']}
        />
            <FormBooking/>
        </div>
    )
}

export default Tour;