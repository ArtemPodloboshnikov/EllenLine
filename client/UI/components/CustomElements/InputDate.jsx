import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        document.getElementById('date').value = date;
    });
    
    return (
        <div className={classes.date + ' ' + props.className}>
            <label>{props.title}</label>
            <input type="date"
                   id="date" 
                   min={min}
                   max={max}/>
        </div>
    )
}

export default InputDate;