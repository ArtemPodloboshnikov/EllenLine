import { useEffect, useState } from 'react';
import additionalPrices from '../../../functions/AdditionalPrices';
import { sha256 } from 'js-sha256';
//
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import PromoCode from '../../CustomElements/PromoCode';
import SelectEntered from '../../CustomElements/SelectEntered';
import InputMask from '../../CustomElements/InputMask.jsx';
import Button from '../../CustomElements/Button.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
// import TranslatorPage from '../../CustomElements/TranslatorPage';
import Link from 'next/link';
//
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    const [date_arrival, setDateArrival] = useState(props.date_arrival);
    const [date_leave, setDateLeave] = useState(props.date_leave);
    const title = props.title;
    const url_callback = props.url_callback;
    const arrowSize = [30, 30];
    const [currency, setCurrency] = useState('RUB');
    const [currencyData, setCurrencyData] = useState({value: 1, name: 'Рублей'});
    const [valueDynamicSelect, setValueDynamicSelect] = useState([false]);
    const origin_price = props.price;
    const [defaultPrice, setDefaultPrice] = useState(props.price);
    const [price, setPrice] = useState(origin_price);
    const [countParent, setCountParent] = useState(1);
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
                    temp_price += someone.price * currencyData.value;
                    break;
                }
                else
                if(valueDynamicSelect[i] == '')
                {
                    break;
                }
            }
        }

        setPrice(defaultPrice + temp_price)
        let temp_valueDynamicSelect = [...valueDynamicSelect];
        temp_valueDynamicSelect[0] = false;
        setValueDynamicSelect(temp_valueDynamicSelect)
    }

    useEffect(()=>{

        async function getCurrency()
        {
            const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
            const json = await res.json();
            setPrice(Math.ceil(json.Valute[currency].Value) * origin_price * countParent);
            setDefaultPrice(Math.ceil(json.Valute[currency].Value) * origin_price * countParent);
            setCurrencyData({value: Math.ceil(json.Valute[currency].Value), name: json.Valute[currency].Name})
        }

        if (currency != 'RUB')
        {

            getCurrency()
        }
        else
        {
            setPrice(origin_price * countParent);
            setDefaultPrice(origin_price * countParent);
            setCurrencyData({value: 1, name: 'Рублей'})
        }

    }, [currency])

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
                sections.room_or_tickets = 
                <>
                    <SelectEntered className={classes.parents} type='select'
                                options={[ '1 взрослый', '2 взрослый' ]} onChangeFunction={(object) => {
                                    
                                  
                                    let countPeople = object.value.split(' ')[0];
                                    setDefaultPrice(parseInt(countPeople) * origin_price * currencyData.value);
                                    setCountParent(parseInt(countPeople));

                                    let temp_valueDynamicSelect = [...valueDynamicSelect];
                                    temp_valueDynamicSelect[0] = true;
                                    setValueDynamicSelect(temp_valueDynamicSelect)
                                   
                                }}
                                placeholder='Взрослые' arrowSize={arrowSize}/>
                    <SelectOption className={classes.childs} classSelect={classes.childs__select}
                                minusFunction={(index) => {

                                    let temp_valueDynamicSelect = [...valueDynamicSelect];
                                    temp_valueDynamicSelect[0] = true;
                                    temp_valueDynamicSelect[index + 1] = '';
                                    setValueDynamicSelect(temp_valueDynamicSelect)
                                }}
                                valueDynamicSelect={valueDynamicSelect}
                                setValueDynamicSelect={setValueDynamicSelect}
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
            <div></div>
            <SelectEntered className={classes.currency} name='currency' 
            value={currency} arrowSize={arrowSize} onChangeFunction={obj => {setCurrency(obj.value)}}
            options={['RUB', 'AUD', 'AZN', 
                      'GBP', 'AMD', 'BYN', 
                      'BGN', 'BRL', 'HUF', 
                      'HKD', 'DKK', 'USD', 
                      'EUR', 'INR', 'KZT', 
                      'CAD', 'KGS', 'CNY', 
                      'MDL', 'NOK', 'PLN', 
                      'RON', 'XDR', 'SGD', 
                      'TJS', 'TRY', 'TMT', 
                      'UZS', 'UAH', 'CZK', 
                      'SEK', 'CHF', 'ZAR', 
                      'KRW', 'JPY']}/>
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
                <h1>{price + ' ' + currencyData.name}</h1>
                
            </div>
        </div>;
    }

    return(
        
        <div className={classes.booking + ' ' + props.className}>
             {/* SEPARATOR */}
            {GenerateInfoGoing()}
            {/* SEPARATOR */}
            <form method='POST' action='https://demo.paykeeper.ru/create/' accept-charset="utf-8" className={classes.info_person}>
            <InputText className={classes.fio} placeholder='Имя и фамилия'/>
                <InputText className={classes.e_mail} name='client_email' placeholder='E-mail'/>
                <InputText className={classes.telephone} name='client_phone' placeholder='Телефон'/>
                <Button className={classes.button} value='Забронировать'/>
                <small>
                    Нажимая кнопку "Забронировать", вы принимаете <Link href='/terms/[category]' as='/terms/payment'><a>наши условия</a></Link>
                </small>
                <input type='hidden' name='sum' value={price}/>
                <input type='hidden' name='service_name' value={title}/>
                <input type='hidden' name='user_result_callback' value={url_callback}/>
                {/* <input type='hidden' name='sign' value={}/> */}
            </form>
        </div>
        
    )
}

export default FormBooking;