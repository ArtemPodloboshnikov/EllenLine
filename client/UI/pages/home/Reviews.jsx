import React from 'react'
import classes from './Reviews.module.scss';

const Reviews = () => {
    return (
        <div className={ 'section ' + classes.section_top }>
             <div className='section__title_left'>
                <p>Отзывы</p>
            </div>
            <div className={ classes.reviews + ' ' + classes.reviews_height}>
                <div className={ classes.reviews__image }>
             
                    <a href='https://my.mail.ru/bk/lordkent/'><img src='images/Home/Konstantin_L.png'/></a>
                    <div>
                        <h2>Константин Лавцевич</h2>
                        <h3>21.01.2001</h3>
                    </div>
                </div>
                <div className={ classes.reviews__text + ' ' + classes.reviews__text_right}>
                    <p>Отдыхал в Новый год в санатории "Белая вежа". Брал путевку в Питере у турфирмы Эллинлайн на 12 дней. Добирался поездом до Бреста, а затем взял такси за 800 рос. рублей. От вокзала километров 40. Природа в санатории супер. Сосны и ели. Воздух пьянящий. У меня был номер люкс-2 комнаты. Питание выше похвал, всего хватало, даже фруктов. персонал доброжелюбный и не избалованный.</p>
                    <p>Есть классный бассейн. Организовывают экскурсии. А можно и самому все организовать. Рядом есть магазин продовольственный и промтоварный. На территории есть бар с алкоголем. Процедуры можно попросить самому какие хотите, а можно взять и дополнительно за небольшие деньги. В санаториях Белоруси я уже во второй раз. Был сначала в Нарочи. Сравнить есть с чем. Очень хороший отдых и релакс.</p>
                </div>
            </div>
            <div className={ classes.reviews + ' ' + classes.reviews_left}>
                <div className={ classes.reviews__text + ' ' + classes.reviews__text_left}>
                    <p>На Майские праздники ездили с Эллинлайн в двухдневный тур в Пушкинские Горы и г.Псков. Поездка была организована на высоком уровне.Программа до такой степени насыщенная,что свободного времени уже не оставалось.Многие уголки великолепных парков Михайловского и Петровского остались нами не пройдены,просто не успели.Гиды тоже порадовали интересными рассказами.Узнали много нового и интересного.Отель был предложен на берегу озера,с саунами и бассейном.Все были в восторге. На питание тоже никто не обижался.В общем недовольных не было. Большое спасибо Галине Леонидовне за прекрасную организацию автобусного тура. С этой фирмой ездим давно,и всегда поездки впечатляли. Надеемся встретиться еще.</p>
                </div>
                <div className={ classes.reviews__image}>
             
                        <a href='https://ok.ru/profile/83019673428'><img src='images/Home/Galina_L.png'/></a>
                    <div>
                        <h2>Галина Лоппер</h2>
                        <h3>21.05.2001</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews
