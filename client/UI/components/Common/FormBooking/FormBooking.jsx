import React, { useEffect, useState } from 'react';
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import PromoCode from '../../CustomElements/PromoCode';
import SelectEntered from '../../CustomElements/SelectEntered';
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    const [date_arrival, setDateArrival] = useState();
    const [date_leave, setDateLeave] = useState();

    return(
        <div className={classes.booking + ' ' + props.className}>
            <div className={classes.info_going}>
                <div className={classes.currency}>

                </div>
                <InputDate title='Дата приъезда' className={classes.date1}
                           date={date_arrival}/>
                <InputDate title='Дата отъезда' className={classes.date2}
                           date={date_leave}/>
                <SelectEntered className={classes.parents}
                              options={[ '1 взрослый', '2 взрослый' ]} 
                              placeholder='Взрослые'/>

                <SelectOption className={classes.childs}
                              type='dynamic' 
                              placeholder='Ребёнок'/>
              
                <PromoCode className={classes.code}/>
               
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