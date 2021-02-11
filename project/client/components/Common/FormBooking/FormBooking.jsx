import { useEffect, useState } from 'react';
import additionalPrices from '../../../functions/AdditionalPrices';
//
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import PromoCode from '../../CustomElements/PromoCode';
import SelectEntered from '../../CustomElements/SelectEntered';
import InputMask from '../../CustomElements/InputMask.jsx';
import Button from '../../CustomElements/Button.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import Link from 'next/link';
//
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    const [date_arrival, setDateArrival] = useState(props.date_arrival);
    const [date_leave, setDateLeave] = useState(props.date_leave);
    const arrowSize = [30, 30];
    const [valueDynamicSelect, setValueDynamicSelect] = useState([false]);
    const default_price = props.price;
    const [price, setPrice] = useState(default_price);
    const pricePerChild = props.pricePerChild;
    const pricePerTeenager = props.pricePerTeenager;
    const pricePerPet = props.pricePerPet;  
    const someoneAndPrice = additionalPrices({who: 'Ребёнок', price: pricePerChild}, 
                                             {who: 'Подросток', price: pricePerTeenager}, 
                                             {who: 'Питомец', price: pricePerPet});
   
    let someoneElse = [];
    someoneAndPrice.map(someone =>{

        someoneElse.push(someone.who);
    })
    
    //
    const type = props.type;
    console.log(someoneAndPrice)
    console.log(valueDynamicSelect)
    if (valueDynamicSelect[0])
    {
        
        let temp_price = 0;

        for (let i = 1; i < valueDynamicSelect.length; i++)
        {

            for (let someone of someoneAndPrice)
            {
                console.log('someone: ' + someone.who + ' value: ' + valueDynamicSelect[i])
                if (valueDynamicSelect[i] == someone.who)
                {
                    temp_price += someone.price;
                    break;
                }
                else
                if(valueDynamicSelect[i] == '')
                {
                    break;
                }
            }
        }

        setPrice(default_price + temp_price)
        let temp_valueDynamicSelect = [...valueDynamicSelect];
        temp_valueDynamicSelect[0] = false;
        setValueDynamicSelect(temp_valueDynamicSelect)
    }

    function GenerateInfoGoing() {
        let sections = 
        { 
            title_date: undefined, // title first date
            date_or_time: undefined, 
            room_or_tickets: undefined,
            price_behavior: undefined
        };
        switch(type)
        {
            case 'relax':
            case 'cruises':
                sections.title_date = 'Дата заезда';
                sections.date_or_time = 
                <InputDate className={classes.date} classInput={classes.date__input}
                        title='Дата отъезда'
                        date={date_leave}/>;
                //LATE CHAINGE TO SELECT ENTERED
                sections.room_or_tickets = <>
                    <SelectEntered className={classes.parents} type='select'
                                options={[ '1 взрослый', '2 взрослый' ]} 
                                placeholder='Взрослые' arrowSize={arrowSize}/>
                    <SelectOption className={classes.childs} classSelect={classes.childs__select}
                                onChangeFunction={(object) => {
                                    
                                    let temp_valueDynamicSelect = [...valueDynamicSelect];
                                    temp_valueDynamicSelect[0] = true;
                                    temp_valueDynamicSelect[object.index + 1] = object.value;
                                    setValueDynamicSelect(temp_valueDynamicSelect)
                                }}
                                options={someoneElse}
                                placeholder='Кто-то ещё' arrowSize={arrowSize}/>
                </>;
                break;
            case 'tours':
                sections.title_date = 'Выберите дату';
                //LATE CHAINGE TO SELECT ENTERED
                sections.date_or_time = 
                <SelectOption
                className={classes.time}
                title='Выберите время'
                options={[ '10:00', '12:50', '18:00' ]}
                placeholder='Кто-то ещё'
                />
                //
                sections.room_or_tickets = 
                <InputNumber className={classes.tickets}
                value='1' min='1' max='10'/>
                //
                sections.price_behavior = classes.tours;
                break;
            default:
                console.log(type + ' type don`t support');
                return 'ERROR TYPE: ' + type + ' NOT SUPPORTED';
        }

        return <div className={classes.info_going}>
            <InputDate className={classes.date} classInput={classes.date__input}
                    title={sections.title_date}
                    date={date_arrival}/>
            {sections.date_or_time}
            {/* ROW */}
            {sections.room_or_tickets}
            {/* ROW */}
            <PromoCode className={classes.code}/>
            <div className={classes.price + ' ' + sections.price_behavior}>
                <span>Итого</span>
                <h1>{price} руб.</h1>
            </div>
        </div>;
    }

    return(
        <div className={classes.booking + ' ' + props.className}>
             {/* SEPARATOR */}
            {GenerateInfoGoing()}
            {/* SEPARATOR */}
            <div className={classes.info_person}>
                <InputText className={classes.fio} placeholder='Имя и фамилия'/>
                <InputText className={classes.e_mail} placeholder='E-mail'/>
                <InputText className={classes.telephone} placeholder='Телефон'/>
                <Button className={classes.button} value='Забронировать'/>
                <p>
                    Нажимая кнопку "Забронировать", вы принимаете <Link href='/terms/[category]' as='/terms/payment'><a>наши условия</a></Link>
                </p>
            </div>
        </div>
    )
}

export default FormBooking;