import React, { useState } from 'react';
import Link from 'next/link';
//
import classes from './AsideHeader.module.scss';

const AsideHeader = (props) => {
    const [expand, setExpand] = useState(props.expand);

    function onClickExpandMenu(e) {
        setExpand(!expand ? classes.active : undefined);
    }

    function onClickExpandSubmenu(e) {
        let arrow = e.currentTarget;
        arrow.closest('div').classList
        .toggle(classes.active);
    }

    return(
        <div className={classes.back + ' ' + props.className}>
            <aside className={classes.aside + ' ' + expand}>
                <img src='/images/logo.svg'/>
                <div className={classes.menu}>
                    <Link href='/home'>
                        <p className={classes.option}>О нас</p>
                    </Link>
                    <div className={classes.root}>
                        <i class="fa fa-arrow-down" onClick={onClickExpandSubmenu} aria-hidden="true"></i>
                        <Link href='/resorts/tours'>
                            <p>Туры</p>
                        </Link>
                        <div className={classes.submenu}>
                            <Link href='/resorts/tours/oneday'>
                                <p>Однодневные</p>
                            </Link>
                            <Link href='/resorts/tours/multiday'>
                                <p>Многодневные</p>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.root}>
                        <i class="fa fa-arrow-down" onClick={onClickExpandSubmenu} aria-hidden="true"></i>
                        <Link href='/resorts/relax'>
                            <p>Отдых</p>
                        </Link>
                        <div className={classes.submenu}>
                            <Link href='/resorts/relax/sanatoriums'>
                                <p>Санатории</p>
                            </Link>
                            <Link href='/resorts/relax/pensionats'>
                                <p>Пансионаты</p>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.root}>
                        <i class="fa fa-arrow-down" onClick={onClickExpandSubmenu} aria-hidden="true"></i>
                        <Link href='/resorts/cruises'>
                                <p>Круизы</p>
                        </Link>
                        <div className={classes.submenu}>
                            <Link href='/resorts/cruises/river'>
                                <p>Речные</p>
                            </Link>
                            <Link href='/resorts/cruises/marine'>
                                <p>Морские</p>
                            </Link>
                        </div>
                    </div>
                    <Link href='/spb'>
                        <p className={classes.option}>Санкт-Петербург</p>
                    </Link>
                </div>
                <i class="fa fa-arrow-right" onClick={onClickExpandMenu} aria-hidden="true"></i>
            </aside>
        </div>
    )
}

export default AsideHeader;