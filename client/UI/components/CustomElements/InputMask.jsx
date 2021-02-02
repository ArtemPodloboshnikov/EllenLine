import React, { useState } from 'react';
import classes from './InputMask.module.scss';

const InputMask = (props) => {
    const mask = useState(props.mask);

    function OnChange(e) {
        console.log(e)
    }

    return (
        <div className={classes.mask + ' ' + props.className}>
            <input
                onChange={(e) => OnChange(e)}
                placeholder={mask}
            />
        </div>
    )
}

export default InputMask;