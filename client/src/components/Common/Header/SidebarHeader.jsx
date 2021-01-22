import React from 'react';
import classes from './SidebarHeader.module.css';
import { Link } from 'react-router-dom';

const SidebarHeader = () => {
    return (
        <aside className={classes.aside}>
            <div className={classes.aside__links}>
                <Link to='/home' className={classes.header__button}><img src='images/logo-header.svg'/></Link>
                <Link to='/trips' className={classes.header__button}><img src='images/suitcase.svg'/></Link>
                <Link to='/places' className={classes.header__button}><img src='images/hotel.svg'/></Link>
                <Link to='/attractions' className={classes.header__button}><img src='images/tower.svg'/></Link>
                <Link to='/collaboration' className={classes.header__button}><img src='images/collaboration.svg'/></Link>
            </div>
        </aside>
    )
}

export default SidebarHeader
