import classes from './Button.module.scss';

const Button = (props) => {

    let type = 'submit';
    if (props.type == 'button')
    {
        type = props.type;
    }
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
                            
                        }} className={classes.input + ' ' + props.classInput} 
                        value={props.value} type={type} name={props.name} ref={props.register}/>
                    )
                }
            })()}
            
        </div>
        
    )
}

export default Button
