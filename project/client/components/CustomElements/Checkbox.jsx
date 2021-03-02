import React from 'react'
import classes from './Checkbox.module.scss';

const Checkbox = (props) => {
    return (
        <div className={classes.wrap}>
            <input id={props.id} className={classes.checkbox} type='checkbox' 
            name={props.name} value={props.value} onInput={props.onInput}/>
            <label for={props.id}>{props.text}</label>
        </div>
    )
}

export default Checkbox
