import {useState} from 'react'
import classes from './DynamicList.module.scss'

const CreateInput = (params)=>{
    
    return (
        <div className={classes.wrap}>
            <div id={params.id} onClick={params.minusOnClick} className={classes.controls}>-</div>
            {params.type == 'textarea'? 
                <textarea name={params.name + params.id}  ref={params.register} id={params.id} 
                className={classes.input + ' ' + params.classInput} value={params.value[params.id]} 
                placeholder={params.placeholder} onChange={params.onChange} />
                : 
                <input name={params.name + params.id}  ref={params.register} id={params.id} 
                className={classes.input + ' ' + params.classInput} value={params.value[params.id]} 
                placeholder={params.placeholder} onChange={params.onChange}/>
            }
            
            <div onClick={params.plusOnClick} className={classes.controls}>+</div>
        </div>
    )
}

const DynamicList = (props) => {
   console.log(props.value)
    const [value, setValue] = useState(props.value);
    const printValue = (e) => {

        let new_value = [...value];
        new_value[Number.parseInt(e.target.id)] =  e.target.value;
        setValue(new_value);
    }

    let [countMemberArray, setCountMemberArray] = useState((props.value.length != 0) ? [props.value.length] : [1]);
    const index = props.index || 0;
    if (props.members !== undefined && props.setMembers !== undefined)
    {
        countMemberArray = props.members;
        setCountMemberArray = props.setMembers;
    }

    const inputs = [];

    for(let i = 0; i < countMemberArray[index]; i++){

        inputs.push(
            <>
                <CreateInput register={props.register} name={props.name} 
                classInput={props.classInput} id={i} value={value} onChange={printValue} 
                placeholder={props.placeholder} 
                type={props.type}
                plusOnClick={()=>{
                    
                    let temp_member = [...countMemberArray];
                    temp_member[index]++; 
                    setCountMemberArray(temp_member);
                    setValue([...value, '']);
                    if (props.rows !== undefined)
                    {
                        if (props.rows < temp_member[index])
                        {
                            props.setRows(props.rows + 1)
                        }

                    }
                }}
                minusOnClick={(e)=>{
                    if (countMemberArray[index] == 1)
                    {
                        return;
                    }
                    else 
                    {
                        let temp_member = [...countMemberArray];
                        temp_member[index]--; 
                        if (props.setRows !== undefined)
                        {
                            let max_row = 0;
                            console.log(temp_member)
                        
                            temp_member.map((member)=>{
                                if (max_row < member)
                                {
                                    max_row = member;
                                }

                            })
                            console.log(max_row)
                            props.setRows(max_row);

                        }

                        setCountMemberArray(temp_member);
                        console.log(countMemberArray);
                        let new_array = [...value];
                        new_array.splice(e.target.id, 1);
                        document.getElementsByName(props.name + e.target.id).value = '';
                        setValue(new_array);
                    }
                }}
                />
            </>
        )

    }
    
    //console.log(value)
    return (
        <div className={classes.wrap_label + ' ' + props.classWrap}>
            <label>{props.placeholder !== undefined ? props.placeholder : ''}</label>
            <div className={classes.inputs + ' ' + props.className}>
                {inputs}
            </div>
        </div>
    )
}

export default DynamicList;
