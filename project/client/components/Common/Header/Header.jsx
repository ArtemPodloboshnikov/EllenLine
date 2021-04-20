import classes from './Header.module.scss';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UpToHeader from '../UpToHeader/UpToHeader';
// import SidebarHeader from './SidebarHeader';
import ReactPlayer from 'react-player'
import SearchByName from '../Search/SearchByName';
import Image from 'next/image';
import {useRouter} from 'next/router';

const Header = (props) => {

    const [treeActive, setTreeActive] = useState('');
    const [scroll, setScroll] = useState(0);
    const router = useRouter();
    const route = router.route;

    const handleScroll = () => {
        setScroll(window.scrollY);
        // console.log(scroll);
    };
    const showTree = (e)=>{
       
        let id = '';
        if (e.target.id.split('_')[0] != '')
        {
            id = e.target.id.split('_')[0];
        }
        else
        {
            id = e.target.id;
        }
        document.getElementById(id).classList.add(classes.tree_active);
    }
    const hideTree = (e)=>{

        let id = '';
        if (e.target.id.split('_')[0] != '')
        {
            id = e.target.id.split('_')[0];
        }
        else
        {
            id = e.target.id;
        }
        document.getElementById(id).classList.remove(classes.tree_active);
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
                    <SearchByName className={classes.search__block} classNameSelected={classes.search__selected} 
                        classNameButton={classes.search__button}
                    />
                </div>
                <header className={classes.header} style={(route != '/' && route != '/home')? {height: '30vh', backgroundColor: '#4782e1', clipPath: 'none'} : {}}>
                    {(()=>{

                        if (route == '/' || route == '/home')
                        {
                             
                            return <ReactPlayer url='/videos/videoHeader.mp4' playing={true} loop={true} muted={true} class={classes.header__video} id="bgvideo"/> 
                        }

                    })()}
                    <div className={classes.header__content} style={(route != '/' && route != '/home')?{gridTemplateAreas: "'buttons buttons buttons buttons buttons buttons buttons buttons buttons buttons' '. . . links links links links . . .'", gridTemplateRows: 'repeat(2, 1fr)'}:{}}>
                        <div className={classes.header__buttons}>
                            <Link href='/'><a className={classes.header__button}>О нас</a></Link>
                            <Link href='/resorts/Saint-Petersburg'><a className={classes.header__button} style={{gridColumn: '2 / 4'}}>Санкт-Петербург</a></Link>
                            <div>
                                <Link href='/resorts/tours'><a id='treeTours_button' className={classes.header__button} onMouseOver={showTree} onMouseOut={hideTree}>Туры</a></Link>
                                <div onMouseOver={showTree} onMouseOut={hideTree} id='treeTours' className={classes.treeTours}>
                                    <Link href='/resorts/tours/oneday'><a id='treeTours' className={classes.header__treeItem}>Однодневные</a></Link>
                                    <Link href='/resorts/tours/multiday'><a id='treeTours' className={classes.header__treeItem}>Многодневные</a></Link>
                                </div>
                            </div>
                            <div>
                                <Link href='/resorts/relax'><a id='treeRelax_button' className={classes.header__button} onMouseOver={showTree} onMouseOut={hideTree}>Отдых</a></Link>
                                <div onMouseOver={showTree} onMouseOut={hideTree} id='treeRelax' className={classes.treeRelax}>
                                    <Link href='/resorts/relax/hotels'><a id='treeRelax' className={classes.header__treeItem}>Отели</a></Link>
                                    <Link href='/resorts/relax/pensionats'><a id='treeRelax' className={classes.header__treeItem}>Пансионаты</a></Link>
                                </div>
                            </div>
                            <div>
                                <Link href='/resorts/cruises'><a id='treeСruises_button' className={classes.header__button} onMouseOver={showTree} onMouseOut={hideTree}>Круизы</a></Link>
                                <div onMouseOver={showTree} onMouseOut={hideTree} id='treeСruises' className={classes.treeCruises}>
                                    <Link href='/resorts/cruises/river'><a id='treeСruises' className={classes.header__treeItem}>Речные</a></Link>
                                    <Link href='/resorts/cruises/marine'><a id='treeСruises' className={classes.header__treeItem}>Морские</a></Link>
                                </div>
                            </div>
                            <div>
                                <Link href='/resorts/treatment'><a id='treeTreatment_button' className={classes.header__button} onMouseOver={showTree} onMouseOut={hideTree}>Лечение</a></Link>
                                <div onMouseOver={showTree} onMouseOut={hideTree} id='treeTreatment' className={classes.treeTreatment}>
                                    <Link href='/resorts/treatment/clinics'><a id='treeTreatment' className={classes.header__treeItem}>Клиники</a></Link>
                                    <Link href='/resorts/treatment/sanatoriums'><a id='treeTreatment' className={classes.header__treeItem}>Санатории</a></Link>
                                </div>
                            </div>

                            <Link href='/plane'><a><i class="fas fa-plane"></i></a></Link>
 
                            <label for={classes.search_active}><Image src='/images/Header/loupe.svg' width={50} height={50}/></label>
                        </div>
                        {(()=>{

                            if (route == '/' || route == '/home')
                            {
                                
                                return <Link href='/'><a className={classes.header__logo}><Image width={110} height={110} src='/images/logo.svg'/></a></Link>
                            }

                        })()}
                        <div className={classes.header__phone}><a href='tel:+79219733344' className={classes.header__button}>+7 (921) 973 33 44</a></div>
                        <div className={classes.header__links} style={(route != '/' && route != '/home')?{gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "1fr", justifyItems: 'stretch', justifySelf: 'stretch'}:{}}>
                            <a href='https://vk.com/ellinline' className={classes.header__button}><Image src='/images/vk.svg' width={20} height={20}/></a>
                            <a href='https://www.facebook.com/ООО-Эллинлайн-112305267240823/' className={classes.header__button}><Image src='/images/facebook.svg' width={20} height={20}/></a>
                            <a href='https://www.instagram.com/ellinlinespb/' className={classes.header__button}><Image src='/images/instagram.svg' width={20} height={20}/></a>
                            <a href='/' className={classes.header__button}><Image src='/images/youtube.svg' width={20} height={20}/></a>
                        </div>
                    </div>
                </header>
                
                {/* <SidebarHeader/> */}
                {(()=>{

                    if (scroll > 500){

                        return <UpToHeader scroll={scroll}/>
                    }

                })()}
                                
         
        </div>
    )
}

export default Header
