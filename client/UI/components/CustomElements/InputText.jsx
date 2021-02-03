import {useState, useEffect} from 'react'
import classes from './InputText.module.scss'

const InputText = (props) => {
    
    const [value, setValue] = useState(props.value);
    // const [flag, setFlag] = useState();
    // let pastData = props.value;
    // if (flag)
    // {
    //     setValue('');
    //     setFlag(false)
    // }
    // useEffect(()=>{

    //     if (props.value != '')
    //     {
    //         setValue(props.pastData);
    //         pastData = '';
    //         console.log('pastData: ' + pastData)
    //     }       
    // },[])
    
   // const [flag, setFlag] = useState(true);
 
    // if (props.value != '' && props.value !== undefined && props.flag)
    // {
       
    //     setValue(props.value);
    //     props.setFlag(false);     
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
