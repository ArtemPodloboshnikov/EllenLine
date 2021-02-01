import React, { useState } from 'react';
import Slider from './../CustomElements/Slider.jsx';
import classes from './InfoSection.module.scss';
import Button from '../CustomElements/Button';

const InfoSection = (props) => {
    const [title, setTitle] = useState(props.title);
    const [price, setPrice] = useState(props.price);
    const [text, setText] = useState(props.text);
    const [images, setImages] = useState(props.images);
    ///
    const [expand, setExpand] = useState(false);
    const [index, setIndex] = useState(props.index ? props.index : 0);
    //If exists, then this tour not relax or something else
    const [duration, setDuration] = useState(props.duration ? props.duration : undefined);


    function ExpandDescription(e) {
        // console.log();
        let arrow = e.currentTarget;
        if(arrow.classList.contains(classes.active))
        {
            arrow.classList.remove(classes.active);
            //shrink
        }
        else
        {
            arrow.classList.add(classes.active);
            //expand
        }
        setExpand(!expand);
    }

    function ReturnMainTitle() {
        return <h1>{title}</h1>;
    }

    function ReturnSubTitle() {
        if(!duration)
            return <h1>{title}</h1>;
        else
            return  <div>
                        <h1>{duration} Дней</h1>
                        <span>продолжительность</span>
                    </div>;
    }

    return (
        <div className={classes.wrap}>
            <h1>{ReturnMainTitle()}</h1>
            <div className={classes.enter}>
                <Slider className={classes.slider} images={images} index={index}/>
                <div className={classes.info}>
                    {/* <h1>{title}</h1> */}
                    {ReturnSubTitle()}
                    {/* STARS */}
                    <div>
                        <h2>от {price}</h2>
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
                    <p style={{height: expand ? 'auto' : '100px'}}>
                        {text}
                    </p>
                </div>
                <i class="fa fa-arrow-down" onClick={(e) => ExpandDescription(e)} aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default InfoSection;