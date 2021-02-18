import classes from './Button.module.scss';

const Button = (props) => {

    let type = props.type || 'submit';

    return (
        
        <div className={classes.wrap + ' ' + props.className}>

            {(()=>{
                
                if (typeof props.value !== 'string')
                {
                    return (

                        <button type={type}>
                            {props.value}
                        </button>
                    )
                }
                else
                {
                    return (

                        <input onClick={() => {
                
                            if (props.onClick !== undefined) 
                            {

                                props.onClick();
                            }
                            
                        }} className={classes.input + ' ' + props.classInput} disabled={props.disabled? true: false}
                        value={props.value} type={type} name={props.name} ref={props.register}/>
                    )
                }
            })()}
            
        </div>
        
    )
}

export default Button
