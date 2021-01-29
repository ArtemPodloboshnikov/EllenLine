import {useState} from 'react'
import classes from './InputText.module.scss'

const InputText = (props) => {

    const [value, setValue] = useState(props.value);
    const printValue = (e) =>{
        setValue(e.target.value);
    }
    return (
        // WAS DELETED CLASS class.input in input
        <input className={classes.input + ' ' + props.className} value={value} onChange={printValue}
            placeholder={props.placeholder}
        />
    )
}

// ALSO WAS DELETED THIS CONTAINER
{/* <div className={classes.wrap + ' ' + props.className}>
</div> */}


export default InputText
