import { useState } from 'react';
import classes from './SelectOption.module.scss';
import SelectEntered from './SelectEntered';
import Image from 'next/image';

const SelectOption = (props) => {
  
    const [selections, setSelections] = useState(1);
    //
    const title = props.title;
    const options = props.options;
    const placeholder = props.placeholder;

    function InsertSelections () {

        function Select(params) {
            return (
                <div className={classes.dynamic_option}>
                    <div className={classes.leftButton} onClick={DeleteSelectOption} aria-hidden="true"><Image id={params.index} layout='fill' src='/images/minus.svg'/></div>
                    <SelectEntered className={props.classSelect} options={options} onChangeFunction={props.onChangeFunction} value={props.values[params.index + 1]}
                    placeholder={placeholder} type='select' arrowSize={props.arrowSize} index={params.index} name={props.name + params.index}/>
                    <div className={classes.rightButton} onClick={AddSelectOption} aria-hidden="true"><Image layout='fill' src='/images/plus.svg'/></div>
                </div>
            )
        }

        // function InsertValues(enable_placeholder_in_select = false) {
        //     const elements = [];
        //     if(enable_placeholder_in_select
        //     && props.placeholder)
        //         elements.push(<option selected hidden>{props.placeholder}</option>);
        //     if(values && values.length != 0)
        //     {
        //         for(let i = 0; i < values.length; i++)
        //         {
        //             if(enable_placeholder_in_select 
        //             || props.placeholder != values[i])
        //                 elements.push(<option>{values[i]}</option>);
        //         }
        //     }
        //     return elements;
        // }

        const elements = [];
        // let dynamic = 
        // {
        //     class: undefined,
        //     buttonLeft: undefined,
        //     buttonRight: undefined
        // };

        // if(props.type === 'dynamic')
        // {
        //     dynamic.class = classes.dynamic_option;
        //     dynamic.buttonLeft = <i className={"fa fa-minus " + classes.leftButton} onClick={(e) => DeleteSelectOption(e)} aria-hidden="true"></i>;
        //     dynamic.buttonRight = <i className={"fa fa-plus " + classes.rightButton} onClick={(e) => AddSelectOption(e)} aria-hidden="true"></i>;
        // }

        // elements.push(<Select/>);
        for(let i = 0; i < selections; i++)
        {
            elements.push(<Select index={i}/>);
        }
        return elements;
    }

    function DeleteSelectOption(e) {
        if(selections > 1)
        {
            setSelections(selections - 1);
            console.log(e.target)
            props.minusFunction(parseInt(e.target.id))
        }
    }

    function AddSelectOption() {
        setSelections(selections + 1);
    }

    return (
        <div className={classes.select_option + ' ' + props.className}>
            {title ? <label className={classes.label}>{title}</label>: ''}
            <InsertSelections/>
        </div>
    )
};

export default SelectOption;
