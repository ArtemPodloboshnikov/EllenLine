import React from 'react'
import classes from './Advantages.module.css';

const Advantages = () => {
    return (
        <div className='section'>
            <div className='section__title_right'>
                <p>Почему мы?</p>
            </div>
            <div className={ classes.advantages__blocks }>
                <div className={ classes.advantages__block }>
                    <h1>27 лет опыта работы</h1>
                    <p>Мы организуем туры начиная  с основания Российской Федерации. За это время – мы успели набраться опыта. 
                    А значит можем сделать всё качественно, по сравнению с другими “новичками”.</p>
                    <div className={ classes.advantages__blockImage_1 }>
                        <img src='images/suitcaseOfClock.svg' />
                    </div>
                </div>
                <div className={ classes.advantages__block }>
                    <h1>Покажем всю Россию</h1>
                    <p>Санкт-Петербург – наш родной город. Мы знаем его как свои “пять пальцев”. 
                    Поэтому можем провести вас по самым необычным местам нашего города и России.</p>
                    <div className={ classes.advantages__blockImage_2 }>
                        <img src='images/bear.svg' />
                    </div>
                </div>
                <div className={ classes.advantages__block }>
                    <h1>Низкие цены</h1>
                    <p>Мы хотим видеть наших клиетов – довольными. Невысокая цена – обязательно вас обрадует.</p>
                    <div className={ classes.advantages__blockImage_3 }>
                        <img src='images/dollar.svg' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advantages
