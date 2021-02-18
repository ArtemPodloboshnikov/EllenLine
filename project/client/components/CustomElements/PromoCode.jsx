import {useState, useEffect} from 'react'
import classes from './PromoCode.module.scss';

const PromoCode = (props) => {

    const [value, setValue] = useState();

    const printValue = (e) => {

        setValue(e.target.value);
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <input className={classes.input + ' ' + props.classInput} name={props.name}
            onChange={printValue} value={value} placeholder='Промокод' ref={props.register}/>
            <input className={classes.ok} value='OK' type='submit'/>
        </div>
    )
}

export default PromoCode
