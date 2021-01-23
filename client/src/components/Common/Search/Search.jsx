import React from 'react';
import classes from './Search.module.css';
import InputText from './../../CustomElements/InputText.jsx';
import SelectOption from './../../CustomElements/SelectOption.jsx';
import InputNumber from './../../CustomElements/InputNumber.jsx';

const Search = (props) => {
    return (
        <div className={classes.sanatorium + ' ' + props.className}>
            <SelectOption className={classes.country} 
                          placeholder="Страна" 
                          values={["Бельгия", "Банания"]}/>
            <SelectOption className={classes.city}
                          placeholder="Город"
                          values={["Санкт-Петебург", "Минск"]}/>
            <InputText className={classes.sanatorium__input} placeholder="Название" />
            <InputNumber className={classes.stars} placeholder="Звезды" min="1" max="5"/>
        </div>
    );
    
}

export default Search
