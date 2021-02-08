import {useState, useEffect} from 'react'
import classes from './PromoCode.module.scss';

const PromoCode = (props) => {

    const [value, setValue] = useState();

    const printValue = (e) => {

        setValue(e.target.value);
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <input className={classes.input + ' ' + props.classInput} 
            onChange={printValue} value={value} placeholder='Промокод'/>
            <div className={classes.ok}>OK</div>
        </div>
    )
}

export default PromoCode
