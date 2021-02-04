import React, {useEffect, useState} from 'react'
import classes from './InputNumber.module.scss'

const InputNumber = (props) => {

    const [value, setValue] = useState(props.value);

    function CheckValue(e) {
        let new_value = parseInt(e.target.value) + e.target.adjust;
        console.log(new_value);
        if(new_value < props.min)
        {
            setValue(props.min);
        }
        else if(new_value > props.max)
        {
            setValue(props.max);    
        }
        else 
        {
            setValue(new_value);
        }
    }

    function Plus() {
        CheckValue({ target: { value: value, adjust: 1 } });
    }
    
    function Minus() {
        CheckValue({ target: { value: value, adjust: -1 } });
    }

    return (
        // UNCOMMENT IF NEEDED RESTORE, ALSO WAS DELETED CLASS classe.input IN input
        <div className={classes.inputNumber + ' ' + props.className}>
        <input className={classes.input + ' ' + props.classInput}  
               type="number"
               placeholder={props.placeholder} 
               value={value} 
               name={props.name}
               ref={props.register}
               min={props.min} max={props.max} onChange={(e) => CheckValue(e)}/>
             <div onClick={Plus} className={classes.plus}>+</div>
             <div onClick={Minus} className={classes.minus}>-</div>
        </div> 
    )
}

export default InputNumber;
