import classes from './Program.module.scss';
import {useState} from 'react';



const Program = (props) => {

    const [days, setDays] = useState([1]);
    const [value, setValue] = useState([[]]);
    const [rows, setRows] = useState(1);
    const [rowsTime, setRowsTime] = useState(1);

    const Day = (params) => {

        let times = [];
        const plusOnTimeClick = (e) => {
    
            setRowsTime(rowsTime + 1)
        }
    
        const minusOnTimeClick = (e) => {
            if (rowsTime > 1)
            setRowsTime(rowsTime - 1)
        }
        for (let i = 0; i < rowsTime; i = i + 1)
        {
            times.push(
      
                <div className={classes.time_wrap}>
                    <div className={classes.controls + ' ' + classes.controls_new} onClick={minusOnTimeClick}>-</div>
                    <input className={classes.time_input} placeholder='11:22' pattern={/\d{2}:\d{2}/} required={true}/>
                    <textarea ref={params.register} id={params.id} className={classes.description + ' ' + params.classTextArea} 
                    value={params.value[params.id]} onChange={params.onChange} name={params.nameTextArea} 
                    placeholder={params.placeholder} name={params.nameTextArea}/>
                    <div className={classes.controls + ' ' + classes.controls_new} onClick={plusOnTimeClick}>+</div>
                </div>
          
            )
        }
        return (
    
            <div className={classes.wrap}>
                <input className={classes.day} value={params.days} disabled={true}/>
                <div className={classes.time} style={{gridTemplateRows: `repeat(${rowsTime}, 1fr)`}}>
                    {times}
                </div>
                <div id={params.id} className={classes.controls + ' ' + classes.minusDay} onClick={params.minusOnDayClick}>-</div>
                <div id={params.id} className={classes.controls + ' ' + classes.plusDay} onClick={params.plusOnDayClick}>+</div>
            </div>
            
        )
    }

    let programs = [];

    const printValue = (e) =>{

        let new_value = [...value];
        let key1 = e.target.id.replace('_')[0];
        let key2 = e.target.id.replace('_')[1];
        new_value[Number.parseInt(key1)][Number.parseInt(key1)] = e.target.value;
        setValue(new_value);
        console.log(value);
    }
    

    

    for (let i = 0; i < days.length; i++)
    {
        programs.push(<Day 
                days={days[i]}
                register={props.register} nameTextArea={props.name} 
                classTextArea={props.classTextArea} id={i} value={value} onChange={printValue} 
                placeholder={props.placeholder} 
                heightVH={props.heightVH / 2}
                plusOnDayClick={()=>{
                    
                    let new_days = [...days];
                    new_days.push(days.length + 1);
                    setDays(new_days);
                    setValue([...value, '']);
                    setRows(rows + 1)
                    // if (rows < days[days.length - 1])
                    // {
                    // }
                }}
                minusOnDayClick={(e)=>{
                    if (days==1)
                    {
                        return;
                    }
                    else 
                    {
                        let new_days = [...days];
                        new_days.pop();
                        setDays(new_days);
                        setRows(rows - 1)
                        let new_array = [...value];
                        //console.log(e.target.id);
                        new_array.splice(e.target.id, 1);
                        let name = document.getElementsByName(props.nameTextArea + e.target.id);
                        name.value = '';
                        setValue(new_array);
                    }
                }}

        />);
    }
    return (
        <div className={props.className + ' ' + classes.program} style={{gridTemplateRows: `repeat(${rows}, 1fr)`, height: `${(rows * props.heightVH) + (props.heightVH * rowsTime)}vh`}}>
         {programs}   
        </div>
    )
}

export default Program
