import React, {useState} from 'react'
import classes from './InputNumber.module.css'

const InputNumber = (props) => {
   
    const [value, setValue] = useState(props.value);
    const isNumber = (val) => {
        return !isNaN(val);
    }
    const plus = ()=>{

        let new_value;
        if (isNaN(value)) new_value = props.min;
        else new_value = Number.parseInt(value) + 1;
        console.log(value)
        if (props.max <= new_value)
            new_value = props.max;
        if (props.min >= new_value)
            new_value = props.min;

        setValue(new_value);
    }
    const minus = ()=>{

        let new_value;
        if (isNaN(value)) new_value = props.min;
        else new_value = Number.parseInt(value) - 1;
        if (props.min >= new_value)
             new_value = props.min;
        if (props.max <= new_value)
            new_value = props.max;
        setValue(new_value);
    }
    const printValue = (event)=>{
        
        let enter_text = Number.parseInt(event.target.value);
        if (isNaN(enter_text)) 
        {
            enter_text = undefined; 
            event.target.value = ''
        }
        console.log(event.target.value);
        console.log(value);
        if (enter_text >= props.max)
            enter_text = props.max;
        if (enter_text <= props.min)
            enter_text = props.min;
        setValue(enter_text);
        
    }
    const componentDidMount = ()=>{

        //console.log(input.current.value)
    }
    // console.log(value);
    return (
        <div className={classes.inputNumber + ' ' + props.className}>
            <input name={props.name} ref={props.register} className={classes.input} 
            placeholder={props.placeholder} value={value} onChange={printValue}/>
            <div onClick={plus} className={classes.plus}>+</div>
            <div onClick={minus} className={classes.minus}>-</div>
        </div>
    )
}

export default InputNumber
