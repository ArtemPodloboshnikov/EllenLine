import React, {useState} from 'react'
import classes from './InputText.module.css'

const InputText = (props) => {

    const [value, setValue] = useState(props.value);
    const printValue = (e) =>{

        setValue(e.target.value);
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <input className={classes.input + ' ' + props.classInput} value={value} onChange={printValue}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default InputText
