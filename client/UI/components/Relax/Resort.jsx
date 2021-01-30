import React, { useState } from 'react';
import FormBooking from './../CustomElements/FormBooking.jsx';
//import Slider from './../CustomElements/Slider.jsx';
import InfoSection from './../CustomElements/InfoSection.jsx';
import classes from './Resort.module.scss';

const Resort = (props) => {
    // const[idItem, setId] = useState(props.idItem);
    // По идее здесь должен идти запрос к бд, а не передача через пропсы
    // Но это временно для проверки пока бд не прикручена

    // Нужно заменить на конст
    // const[id, setId] = useState(props.id);
    // const[images, setImages] = useState(props.images);
    // const[title, setTitle] = useState(props.title);
    // const[price, setPrice] = useState(props.price);
    // const[address, setAddress] = useState(props.address);
    let[id, setId] = useState(props.id);
    let[images, setImages] = useState(props.images);
    let[title, setTitle] = useState(props.title);
    let[price, setPrice] = useState(props.price);
    let[services, setServices] = useState(props.services);
    let[text, setText] = useState(props.text);
    let[address, setAddress] = useState(props.address);
    //

    //#region Convert Object
    const convert = 
    { 
        'available': 
        {
            'restaurant': 
            [
                <i class="fa fa-cutlery" aria-hidden="true"></i>,
                <p>Ресторан</p>
            ], 
            'wifi': 
            [
                <i class="fa fa-wifi" aria-hidden="true"></i>,
                <p>Wi-Fi в лобби</p>
            ] 
        },
        'common': 
        {
            'bar': 
            [
                <i class="fa fa-beer" aria-hidden="true"></i>,
                <p>Бар</p>
            ]
        },
        'rooms': 
        {
            'wifi':
            [
                <i class="fa fa-wifi" aria-hidden="true"></i>,
                <p>Wi-Fi в номере</p>
            ]
        }
    };
    //#endregion

    function GetResort() {
        let id_new = props.match.params.id;
        // Дальше по этому айди запрос к бд который возврщает пансионат/санаторий
        id = id_new;
        images = 
        [ 
            'https://geekster.ru/wp-content/uploads/2017/09/warhammer-40k.jpg', 
            'https://s1.1zoom.ru/big3/72/419476-Kycb.jpg',
            'https://altwall.net/img/deathgroup/03_1024.jpg'
        ];
        title = 'Mr ya Resort & SPA 5*';
        price = '20 000 руб.';
        services = 
        {
            'available': [ 'restaurant', 'wifi' ],
            'common': [ 'bar' ],
            'rooms': [ 'wifi' ]
        };
        address = 'с. Оползневое, улица Генерала Острякова, 9';
        text = 'Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом обеспечивает широкому кругу. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности позволяет оценить значение новых предложений. Равным образом постоянный количественный рост и сфера нашей активности играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям. Товарищи! сложившаяся структура организации представляет собой интересный эксперимент проверки направлений прогрессивного развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании новых предложений.';
        console.log(id + ' ID resort');
    }

    function ConvertServices(service) {
        let massiv = services[service];
        let converts = convert[service];
        let elements = [];
        massiv.forEach(element => {
            elements.push(converts[element][0]);
            elements.push(converts[element][1]);
        });
        return elements;

    }

    GetResort();

    return (
        <div className={classes.resort}>
            {/*  */}
            <InfoSection title="DALER MADE THIS" 
                         price={20000} 
                         text="text"
                         images={images}/>
            {/*  */}
            <div className={classes.services}>
                <div className={classes.available}>
                    <h1>В наличии</h1>
                    <div className={classes.service}>
                        {ConvertServices('available')}
                    </div>
                </div>
                <div className={classes.common}>
                    <h1>Общие услуги</h1>
                    <div className={classes.service}>
                        {ConvertServices('common')}
                    </div>
                </div>
                <div className={classes.rooms}>
                    <h1>Услуги в номерах</h1>
                    <div className={classes.service}>
                        {ConvertServices('rooms')}
                    </div>
                </div>
                <div className={classes.address}>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <h1>{address}</h1>
                </div>
            </div>

            <div className={classes.map}>
                
            </div>

            <FormBooking className={classes.form}/>
        </div>
    )
}

export default Resort;