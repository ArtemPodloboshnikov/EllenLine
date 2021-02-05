import React, { useEffect, useState } from 'react';
//
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import PromoCode from '../../CustomElements/PromoCode';
import SelectEntered from '../../CustomElements/SelectEntered';
import InputMask from '../../CustomElements/InputMask.jsx';
import Button from '../../CustomElements/Button.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
//
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    const [date_arrival, setDateArrival] = useState(props.date_arrival);
    const [date_leave, setDateLeave] = useState(props.date_leave);
    const price = props.price;
    //
    const type = props.type;

    function GenerateInfoGoing() {
        let sections = 
        { 
            title_date: undefined, // title first date
            date_or_time: undefined, 
            room_or_tickets: undefined,
            price_behavior: undefined
        };
        switch(type)
        {
            case 'relax':
            case 'cruises':
                sections.title_date = 'Дата заезда';
                sections.date_or_time = 
                <InputDate className={classes.date}
                        title='Дата отъезда'
                        date={date_leave}/>;
                //LATE CHAINGE TO SELECT ENTERED
                sections.room_or_tickets = <>
                    <SelectOption className={classes.parents}
                                values={[ '1 взрослый', '2 взрослый' ]} 
                                placeholder='Взрослые'/>
                    <SelectOption className={classes.childs}
                                type='dynamic' 
                                values={[ 'Волк одиночка', 'Ребёнок', 'Питомец' ]}
                                placeholder='Волк одиночка'/>
                </>;
                break;
            case 'tours':
                sections.title_date = 'Выберите дату';
                //LATE CHAINGE TO SELECT ENTERED
                sections.date_or_time = 
                <SelectOption
                className={classes.time}
                title='Выберите время'
                values={[ '10:00', '12:50', '18:00' ]}/>
                //
                sections.room_or_tickets = 
                <InputNumber className={classes.tickets}
                value='1' min='1' max='10'/>
                //
                sections.price_behavior = classes.tours;
                break;
            default:
                console.log(type + ' type don`t support');
                return 'ERROR TYPE: ' + type + ' NOT SUPPORTED';
        }

        return <div className={classes.info_going}>
            <InputDate className={classes.date}
                    title={sections.title_date}
                    date={date_arrival}/>
            {sections.date_or_time}
            {/* ROW */}
            {sections.room_or_tickets}
            {/* ROW */}
            <PromoCode className={classes.code}/>
            <div className={classes.price + ' ' + sections.price_behavior}>
                <span>Итого</span>
                <h1>{price} руб.</h1>
            </div>
        </div>;
    }

    return(
        <div className={classes.booking + ' ' + props.className}>
             {/* SEPARATOR */}
            {GenerateInfoGoing()}
            {/* SEPARATOR */}
            <div className={classes.info_person}>
                <InputText className={classes.fio} placeholder='Имя и фамилия'/>
                <InputText className={classes.e_mail} placeholder='E-mail'/>
                <InputText className={classes.telephone} placeholder='Телефон'/>
                <Button className={classes.button} value='Забронировать'/>
                <p>
                    Здесь какой-то очень важный <span>текст</span>
                </p>
            </div>
        </div>
    )
}

export default FormBooking;