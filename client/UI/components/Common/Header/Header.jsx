import classes from './Header.module.css';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UpToHeader from '../UpToHeader/UpToHeader';
import SidebarHeader from './SidebarHeader';
import ReactPlayer from 'react-player'

const Header = (props) => {

    const [treeActive, setTreeActive] = useState('');
    const [scroll, setScroll] = useState(0);


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
                            <Link href='/home'><a className={classes.header__button}>О нас</a></Link>
                            <Link href='/collaboration'><a className={classes.header__button} style={{gridColumn: '2 / 4'}}>Санкт-Петербург</a></Link>
                            <Link href='/home'><a><img src='images/logo.svg'/></a></Link>
                            <Link href='/sanatorium'><a className={classes.header__button}>Туры</a></Link>
                            <Link href='/places'><a className={classes.header__button}>Экскурсии</a></Link>
                            <div><Link href='/relax'><a className={classes.header__button} onMouseOver={showTree} onMouseOut={hideTree}>Отдых</a></Link><div onMouseOver={showTree} onMouseOut={hideTree} id='tree' className={classes.tree + ' ' + treeActive}>
                                <Link href='/relax/sanatorium'><a className={classes.header__treeItem}>Санатории</a></Link>
                                <Link href='/relax/pension'><a className={classes.header__treeItem}>Пансионаты</a></Link>
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
