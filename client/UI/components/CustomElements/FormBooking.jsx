import React, { useEffect, useState } from 'react';
import SelectOption from './SelectOption.jsx';
import InputText from './InputText.jsx';
import InputDate from './InputDate.jsx';
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    const [date_arrival, setDateArrival] = useState();
    const [date_leave, setDateLeave] = useState();

    return(
        <div className={classes.booking + ' ' + props.className}>
            <div className={classes.info_going}>
                <InputDate title='Дата приъезда'
                           date={date_arrival}/>
                <InputDate title='Дата отъезда'
                           date={date_leave}/>
                <SelectOption className={classes.parents}
                              values={[ '1 взрослый', '2 взрослый' ]} 
                              placeholder='Взрослые'/>
                <SelectOption className={classes.childs}
                              type='dynamic' 
                              placeholder='Ребёнок'/>
                <div className={classes.code}>
                    <InputText placeholder='Промокод'/>
                    <button>Применить</button>
                </div>
                <div className={classes.price}>
                    <span>Итого</span>
                    <h1>3200 руб.</h1>
                </div>
            </div>
            <div className={classes.info_person}>
                
            </div>
        </div>
    )
}

export default FormBooking;