import {useState} from 'react'
import classes from './TextArea.module.css'

const TextArea = (props) => {

    let [value, setValue] = useState(props.value);
    if (props.value !== undefined)
    {
        value = props.value;
        setValue = props.setValue;
    }

    const printValue = (e) =>{

        setValue(e.target.value);
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <div className={classes.title + ' ' + props.classTitle}>
                <p>{props.title}</p>
            </div>
            <div className={classes.separate}></div>
            <div className={classes.text}>
                <textarea name={props.name} ref={props.register} className={props.classTextArea} 
                value={value} onChange={printValue} placeholder={props.placeholder}/>
            </div>
        </div>
    )
}

export default TextArea
