import React, { useState } from 'react';
import classes from './SelectOption.module.css';

const SelectOption = (props) => {
    const [values, setValues] = useState(props.values);

    function InsertValues() {
        const elements = [];
        if(values && values.length != 0)
        {
            if(props.placeholder)
                elements.push(<option selected hidden>{props.placeholder}</option>);
            for(let i = 0; i < values.length; i++)
            {
                elements.push(<option>{values[i]}</option>);
            }
        }
        return elements;
    }

    return (
        <select className={props.className}>
            {InsertValues()}
        </select>
    )
};

export default SelectOption;


{/* <option selected hidden>Страна</option>
<option>Россия</option>
<option>Белоруссия</option> */}