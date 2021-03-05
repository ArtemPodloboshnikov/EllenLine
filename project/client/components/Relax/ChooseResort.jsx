import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import SearchRelax from '../Common/Search/SearchRelax.jsx';
import List from './List.jsx';
import classes from './ChooseResort.module.css';

const ChooseResort = () => {
    return(
        <div className={classes.resort}>
            <SearchRelax className={classes.search}/>
            <div className={classes.choose}>
                <div className={classes.pansionat}><NavLink to='/relax/pansionats'><h1>Пансионаты</h1></NavLink></div>
                <div className={classes.sanatorium}><NavLink to='/relax/sanatoriums'><h1>Санатории</h1></NavLink></div>
            </div>
            <div className={classes.rest}>
                <Route exact path='/relax/:category/' component={List}/>
            </div>
        </div>
    )

}

export default ChooseResort;