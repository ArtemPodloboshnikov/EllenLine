import classes from './Program.module.scss';
import {useState} from 'react';

const Day = (params) => {

    const [rows, setRows] = useState(1);
    let times = [];
    const plusOnTimeClick = (e) => {


    }

    const minusOnTimeClick = (e) => {


    }
    for (let i = 0; i < rows; i++)
    {
        times.push(
  
            <div className={classes.time_wrap}>
                <div className={classes.controls + ' ' + classes.controls_new} onClick={plusOnTimeClick}>+</div>
                <input className={classes.time} placeholder='11:22' pattern='\d{2}:\d{2}' required={true}/>
                <textarea ref={params.register} id={params.id} className={classes.description + ' ' + params.classTextArea} 
                value={params.value[params.id]} onChange={params.onChange} name={params.nameTextArea} 
                placeholder={params.placeholder} name={params.nameTextArea}/>
                <div className={classes.controls + ' ' + classes.controls_new} onClick={minusOnTimeClick}>-</div>
            </div>
      
        )
    }
    return (

        <div className={classes.wrap} style={{gridTemplateRows: `repeat(${rows}, 1fr)`, height: `${rows * params.heightVH}vh`}}>
            <input className={classes.day} value={params.days}/>
            {times}
            <div id={params.id} className={classes.controls + ' ' + classes.plusDay} onClick={params.plusOnDayClick}>+</div>
            <div id={params.id} className={classes.controls + ' ' + classes.minusDay} onClick={params.minusOnDayClick}>-</div>
        </div>
        
    )
}

const Program = (props) => {

    const [days, setDays] = useState([1]);
    const [value, setValue] = useState([[]]);
    const [rows, setRows] = useState(1);

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
                
                plusOnDayClick={()=>{
                    
                    let new_days = [...days];
                    new_days.push(days.length + 1);
                    setDays(new_days);
                    setValue([...value, '']);
                    if (rows < days[days.length - 1])
                    {
                        setRows(rows + 1)
                    }
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
        <div className={props.className + ' ' + classes.program} style={{gridTemplateRows: `repeat(${rows + 1}, 1fr)`, height: `${rows * props.heightVH}vh`}}>
         {programs}   
        </div>
    )
}

export default Program
