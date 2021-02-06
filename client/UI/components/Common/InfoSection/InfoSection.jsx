import React, { useState } from 'react';
//
import Slider from '../../CustomElements/Slider.jsx';
import Button from '../../CustomElements/Button.jsx';
//
import classes from './InfoSection.module.scss';

const InfoSection = (props) => {
    const [title, setTitle] = useState(props.title);
    const [price, setPrice] = useState(props.price);
    const [text, setText] = useState(props.text);
    const [images, setImages] = useState(props.images);
    const [start, setStars] = useState(props.start);
    //
    const [expand, setExpand] = useState(false);
    const [index, setIndex] = useState(props.index ? props.index : 0);
    //type
    const type = props.type;
    //relax
    const stars = props.stars;
    //tours, cruises
    const duration = props.duration;


    function ExpandDescription(e) {
        let arrow = e.currentTarget;
        if(arrow.classList.contains(classes.active))
            arrow.classList.remove(classes.active);
            //shrink
        else
            arrow.classList.add(classes.active);
            //expand
        setExpand(!expand);
    }

    function GenerateInfo() {

        function GenerateStars() {
            const elements = [];
            for(let i = 0; i < stars; i++)
            {
                elements.push(<i class="fa fa-star" style={{ gridRow: 1 }} aria-hidden="true"></i>);
            }
            return elements;
        }

        switch(type)
        {
            case 'tours':
            case 'cruises'://duration == timetable.lenght
                return <div className={classes.duration}>
                    <h1>{duration} Дней</h1>
                    <span>продолжительность</span>
                </div>
            case 'relax':
                return <div className={classes.stars}>
                    {GenerateStars()}
                </div>;
            default:
                console.log(type + ' type don`t support');
                return;
        }
    }

    return (
        <div className={classes.wrap}>
            <h1>{title}</h1>
            <div className={classes.enter}>
                <Slider className={classes.slider} images={images} index={index}/>
                <div className={classes.info}>
                    {GenerateInfo()}
                    <div>
                        <h2>от {price} руб.</h2>
                        <span>за человека</span>
                    </div>
                    <Button value='Забронировать' className={classes.booking_btn} />
                </div>
                <div className={classes.wallet}>
                    <i class="fa fa-credit-card" aria-hidden="true"></i>
                    <p>
                        Можно оплатить наличными или картой на месте
                    </p>
                </div>
            </div>

            <div className={classes.description}>
                <div>
                    <div className={classes.back} style={{display: expand ? 'none' : 'block'}}/>
                    <h1>Описание</h1>
                    <p style={{height: expand ? 'auto' : '10px'}}>
                        {text}
                    </p>
                </div>
                <i class="fa fa-arrow-down" onClick={(e) => ExpandDescription(e)} aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default InfoSection;