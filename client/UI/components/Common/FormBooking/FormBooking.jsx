import React, { useEffect, useState } from 'react';
//
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
//
import classes from './FormBooking.module.scss';
import InputMask from '../../CustomElements/InputMask.jsx';
import Button from '../../CustomElements/Button.jsx';

const FormBooking = (props) => {
    const [date_arrival, setDateArrival] = useState();
    const [date_leave, setDateLeave] = useState();

    return(
        <div className={classes.booking + ' ' + props.className}>
            <div className={classes.info_going}>
                <InputDate className={classes.date}
                           title='Дата приъезда'
                           date={date_arrival}/>
                <InputDate className={classes.date}
                           title='Дата отъезда'
                           date={date_leave}/>
                <SelectOption className={classes.parents}
                              values={[ '1 взрослый', '2 взрослый' ]} 
                              placeholder='Взрослые'/>
                <SelectOption className={classes.childs}
                              type='dynamic' 
                              placeholder='Ребёнок'/>
                <div className={classes.code}>
                    <InputText placeholder='Промокод'/>
                    <Button value='Применить'/>
                </div>
                <div className={classes.price}>
                    <span>Итого</span>
                    <h1>3200 руб.</h1>
                </div>
            </div>
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