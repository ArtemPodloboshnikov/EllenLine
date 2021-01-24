import React from 'react'
import classes from './Button.module.css';

const Button = (props) => {

    let type = 'submit';
    if (props.type == 'button')
    {
        type = 'button';
    }
    const onClick = () => {

        let link = document.getElementsByName(props.nameOfLink)[0].value;
        props.setFunction(props.data[link]);
    }
    return (
        
        <div className={classes.wrap + ' ' + props.className}>
            <input onClick={() => {
                
                if (type == 'button') 
                {

                    onClick();
                }
                
            }} className={classes.input + ' ' + props.classInput} 
            value={props.value} type={type}/>
        </div>
        
    )
}

export default Button
