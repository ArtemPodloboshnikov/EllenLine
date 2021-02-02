import React, { useState } from 'react';
import classes from './InputDate.module.scss';

const InputDate = (props) => {
    const [date, setDate] = useState(() => {
        if(!props.date)
        {
            let date = new Date();
            let year = date.getFullYear();
            let mounth = date.getMonth() + 1;
            if(mounth < 10)
                mounth = '0' + mounth;
            let day = date.getDate();
            if(day < 10)
                day = '0' + day;
            return year + '-' + mounth + '-' + day;
        }
        else return props.date;
    });
    const [min, setMin] = useState(props.min);
    const [max, setMax] = useState(props.max);

    function ChangeValue(e) {
        console.log(e);
    }
    
    return (
        <div className={classes.date}>
            <label>{props.title}</label>
            <input className={props.className}
                   type="date" 
                   value={date} 
                   min={min}
                   max={max}
                   onChange={(e) => ChangeValue(e)}/>
        </div>
    )
}

export default InputDate;