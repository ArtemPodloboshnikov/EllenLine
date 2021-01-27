import React, {useState} from 'react';
import classes from './GeneralInfo.module.css';

const GeneralInfo = (props) => {
    const [address, setAddress] = useState(props.address);
    const [languages, setLanguages] = useState(props.languages);
    const [countries, setCountries] = useState(props.countries);
    const [route, setRoute] = useState(props.route);
    const [paid_services,setPaid_Services] = useState(props.paid_services);
    const [additional, setAdditional] = useState(props.additional);
    const [timetable, setTimetable] = useState(props.timetable);

    const GenerateServices = (massiv) => {
        let elements = [];
        if(massiv && massiv.length != 0)
        {
            for(let i = 0; i < massiv.length; i++)
            {
                elements.push(<p>&#128505; {massiv[i]}</p>);
            }
        }
        return elements;
    }

    const GenerateTimetable = () => {
        let elements = [];
        if(timetable && timetable.length != 0)
        {
            for(let i = 0; i < timetable.length; i++)
            {
                let day = timetable[i];
                let schedule = [ <h1>{i + 1} День</h1> ];
                for(let j = 0; j < day.length; j++)
                {
                    let [time, text] = day[j];
                    schedule.push(
                    <>
                        <span>{time}</span>
                        <p>{text}</p>
                    </>);
                }
                elements.push(schedule);
            }
        }
        return elements;
    }

    return (
        <div className={classes.general_info}>
            <h2>Общая информация</h2>
            <div className={classes.info}>
                <i></i>
                <div className={classes.map}>
                </div>
                <i></i>
                <div className={classes.languages}>
                </div>
                <i></i>
                <div className={classes.countries}>
                </div>
                <i></i>
                <div className={classes.route}>
                </div>
            </div>
            <hr/>
            <div className={classes.paid_services}>
                <div className={classes.title}>
                    Оплаченные услуги
                </div>
                <div className={classes.service}>
                    {GenerateServices(paid_services)}
                </div>
            </div>
            <hr/>
            <div className={classes.add_services}>
                <div className={classes.title}>
                    Платные услуги
                </div>
                <div className={classes.service}>
                    {GenerateServices(additional)}
                </div>
            </div>
            <div className={classes.timetable}>
                {GenerateTimetable()}
            </div>
        </div>
        
    );

}

export default GeneralInfo;