import React from 'react';
import classes from './Search.module.css';

function Search(props){

    switch(props.type){

        case 'sanatorium':
            return (
                <div className={classes.sanatorium}>
                    <input placeholder='Введите название санатория' className={classes.sanatorium__input} />
                </div>
            )
            break;
    }
    
}

export default Search
