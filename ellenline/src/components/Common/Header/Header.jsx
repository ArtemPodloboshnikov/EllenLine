import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player';
import MediaQuery from 'react-responsive';
import SidebarHeader from './SidebarHeader';

const Header = () => {
    return (
        <div>
          
                <header className={classes.header}>
                    <ReactPlayer url='videos/videoHeader.mp4' playing={true} loop={true} muted={true} class={classes.header__video} id="bgvideo"/> 
                    <div className={classes.header__content}>
                        <div className={classes.header__buttons}>
                            <Link to='/' className={classes.header__button}>О нас</Link>
                            <Link to='/collaboration' className={classes.header__button}>Сотрудничество</Link>
                            <Link to='/vacancy' className={classes.header__button}>Вакансии</Link>
                            <Link to='/' className={classes.header__button}><img src='images/logo-header.svg'/></Link>
                            <Link to='/sanatorium' className={classes.header__button}>Санатории</Link>
                            <Link to='/places' className={classes.header__button}>Места</Link>
                            <Link to='/trips' className={classes.header__button}>Поездки</Link>
                        </div>
                        <div className={classes.header__links}>
                            <a href='https://vk.com/ellinline' className={classes.header__button}><img src='images/vk.svg'/></a>
                            <a href='https://www.facebook.com/ООО-Эллинлайн-112305267240823/' className={classes.header__button}><img src='images/facebook.svg'/></a>
                            <a href='https://www.instagram.com/ellinlinespb/' className={classes.header__button}><img src='images/instagram.svg'/></a>
                            <a href='/home' className={classes.header__button}><img src='images/youtube.svg'/></a>
                        </div>
                    </div>
                </header>
                <SidebarHeader/>
           
         
        </div>
    )
}

export default Header
