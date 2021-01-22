import React, {useState} from 'react'
import classes from './TextArea.module.css'

const TextArea = (props) => {

    const [value, setValue] = useState(props.value);
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
                <textarea className={props.classTextArea} value={value} onChange={printValue} placeholder={props.placeholder}/>
            </div>
        </div>
    )
}

export default TextArea
