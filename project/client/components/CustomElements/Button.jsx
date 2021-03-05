import classes from './Button.module.scss';

const Button = (props) => {

    let type = 'submit';
    if (props.type == 'button')
    {
        type = props.type;
    }
    const onClick = () => {

        let link = document.getElementsByName(props.nameOfLink)[0].value;
        props.setFunction(props.data[link]);
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
                
                            if (type == 'button') 
                            {

                                onClick();
                            }
                            
                        }} className={classes.input + ' ' + props.classInput} 
                        value={props.value} type={type}/>
                    )
                }
            })()}
            
        </div>
        
    )
}

export default Button
