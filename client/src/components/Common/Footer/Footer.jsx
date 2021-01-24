import React from 'react'
import classes from './Footer.module.css';
import { Link } from 'react-router-dom'
import YandexMap from '../Map/YandexMap'

const homeOnMap= [{coordinates: [59.87026708231266, 30.26207174039379], hintContent: 'Эллинлайн', balloonContentBody: 'ул. Зайцева, 3, корп. 2, Санкт-Петербург'}];
const cityCoordinates = [59.9073, 30.3276];
const Footer = () => {

        return (
        <div className={ classes.footer }>
            <YandexMap className={ classes.footer__map } id="map" cityCoordinates={cityCoordinates} points={homeOnMap}/>
            
            <div className={classes.footer__links}>
                <div className={classes.links}>
                    <a href='https://vk.com/ellinline' className={classes.header__button}><img src='images/vk.svg'/></a>
                    <a href='https://www.facebook.com/ООО-Эллинлайн-112305267240823/' className={classes.header__button}><img src='images/facebook.svg'/></a>
                    <a href='https://www.instagram.com/ellinlinespb/' className={classes.header__button}><img src='images/instagram.svg'/></a>
                    <a href='/home' className={classes.header__button}><img src='images/youtube.svg'/></a>
                </div>
            </div>
            <div className={classes.footer__info}>
                <div className={classes.info__block}>
                    <img src='images/home.svg' />
                    <p>OOO «Эллинлайн», 198096, Санкт-Петербург, ул.Зайцева д.3</p>
                </div>
                <div className={classes.info__block}>
                    <img src='images/phone.svg'/>
                    <p> +7 (921) 973 33 44   <br/>
                        +7 (812) 733 51 70 <br/>
                        +7 (812) 784 04 71 <br/>

                    </p>
                </div>
                <div className={classes.info__block}>
                    <img src='images/mail.svg'/>
                    <p>7840054@mail.ru</p>
                </div>
                <div className={classes.info__block}>
                    <img src='images/clock.svg'/>
                    <p>Понедельник — пятница: <br/> с 10:30 до 19:00</p>
                </div>
                <div className={classes.info__block}>
                    <img src='images/bank.svg'/>
                    <p>ПАО Банк «Санкт-Петербург», <br/> доп.офис «Нарвский», <br/> БИК 044030790, Р/с: 40702810145000000839</p>
                </div>
                <div className={classes.info__block}>
                    <img src='images/anonymous.svg'/>
                    <Link to='/privacy_policy'>Политика конфиденциальности</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
