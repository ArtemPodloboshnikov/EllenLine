import classes from './Header.module.scss';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UpToHeader from '../UpToHeader/UpToHeader';
// import SidebarHeader from './SidebarHeader';
import SearchByName from '../Search/SearchByName';
import {useRouter} from 'next/router';
import List from '../../Common/List/List';
import Global from '../../../pages/global';

const Header = (props) => {

    const [treeActive, setTreeActive] = useState('');
    const [scroll, setScroll] = useState(0);
    const [dbData, setDbData] = useState();
    const [searchWord, setSearchWord] = useState('');
    const router = useRouter();
    const route = router.route;

    const handleOnSubmit = (data)=>{
        
        console.log(data)
        async function get()
        {
            const res = await fetch(Global.urlServer + '/api/search?title=' + encodeURI(data.search_text));
            const json = await res.json();
            setDbData(json);
            setSearchWord('');
        }

        if (data.search_text != '')
        {
            get();
        }
    }
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

    useEffect(()=>{

        

    }, [searchWord]);

    return (
        <div>
            
                <input name='search_toggle' type='radio' id={classes.search_active}/>
                <input name='search_toggle' type='radio' id={classes.search_close}/>
                <div className={classes.search}>
                    <label for={classes.search_close} className={classes.search__close}></label>
                    <SearchByName 
                        className={classes.search__block} 
                        classNameSelected={classes.search__selected} 
                        classNameButton={classes.search__button}
                        handleOnSubmit={handleOnSubmit}
                    />
                    <div className={classes.search__result}>
                        <List items={dbData} conditions={[]} type=''/> 
                    </div>
                </div>
                <header className={classes.header}>
                    <div className={classes.header__content}>

                        <Link href='/'><a className={classes.header__logo}><svg width="136" height="119" viewBox="0 0 136 119" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M68 10.0001H32.3707L6 43.7214L68 112.5L130 43.7214L103.547 10.0001H68Z" stroke="white" stroke-width="8" stroke-miterlimit="10"/>
<path d="M68 13.5001H35.244L11 43.4882L68 107.5L125 43.4882L100.68 13.5001H68Z" stroke="#EEF7FE" stroke-width="8" stroke-miterlimit="10"/>
<path d="M38.629 56.8025L38.788 55.9545L43.293 53.7815L48.381 24.8435L44.618 22.6705L44.777 21.8225H70.588L68.945 30.9915H68.15L65.818 24.5785H54.9L52.621 37.4575H60.2L63.857 32.8995H64.705L62.638 44.5065H61.79L59.776 40.0015H52.144L49.653 54.0465H62.32L67.249 46.3085H68.097L66.242 56.8025H38.629Z" fill="white"/>
<path d="M66.629 69.5001L66.788 68.6521L71.293 66.4791L76.381 37.5411L72.618 35.3681L72.777 34.5201H87.988L87.829 35.3681L82.847 37.5411L77.706 66.7441H88.465L94.083 57.2041H94.931L92.705 69.5001H66.629Z" fill="white"/>
<path d="M46.4414 80.9792H90.1606" stroke="#EEF7FE" stroke-width="8" stroke-miterlimit="10"/>
<path d="M98.2341 41.0278C100.295 41.0278 101.966 39.352 101.966 37.2847C101.966 35.2175 100.295 33.5417 98.2341 33.5417C96.1729 33.5417 94.502 35.2175 94.502 37.2847C94.502 39.352 96.1729 41.0278 98.2341 41.0278Z" stroke="white" stroke-width="3" stroke-miterlimit="10"/>
</svg>
</a></Link>
                        <div className={classes.header__date}><span>Туроператор с 1993 г.</span><br/><span>Эллинлайн</span></div>
                        <div className={classes.header__tel}>
                            <a href="tel:79219733344"><i class="fab fa-whatsapp"></i> +7 921 973 33 44</a>
                            <a href="mailto:7840054@mail.ru"><i class="far fa-envelope"></i> 7840054@mail.ru</a>
                            <a href="tel:8127835170"><i class="fas fa-phone"></i> (812) 783 51 70</a>
                            <a href="tel:8127840471"><i class="fas fa-phone"></i> (812) 784 04 71</a>
                        </div>
              
                        <div className={classes.header__phone}><a href='tel:+79219733344' className={classes.header__button}>+7 (921) 973 33 44</a></div>
                        <div className={classes.header__links}>
                            <a href='https://vk.com/ellinline' className={classes.header__button}><svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.546 13.2367H12.9201C12.9201 13.2367 13.3354 13.1911 13.5466 12.9618C13.7423 12.753 13.7362 12.3618 13.7362 12.3618C13.7362 12.3618 13.7086 10.5171 14.5644 10.2459C15.4201 9.97465 16.4918 12.0281 17.6404 12.8166C18.5081 13.4167 19.1682 13.2823 19.1682 13.2823L22.2382 13.2391C22.2382 13.2391 23.844 13.1395 23.0783 11.8769C23.0159 11.7737 22.6342 10.9432 20.798 9.23655C18.8777 7.45071 19.131 7.73875 21.4509 4.64834C22.8599 2.76169 23.4287 1.61554 23.2523 1.12107C23.0843 0.65541 22.045 0.775426 22.045 0.775426L18.5885 0.797029C18.4351 0.778863 18.2798 0.80642 18.142 0.876239C18.0107 0.972048 17.9058 1.09965 17.8372 1.24709C17.4792 2.17612 17.0523 3.07714 16.5602 3.94265C15.0204 6.55659 14.3999 6.69461 14.1599 6.53259C13.5742 6.15334 13.7206 5.01199 13.7206 4.20188C13.7206 1.66834 14.1047 0.612204 12.9717 0.338568C12.5901 0.247356 12.3141 0.188548 11.3527 0.175346C10.119 0.163345 9.07243 0.175346 8.48435 0.469385C8.0907 0.663811 7.78706 1.09347 7.97788 1.11867C8.20711 1.14868 8.72438 1.25789 8.99802 1.63114C9.35807 2.1112 9.34007 3.19135 9.34007 3.19135C9.34007 3.19135 9.53809 6.17614 8.8588 6.54819C8.39314 6.80143 7.75345 6.28296 6.38167 3.90784C5.91573 3.08386 5.50323 2.23079 5.14671 1.3539C5.08219 1.20438 4.98305 1.07233 4.85747 0.968652C4.69708 0.861746 4.51658 0.788649 4.327 0.753823L1.04576 0.775426C1.04576 0.775426 0.552498 0.789828 0.372474 1.00466C0.210453 1.19548 0.359272 1.58913 0.359272 1.58913C0.359272 1.58913 2.93721 7.60673 5.8428 10.6383C8.51315 13.4191 11.546 13.2367 11.546 13.2367Z" fill="white"/>
</svg>
</a>
                            <a href='https://www.facebook.com/ООО-Эллинлайн-112305267240823/' className={classes.header__button}><svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.58075 23.2941V12.8023H12.1225L12.6513 8.71438H8.58075V6.10396C8.58075 4.91969 8.91063 4.11263 10.6154 4.11263H12.791V0.454533C11.7383 0.344325 10.6805 0.290778 9.62199 0.294123C6.4857 0.294123 4.33398 2.19899 4.33398 5.69918V8.71438H0.791016V12.8023H4.33776V23.2941H8.58075Z" fill="white"/>
</svg>
</a>
                            <a href='https://www.instagram.com/ellinlinespb/' className={classes.header__button}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.79038 2.007C12.3275 2.007 12.6286 2.01593 13.6299 2.06185C14.556 2.10395 15.0586 2.25957 15.3941 2.38968C15.8085 2.5417 16.1834 2.78496 16.4911 3.10146C16.8068 3.40759 17.0496 3.78076 17.2016 4.19337C17.3292 4.52885 17.486 5.03144 17.5294 5.95752C17.5741 6.95886 17.5843 7.2599 17.5843 9.79579C17.5843 12.3317 17.5741 12.634 17.5294 13.6353C17.486 14.5614 17.3317 15.064 17.2016 15.3995C17.0435 15.809 16.8015 16.1809 16.491 16.4914C16.1806 16.8018 15.8087 17.0438 15.3992 17.2019C15.0637 17.3295 14.5611 17.4864 13.635 17.5297C12.6337 17.5744 12.3326 17.5846 9.79548 17.5846C7.25832 17.5846 6.95856 17.5744 5.95721 17.5297C5.03113 17.4864 4.52855 17.332 4.19306 17.2019C3.77944 17.0515 3.40494 16.81 3.09733 16.4952C2.78193 16.1889 2.53915 15.8158 2.38682 15.4033C2.25926 15.0678 2.10109 14.5652 2.05899 13.6392C2.01307 12.6378 2.00414 12.3368 2.00414 9.79962C2.00414 7.26246 2.01307 6.96269 2.05899 5.96135C2.10109 5.03526 2.25671 4.53268 2.38682 4.1972C2.53833 3.78321 2.78118 3.40869 3.09733 3.10146C3.40345 2.78579 3.77662 2.54297 4.18924 2.39095C4.52472 2.2634 5.0273 2.10522 5.95339 2.06313C6.95473 2.01721 7.25577 2.00828 9.79165 2.00828L9.79038 2.007ZM9.79038 0.295151C7.21112 0.295151 6.88712 0.306631 5.8743 0.352553C5.08612 0.368233 4.3063 0.517468 3.56802 0.793909C2.93405 1.03222 2.35982 1.40619 1.88551 1.88965C1.40205 2.36396 1.02808 2.93819 0.789774 3.57216C0.513333 4.31044 0.364098 5.09025 0.348417 5.87843C0.302496 6.89126 0.291016 7.21526 0.291016 9.79451C0.291016 12.3738 0.302496 12.699 0.348417 13.7119C0.364098 14.5001 0.513333 15.2799 0.789774 16.0181C1.02808 16.6521 1.40205 17.2263 1.88551 17.7007C2.36033 18.1823 2.93452 18.5545 3.56802 18.7913C4.3063 19.0677 5.08612 19.217 5.8743 19.2326C6.88712 19.2786 7.21112 19.29 9.79038 19.29C12.3696 19.29 12.6949 19.2786 13.7077 19.2326C14.4959 19.217 15.2757 19.0677 16.014 18.7913C16.6436 18.5471 17.2153 18.1744 17.6928 17.6969C18.1703 17.2195 18.543 16.6477 18.7872 16.0181C19.0636 15.2799 19.2128 14.5001 19.2285 13.7119C19.2744 12.699 19.2859 12.375 19.2859 9.79451C19.2859 7.21398 19.2744 6.89126 19.2285 5.87843C19.2128 5.09025 19.0636 4.31044 18.7872 3.57216C18.5488 2.93819 18.1749 2.36396 17.6914 1.88965C17.2171 1.40619 16.6429 1.03222 16.0089 0.793909C15.2722 0.518033 14.4942 0.368808 13.7077 0.352553C12.6949 0.306631 12.3709 0.295151 9.79038 0.295151Z" fill="white"/>
<path d="M9.79127 4.91663C8.82621 4.91663 7.88282 5.20282 7.08042 5.739C6.27802 6.27519 5.65265 7.03728 5.28339 7.9289C4.91414 8.82053 4.81759 9.80163 5.00596 10.7481C5.19432 11.6946 5.65914 12.564 6.34163 13.2463C7.02412 13.9286 7.89362 14.3932 8.84017 14.5813C9.78672 14.7695 10.7678 14.6727 11.6593 14.3032C12.5508 13.9337 13.3128 13.3081 13.8488 12.5056C14.3847 11.703 14.6707 10.7596 14.6704 9.7945C14.6704 9.15382 14.5442 8.51942 14.299 7.92753C14.0538 7.33563 13.6944 6.79784 13.2413 6.34487C12.7882 5.8919 12.2503 5.53263 11.6583 5.28757C11.0664 5.04251 10.4319 4.91646 9.79127 4.91663ZM9.79127 12.9618C9.16483 12.9618 8.55247 12.776 8.03161 12.428C7.51075 12.08 7.10478 11.5853 6.86506 11.0066C6.62533 10.4278 6.56261 9.79099 6.68482 9.17659C6.80703 8.5622 7.10869 7.99784 7.55164 7.55488C7.9946 7.11193 8.55896 6.81027 9.17336 6.68806C9.78775 6.56585 10.4246 6.62857 11.0033 6.8683C11.5821 7.10802 12.0768 7.51398 12.4248 8.03484C12.7728 8.5557 12.9586 9.16807 12.9586 9.7945C12.9586 10.6345 12.6249 11.4401 12.0309 12.0341C11.4369 12.6281 10.6313 12.9618 9.79127 12.9618Z" fill="white"/>
<path d="M14.863 5.8644C15.4929 5.8644 16.0034 5.35383 16.0034 4.72402C16.0034 4.0942 15.4929 3.58363 14.863 3.58363C14.2332 3.58363 13.7227 4.0942 13.7227 4.72402C13.7227 5.35383 14.2332 5.8644 14.863 5.8644Z" fill="white"/>
</svg>
</a>
                            <a href='/' className={classes.header__button}><svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4437 12.0367C20.3328 12.5515 20.0649 13.0188 19.6774 13.3736C19.2898 13.7284 18.8018 13.9532 18.2812 14.0166C15.8026 14.2952 13.2927 14.2952 10.7941 14.2952C8.29554 14.2952 5.7882 14.2952 3.3046 14.0166C2.78421 13.9529 2.29649 13.7281 1.90917 13.3733C1.52186 13.0184 1.25418 12.5513 1.14332 12.0367C0.791016 10.5223 0.791016 8.86229 0.791016 7.29517C0.791016 5.72804 0.791016 4.06806 1.13832 2.54736C1.25057 2.03382 1.51899 1.56801 1.90642 1.21442C2.29385 0.860826 2.78115 0.636927 3.30085 0.57371C5.78071 0.295165 8.2868 0.293911 10.7854 0.295165C13.284 0.29642 15.7951 0.295165 18.2749 0.57371C18.7945 0.636992 19.2816 0.86094 19.6688 1.21454C20.056 1.56815 20.3242 2.03392 20.4362 2.54736C20.7848 4.06806 20.7873 5.72929 20.7873 7.29517C20.7873 8.86104 20.7923 10.5223 20.4437 12.0367ZM8.69282 4.5574V10.127L13.9811 7.34159L8.69282 4.5574Z" fill="white"/>
</svg>
</a>
                        </div>
                    </div>
                </header>
                <div className={classes.header__buttons}>
                            <Link href='/'><a className={classes.header__button}>О нас</a></Link>
                            <Link href='/resorts/Saint-Petersburg/all'><a className={classes.header__button} style={{gridColumn: '2 / 4'}}>Санкт-Петербург</a></Link>
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
 
                            <label for={classes.search_active}><i className={"fas fa-search " + classes.button__loupe}></i></label>
                        </div>
                
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
