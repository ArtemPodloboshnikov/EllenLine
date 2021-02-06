import {useState, useEffect} from 'react'
import classes from './InputText.module.scss'

const InputText = (props) => {
    
    const [value, setValue] = useState(props.value);
    
    const printValue = (e) =>{

        if (props.value == e.target.value)
        {
            setValue('')
        }
        else
        {

            setValue(e.target.value == '' ? undefined : e.target.value);
        }
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <input key={props.name} name={props.name} ref={props.register} onBlur={props.onBlur}
            className={classes.input + ' ' + props.classInput} 
            value={value == '' ? props.value : value} onChange={printValue} placeholder={props.placeholder}
            />
        </div>
    )
}

// ALSO WAS DELETED THIS CONTAINER
{/* <div className={classes.wrap + ' ' + props.className}>
</div> */}


export default InputText
