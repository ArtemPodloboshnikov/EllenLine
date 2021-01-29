import React, { useState } from 'react';
import classes from './SelectOption.module.scss';

const SelectOption = (props) => {
    const [values, setValues] = useState(props.values);
    const [placeholder, setPlaceholder] = useState(props.placeholder);
    //
    let buttons = [];
    if(props.type === 'dynamic')
        buttons = 
        [
            <i class="fa fa-minus-square" onClick={(e) => DeleteSelectOption(e)} aria-hidden="true"></i>,
            <i class="fa fa-plus-square" onClick={(e) => AddSelectOption(e)} aria-hidden="true"></i>
        ];
    let element =
    <div className={props.type === 'dynamic' ? classes.dynamic_option : ''}>
        {buttons[0]}
        <select className={props.className}>
            {InsertValues()}
        </select>
        {buttons[1]}
    </div>;
    //
    const [selections, setSelections] = useState(1);

    function InsertValues() {
        const elements = [];
        if(props.placeholder)
            elements.push(<option selected hidden>{placeholder}</option>);
        if(values && values.length != 0)
        {
            for(let i = 0; i < values.length; i++)
            {
                elements.push(<option>{values[i]}</option>);
            }
        }
        return elements;
    }

    function InsertSelections () {
        const elements = [];
        for(let i = 0; i < selections; i++)
        {
            elements.push(element);
        }
        return elements;
    }

    function DeleteSelectOption (e) {
        if(selections > 1)
            setSelections(index => index - 1);
    }

    function AddSelectOption(e) {
        setSelections(index => index + 1);
    }

    return (
        <div className={classes.select_option + ' ' + props.selection}>
            {InsertSelections()}
        </div>
    )
};

export default SelectOption;
