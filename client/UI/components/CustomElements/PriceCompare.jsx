import classes from './InputNumber.module.scss'
import this_classes from './PriceCompare.module.scss'
import {useState} from 'react';

const PriceCompare = (props) => {
    const [value, setValue] = useState(props.value ? props.value : NaN);

    function CheckValue(e) {
        let new_value = parseInt(e.target.value);
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


    return (
        <div className={classes.inputNumber + ' ' + this_classes.inputPrice +  ' ' + props.className}>
        <input className={classes.input + ' ' + props.classInput}  
               type="number"
               placeholder={props.placeholder} 
               value={value} 
               min={props.min} max={props.max} onChange={(e) => CheckValue(e)}/>
             <div className={this_classes.more}>{'>'}</div>
             <div className={this_classes.equally}>=</div>
             <div className={this_classes.less}>{'<'}</div>
        </div> 
    )
}

export default PriceCompare
