import React from 'react';
import Search from '../Common/Search/Search';
import List from './List';
import classes from './Sanatorium.module.css';

const Sanatorium = () => {
    return (
        <div className={classes.sanatorium}>
            
            <Search type='sanatorium' />
            <List/>
        </div>
    )
}

export default Sanatorium
