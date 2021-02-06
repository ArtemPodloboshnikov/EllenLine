import {useState} from 'react'
import classes from './InputNumber.module.scss'

const InputNumber = (props) => {

    const [value, setValue] = useState(props.value);

    function CheckValue(e) {
        let new_value = parseInt(e.target.value);
        
        if (props.value == new_value)
        {
            setValue('')
        }
        else
        {

            setValue(new_value === NaN ? undefined : new_value);
        }
        if(new_value < props.min)
        {
            setValue(props.min);
        }
        else 
        if(new_value > props.max)
        {
            setValue(props.max);    
        }
        else 
        {
            setValue(new_value);
        }
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
        document.getElementsByName(props.name)[0].focus();
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
        document.getElementsByName(props.name)[0].focus();
    }

    return (
        // UNCOMMENT IF NEEDED RESTORE, ALSO WAS DELETED CLASS classe.input IN input
        <div className={classes.inputNumber + ' ' + props.className}>
        <input className={classes.input + ' ' + props.classInput}  
               type="number"
               placeholder={props.placeholder} 
               value={value == '' ? props.value : value} 
               name={props.name}
               ref={props.register}
               onBlur={props.onBlur}
               min={props.min} max={props.max} onChange={(e) => CheckValue(e)}/>
             <div onClick={plus} className={classes.plus}>+</div>
             <div onClick={minus} className={classes.minus}>-</div>
        </div> 
    )
}

export default InputNumber
