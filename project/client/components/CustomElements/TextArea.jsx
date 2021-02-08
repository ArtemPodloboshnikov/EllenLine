import {useState} from 'react'
import classes from './TextArea.module.scss'

const TextArea = (props) => {
    
    const [value, setValue] = useState(props.value);
    // const [flag, setFlag] = useState(true)
    // if (props.value != '' && props.value !== undefined && flag)
    // {
       
    //     setValue(props.value);
    //     setFlag(false);
    // }

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
            <div className={classes.title + ' ' + props.classTitle}>
                <p>{props.title}</p>
            </div>
            <div className={classes.separate}></div>
            <div className={classes.text}>
                <textarea name={props.name} ref={props.register} className={props.classTextArea} 
                value={value == '' ? props.value : value} onChange={printValue} placeholder={props.placeholder} onBlur={props.onBlur}/>
            </div>
        </div>
    )
}

export default TextArea
