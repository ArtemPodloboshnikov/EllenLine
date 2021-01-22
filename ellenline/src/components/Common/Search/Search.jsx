import React from 'react';
import classes from './Search.module.css';

function Search(props){

    switch(props.type){

        case 'sanatorium':
            return (
                <div className={classes.sanatorium}>
                    <select className={classes.country}>
                        <option selected hidden>Страна</option>
                        <option>Россия</option>
                        <option>Белоруссия</option>
                    </select>
                    <select className={classes.city}>
                        <option selected hidden style={{color: 'red'}} value="Город">Город</option>
                        <option>Санкт-Петербург</option>
                        <option>Минск</option>
                    </select>
                    <input placeholder='Название' className={classes.sanatorium__input}/>
                    <input type="number" value="1" min="1" max="5" className={classes.stars}/>
                </div>
            )
            break;
    }
    
}

export default Search
