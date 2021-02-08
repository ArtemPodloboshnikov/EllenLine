import React from 'react';
import classes from './Timetable.module.scss';

const Timetable = (props) => {
    const timetable = props.timetable;

    function ConvertDay(massive) {
        const elements = [];
        for(let i = 0; i < massive.length; i++)
        {
            elements.push(<div className={classes.event}>
                <span>{massive[i][0]}</span><p>{massive[i][1]}</p>
            </div>)
        }
        return elements;
    }

    function InsertItems() {
        const elements = [];
        for(let i = 0; i < timetable.length; i++)
        {
            elements.push(<div className={classes.days}>
                <h1>{i + 1} день</h1>
                {ConvertDay(timetable[i])}
            </div>);
        }
        return elements;
    }

    return (
        <div className={classes.time_table}>
            {InsertItems()}
        </div>
    )
}

export default Timetable;