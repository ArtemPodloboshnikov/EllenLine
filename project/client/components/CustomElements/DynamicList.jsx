import {useState} from 'react'
import classes from './DynamicList.module.scss'

const CreateInput = (params)=>{
    
    return (
        <div className={classes.wrap}>
            <div id={params.id} onClick={params.minusOnClick} className={classes.controls}>-</div>
            <input name={params.name + params.id}  ref={params.register} id={params.id} 
            className={classes.input + ' ' + params.classInput} value={params.value[params.id]} 
            placeholder={params.placeholder} onChange={params.onChange}/>
            <div onClick={params.plusOnClick} className={classes.controls}>+</div>
        </div>
    )
}

const DynamicList = (props) => {
   
    const [value, setValue] = useState([props.value]);
    const printValue = (e) => {

        let new_value = [...value];
        new_value[Number.parseInt(e.target.id)] =  e.target.value;
        setValue(new_value);
    }

    const [countMemberArray, setCountMemberArray] = useState(1);
    const inputs = [];

    for(let i = 0; i < countMemberArray; i++){

        inputs.push(
            <>
                <CreateInput register={props.register} name={props.name} 
                classInput={props.classInput} id={i} value={value} onChange={printValue} 
                placeholder={props.placeholder} 
                
                plusOnClick={()=>{
                    
                    setCountMemberArray(countMemberArray + 1);
                    setValue([...value, '']);
                    if (props.rows < countMemberArray)
                    {
                        props.setRows(props.rows + 1)
                    }
                }}
                minusOnClick={(e)=>{
                    if (countMemberArray==1)
                    {
                        return;
                    }
                    else 
                    {

                        setCountMemberArray(countMemberArray - 1);
                        let new_array = [...value];
                        //console.log(e.target.id);
                        new_array.splice(e.target.id, 1);
                        let name = document.getElementsByName(props.name + e.target.id);
                        name.value = '';
                        setValue(new_array);
                    }
                }}
                />
            </>
        )

    }
    
    //console.log(value)
    return (
        <div className={classes.inputs + ' ' + props.className}>
            {inputs}

        </div>

    )
}

export default DynamicList;
