import React, { useState } from 'react';
import FormBooking from './../CustomElements/FormBooking.jsx';
import Slider from './../CustomElements/Slider.jsx';
import classes from './Resort.module.css';

const Resort = (props) => {
    // const[idItem, setId] = useState(props.idItem);
    // По идее здесь должен идти запрос к бд, а не передача через пропсы
    // Но это временно для проверки пока бд не прикручена

    const[id, setId] = useState(props.id);
    // Нужно заменить на конст
    // const[images, setImages] = useState(props.images);
    let[images, setImages] = useState(props.images);
    const[title, setTitle] = useState(props.title);
    const[address, setAddress] = useState(props.address);
    const[price, setPrice] = useState(props.price);
    const[services, setServices] = useState(props.services);

    function GetResort() {
        let id_new = props.match.params.id;
        // Дальше по этому айди запрос к бд который возврщает пансионат/санаторий
        id = id_new;
        images = 
        [ 
            'https://geekster.ru/wp-content/uploads/2017/09/warhammer-40k.jpg', 
            'https://s1.1zoom.ru/big3/72/419476-Kycb.jpg',
            'https://altwall.net/img/deathgroup/03_1024.jpg'
        ]
        console.log(id + ' ID resort');
    }

    GetResort();

    return (
        <div className={classes.resort}>

            <div className={classes.enter}>
                <Slider className={classes.slider} images={images}/>
                <div className={classes.info}>
                    <h1>{title}</h1>
                    {/* STARS */}
                    <h2>{price}</h2>
                    <button>Забронировать</button>
                </div>
                <div className={classes.wallet}>
                    
                </div>
            </div>

            <div className={classes.description}>
                <h1></h1>
                <p>

                </p>
            </div>

            <div className={classes.services}>
                <div className={classes.available}>

                </div>
                <div className={classes.common}>

                </div>
                <div className={classes.rooms}>

                </div>
            </div>

            <div className={classes.map}>

            </div>

            <FormBooking className={classes.booking}/>
        </div>
    )
}

export default Resort;