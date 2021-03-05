import { useState } from 'react';
import classes from './SelectOption.module.scss';

const SelectOption = (props) => {
    const [values, setValues] = useState(props.values);
    const [selections, setSelections] = useState(0);
    //
    const title = props.title;

    function InsertSelections () {

        function ConvertToElement(element) {
            return <div className={dynamic.class}>
                {dynamic.buttonLeft}
                <select className={props.classSelect}>
                    {element}
                </select>
                {dynamic.buttonRight}
            </div>
        }

        function InsertValues(enable_placeholder_in_select = false) {
            const elements = [];
            if(enable_placeholder_in_select
            && props.placeholder)
                elements.push(<option selected hidden>{props.placeholder}</option>);
            if(values && values.length != 0)
            {
                for(let i = 0; i < values.length; i++)
                {
                    if(enable_placeholder_in_select 
                    || props.placeholder != values[i])
                        elements.push(<option>{values[i]}</option>);
                }
            }
            return elements;
        }

        const elements = [];
        let dynamic = 
        {
            class: undefined,
            buttonLeft: undefined,
            buttonRight: undefined
        };

        if(props.type === 'dynamic')
        {
            dynamic.class = classes.dynamic_option;
            dynamic.buttonLeft = <i className={"fa fa-minus " + classes.leftButton} onClick={(e) => DeleteSelectOption(e)} aria-hidden="true"></i>;
            dynamic.buttonRight = <i className={"fa fa-plus " + classes.rightButton} onClick={(e) => AddSelectOption(e)} aria-hidden="true"></i>;
        }

        elements.push(ConvertToElement(InsertValues(true)));
        for(let i = 0; i < selections; i++)
        {
            elements.push(ConvertToElement(InsertValues()));
        }
        return elements;
    }

    function DeleteSelectOption (e) {
        if(selections > 0)
            setSelections(index => index - 1);
    }

    function AddSelectOption(e) {
        setSelections(index => index + 1);
    }

    return (
        <div className={classes.select_option + ' ' + props.className}>
            {title ? <label>{title}</label>: ''}
            {InsertSelections()}
        </div>
    )
};

export default SelectOption;
