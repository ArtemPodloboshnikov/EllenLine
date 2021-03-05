import React from 'react';
import classes from './SearchRelax.module.scss';
import InputText from '../../CustomElements/InputText.jsx';
import SelectEntered from '../../CustomElements/SelectEntered.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import PriceCompare from '../../CustomElements/PriceCompare';

const Search = (props) => {
    return (
        <div className={classes.sanatorium + ' ' + props.className}>
            <InputText className={classes.input} placeholder="Название" />
           
            <SelectEntered className={classes.country} 
                          placeholder="Страна" 
                          options={["Бельгия", "Банания"]}/>

            <SelectEntered className={classes.city}
                          placeholder="Город"
                          options={["Санкт-Петебург", "Минск"]}/>

            <InputNumber className={classes.stars} placeholder="★" min="1" max="5"/>

            <PriceCompare className={classes.price} min='1' placeholder='Цена'/>
        </div>
    );
    
}

export default Search
