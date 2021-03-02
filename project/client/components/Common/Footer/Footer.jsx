import React from 'react'
import classes from './Footer.module.scss';
import Link from 'next/link'
import PresentationMap from '../Map/PresentationMap'
import Image from 'next/image';

const homeOnMap= [{coordinates: [59.87026708231266, 30.26207174039379], hintContent: 'Эллинлайн', balloonContentBody: 'ул. Зайцева, 3, корп. 2, Санкт-Петербург'}];
const cityCoordinates = [59.9073, 30.3276];
const Footer = (props) => {

        return (
        <div className={ classes.footer + ' ' + props.className}>
            <PresentationMap className={ classes.footer__map } id="map" cityCoordinates={cityCoordinates} points={homeOnMap}/>
            
            <div className={classes.footer__links}>
                <div className={classes.links}>
                    <a href='https://vk.com/ellinline' className={classes.header__button}><Image src='/images/vk.svg' width={20} height={20}/></a>
                    <a href='https://www.facebook.com/ООО-Эллинлайн-112305267240823/' className={classes.header__button}><Image src='/images/facebook.svg' width={20} height={20}/></a>
                    <a href='https://www.instagram.com/ellinlinespb/' className={classes.header__button}><Image src='/images/instagram.svg' width={20} height={20}/></a>
                    <a href='/home' className={classes.header__button}><Image src='/images/youtube.svg' width={20} height={20}/></a>
                </div>
            </div>
            <div className={classes.footer__info}>
                <div className={classes.info__block}>
                    <Image src='/images/home.svg' width={23} height={23}/>
                    <p>OOO «Эллинлайн», 198096, Санкт-Петербург, ул.Зайцева д.3</p>
                </div>
                <div className={classes.info__block}>
                    <Image src='/images/phone.svg' width={23} height={23}/>
                    <p> +7 (921) 973 33 44   <br/>
                        +7 (812) 733 51 70 <br/>
                        +7 (812) 784 04 71 <br/>

                    </p>
                </div>
                <div className={classes.info__block}>
                    <Image src='/images/mail.svg' width={23} height={23}/>
                    <p>7840054@mail.ru</p>
                </div>
                <div className={classes.info__block}>
                    <Image src='/images/clock.svg' width={23} height={23}/>
                    <p>Понедельник — пятница: <br/> с 10:30 до 19:00</p>
                </div>
                <div className={classes.info__block}>
                    <Image src='/images/bank.svg' width={23} height={23}/>
                    <p>ПАО Банк «Санкт-Петербург», <br/> доп.офис «Нарвский», <br/> БИК 044030790, Р/с: 40702810145000000839</p>
                </div>
                <div className={classes.info__block}>
                    <Image src='/images/anonymous.svg' width={23} height={23}/>
                    <Link href='/privacy_policy'><a>Политика конфиденциальности</a></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
