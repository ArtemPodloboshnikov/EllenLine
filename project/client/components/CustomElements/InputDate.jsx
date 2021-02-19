import React, { useState } from 'react';
import dateParser from '../../functions/DateParser';
import classes from './InputDate.module.scss';

const InputDate = (props) => {
    const [date, setDate] = useState(() => {
        if(!props.date)
        {
            let date = new Date();
            dateParser(date.toString(), true);
        }
        else return props.date;
    });

    const printValue = (e) =>{

        setDate(e.target.value);
        if (props.onChange !== undefined)
        {
            props.onChange(e.target.value);
        }
    }
    
    return (
        <div className={classes.date + ' ' + props.className}>
            <label>{props.title}</label>
            <input type="date"
                   name={props.name}
                   id="date" 
                   min={props.min}
                   max={props.max}
                   value={date}
                   onChange={printValue}
                   className={props.classInput}
                   />
        </div>
    )
}

export default InputDate;