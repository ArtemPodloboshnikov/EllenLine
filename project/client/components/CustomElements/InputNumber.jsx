import {useState} from 'react'
import classes from './InputNumber.module.scss'
import Image from 'next/image';

const InputNumber = (props) => {

    const [value, setValue] = useState(props.value);

    function CheckValue(e) {
       
        let new_value = parseInt(e.target.value);
      
       // if (isNaN(new_value)) new_value = props.min;
        if (e.target.adjust != undefined) new_value += e.target.adjust;
        
        console.log(value)

        if (props.value !== undefined)
        {
            if (props.value == new_value)
            {
                setValue('');
            }
            else
            {
    
                setValue((isNaN(new_value) || new_value == props.min)? undefined : new_value);
            }

        }
        console.log(new_value);
        if (new_value < props.min)
        {
            setValue(props.min);
        }
        else 
        if (new_value > props.max)
        {
            setValue(props.max);    
        }
        else 
        {
            
            setValue(new_value);
        }
    }

    function Plus() {
        CheckValue({ target: { value: (isNaN(value)? props.min : value), adjust: 1 } });
        document.getElementsByName(props.name)[0].focus();
    }
    
    function Minus() {
        CheckValue({ target: { value: (isNaN(value)? props.min : value), adjust: -1 } });
        document.getElementsByName(props.name)[0].focus();
    }
    console.log(value);
    return (
        <div className={classes.wrap + ' ' + props.classWrap}>
            {(()=>{

                if (props.label != 'none')
                {

                    return <label>{(props.title !== undefined)? props.title : (props.placeholder !== undefined ? props.placeholder : '')}</label>
                }

            })()}
            <div className={classes.inputNumber + ' ' + props.className}>
                <input className={classes.input + ' ' + props.classInput}  
                    type="number"
                    placeholder={props.placeholder} 
                    value={value} 
                    name={props.name}
                    ref={props.register}
                    onBlur={props.onBlur}
                    min={props.min} max={props.max} onChange={(e) => CheckValue(e)}/>
                    <div onClick={Plus} className={classes.plus}>+</div>
                    <div onClick={Minus} className={classes.minus}>-</div>
            </div> 

        </div>
    )
}

export default InputNumber;
