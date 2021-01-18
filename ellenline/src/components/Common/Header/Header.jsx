import React, {useState, useEffect} from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player';
import UpToHeader from '../UpToHeader/UpToHeader';
import SidebarHeader from './SidebarHeader';

const Header = (props) => {

    const [treeActive, setTreeActive] = useState('');
    const [scroll, setScroll] = React.useState(0);


    const handleScroll = () => {
        setScroll(window.scrollY);
        // console.log(scroll);
    };
    const showTree = ()=>{
       
        setTreeActive(classes.tree_active);
    }
    const hideTree = ()=>{

        setTreeActive('');
    }

    useEffect(()=>{

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);
    return (
        <div style={(()=>{

            // if (Object.key(props.employee).length != 0)
            //     return {display: 'none'}
            

        })()}>
            
                <input name='search_toggle' type='radio' id={classes.search_active}/>
                <input name='search_toggle' type='radio' id={classes.search_close}/>
                <div className={classes.search}>
                    <label for={classes.search_close} className={classes.search__close}></label>
                </div>
                <header className={classes.header}>
                    <ReactPlayer url='videos/videoHeader.mp4' playing={true} loop={true} muted={true} class={classes.header__video} id="bgvideo"/> 
                    <div className={classes.header__content}>
                        <div className={classes.header__buttons}>
                            <Link to='/' className={classes.header__button}>О нас</Link>
                            <Link style={{gridColumn: '2 / 4'}} to='/collaboration' className={classes.header__button}>Санкт-Петербург</Link>
                            <Link to='/'><img src='images/logo-header.svg'/></Link>
                            <Link to='/sanatorium' className={classes.header__button}>Туры</Link>
                            <Link to='/places' className={classes.header__button}>Экскурсии</Link>
                            <div><Link to='/relax' className={classes.header__button} onMouseOver={showTree} onMouseOut={hideTree}>Отдых</Link><div onMouseOver={showTree} onMouseOut={hideTree} id='tree' className={classes.tree + ' ' + treeActive}>
                                <Link className={classes.header__treeItem} to='/relax/sanatorium'>Санатории</Link>
                                <Link className={classes.header__treeItem} to='/relax/pension'>Пансионаты</Link>
                            </div></div>
                            <label for={classes.search_active}><img src='images/Header/loupe.svg' /></label>
                        </div>
                        <div className={classes.header__phone}><a href='tel:+79219733344' className={classes.header__button}>+7 (921) 973 33 44</a></div>
                        <div className={classes.header__links}>
                            <a href='https://vk.com/ellinline' className={classes.header__button}><img src='images/vk.svg'/></a>
                            <a href='https://www.facebook.com/ООО-Эллинлайн-112305267240823/' className={classes.header__button}><img src='images/facebook.svg'/></a>
                            <a href='https://www.instagram.com/ellinlinespb/' className={classes.header__button}><img src='images/instagram.svg'/></a>
                            <a href='/home' className={classes.header__button}><img src='images/youtube.svg'/></a>
                        </div>
                    </div>
                </header>
                
                <SidebarHeader/>
                {(()=>{

                    if (scroll > 500){

                        return <UpToHeader scroll={scroll}/>
                    }

                })()}
                
         
        </div>
    )
}

export default Header
