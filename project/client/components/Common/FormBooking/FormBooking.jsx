import { useEffect, useState } from 'react';
import additionalPrices from '../../../functions/AdditionalPrices';
import mathPriceWithDiscount from '../../../functions/MathPriceWithDiscount';
import Global from '../../../pages/global';
import {useForm} from 'react-hook-form';
//
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import PromoCode from '../../CustomElements/PromoCode';
import SelectEntered from '../../CustomElements/SelectEntered';
import ShowInfo from '../../Common/DialogWindow/ShowInfo';
import Button from '../../CustomElements/Button.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import PayWindow from '../../Common/DialogWindow/PayWindow';
// import TranslatorPage from '../../CustomElements/TranslatorPage';
import Link from 'next/link';
//
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    
    const [clientid , setClientid] = useState(undefined);
    const [client_email, setClientEmail] = useState(undefined);
    const [client_phone, setClientPhone]= useState(undefined)
    const [promocodeName, setPromocodeName] = useState('');
    const [dateEnd, setDateEnd] = useState(props.date_leave);
    const [dateStart, setDateStart] = useState(props.date_arrival);
    const [time, setTime] = useState(undefined);
    const origin_price = props.price;
    const [defaultPrice, setDefaultPrice] = useState(origin_price);
    const [price, setPrice] = useState(origin_price);
    const [discount, setDiscount] = useState(props.discount);
    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}});
    const [orderId, setOrderId] = useState(0);
    const title = props.title;
    const id = props.id;
    const type = props.type;
    let url_callback = props.url_callback + '?orderId=' + orderId;
    const [countServices, setCountServices] = useState(props.countServices);
    const arrowSize = [30, 30];
    const [currency, setCurrency] = useState('RUB');
    const [currencyData, setCurrencyData] = useState({value: 1, name: 'Рублей'});
    const [valueDynamicSelect, setValueDynamicSelect] = useState([false, '']);
    const [countParent, setCountParent] = useState(1);
    const pricePerChild = props.pricePerChild;
    const pricePerTeenager = props.pricePerTeenager;
    const pricePerPet = props.pricePerPet;  
    let someoneAndPrice = [{who: 'Ребёнок', price: pricePerChild}, 
                                             {who: 'Подросток', price: pricePerTeenager}, 
                                             {who: 'Питомец', price: pricePerPet}];
    console.log(`countServices: ${countServices}`)
    let someoneElse = [];
    someoneAndPrice.map(someone =>{

        someoneElse.push(someone.who);
    })
    someoneAndPrice = additionalPrices(someoneAndPrice);
    
    console.log(someoneAndPrice)
    console.log(valueDynamicSelect)
    if (valueDynamicSelect[0])
    {
        
        let temp_price = 0;

        for (let i = 1; i < valueDynamicSelect.length; i++)
        {

            for (let someone of someoneAndPrice)
            {
                if (valueDynamicSelect[i] == '') continue;
                console.log('someone: ' + someone.who + ' value: ' + valueDynamicSelect[i])
                if (valueDynamicSelect[i] == someone.who)
                {
                    temp_price += Math.round(someone.price / currencyData.value);
                    break;
                }
                else
                if(valueDynamicSelect[i] == '')
                {
                    break;
                }
            }
        }

        setPrice(defaultPrice + temp_price);
        let temp_valueDynamicSelect = [...valueDynamicSelect];
        temp_valueDynamicSelect[0] = false;
        setValueDynamicSelect(temp_valueDynamicSelect)
    }


    useEffect(()=>{

        async function insertOrder(data)
        {
            let json = [];
            if (orderId == 0)
            {

                const res = await fetch(`${Global.urlServer}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                })
    
                json = await res.json();
                console.log(`json: ${json[0]}`)
                setOrderId(json[0].id);
            }
            console.log(`121: orderId ${orderId}`)
            if (orderId != 0 || json.length != 0)
            {
                fetch(`${Global.urlServer}/api/orders?id=${(orderId != 0)? orderId : json[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                })
            }
            
        }

        if (message.style.display != 'none')
        {
            let people = [];
            people.push(countParent + ((countParent == 1)? ' человек': ' человека'))
            let index = 1;
            let count_people = [];
            let flag = false;
            for (let i = 1; i < valueDynamicSelect.length; i++)
            {
                let j = 1;
                for ( ;j < people.length; j++)
                {
                    let man = people[j].split(' ');
          
                    if (valueDynamicSelect[i] == '' || valueDynamicSelect[i] == ' ' || valueDynamicSelect[i] === undefined) 
                    {
                        flag = true;
                        break;
                    }
                    if (man[1] == valueDynamicSelect[i] && i != j)
                    {
                        index = j;
                        if (count_people[index] === undefined) count_people[index] = 1;
                        count_people[index]++;
                        break;
                    }
                    else
                    {
                        index = i;
                    }
                }

                if (flag)
                {
                    flag = false;
                    continue;
                }
                people[index] = ((count_people[index] !== undefined)? count_people[index] : 1) + ' ' + (valueDynamicSelect[index]);
            }
            console.log(people)
            if (people[1] == '1 ' || people[1] == '1  ') people[1] = '';

            if (people[1] != '')
            {
                
                let pluralElemets = {'Ребёнок': {4: 'Ребёнка', 5: 'Детей'}, 'Питомец': {4: 'Питомца', 5: 'Питомцев'}, 'Подросток': {4: 'Подростка', 5: 'Подростков'}}
                for (let i = 1; i < people.length; i++)
                {
                    let man = people[i].split(' ');
                    people[i] = man[0] + ' ' + ((man[0] == 1)? man[1] : ((man[0] <= 4)? pluralElemets[man[1]][4]: pluralElemets[man[1]][5]))
                }
            }
            let data = {client_name: clientid,
                        email: client_email,
                        phone: client_phone,
                        title: title,
                        price: mathPriceWithDiscount(discount, price),
                        date_start: dateStart,
                        date_end: dateEnd,
                        idService: id,
                        type: type,
                        clients: people
                       }
            if (time !== undefined) data.time = time;
            
            insertOrder(data);
        }
        

    }, [message])

    useEffect(()=>{

        async function getCurrency()
        {
            const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
            const json = await res.json();
            setPrice(Math.round((origin_price * countParent) / json.Valute[currency].Value));
            setDefaultPrice(Math.round((origin_price * countParent) / json.Valute[currency].Value));
            setCurrencyData({value: json.Valute[currency].Value, name: json.Valute[currency].Name})
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

    const handleSubmitPromocode = ({promocode})=>{
        async function getDiscount()
        {
            console.log(promocode)
            const res = await fetch(`${Global.urlServer}/api/promocode?category=${type}&id=${id}&promocode=${encodeURIComponent(promocode)}`);
            const json = await res.json();
            console.log(json)
            setDiscount(discount + (json[0] !==undefined ? json[0].discount : 0));
            setPromocodeName(promocode);
            let temp_valueDynamicSelect = [...valueDynamicSelect];
            temp_valueDynamicSelect[0] = true;
            setValueDynamicSelect(temp_valueDynamicSelect)
        }
        if (promocodeName != promocode)
            getDiscount();
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
            case 'treatment':
            case 'relax':
            case 'cruises':
                sections.title_date = 'Дата заезда';
                sections.date_or_time = 
                <InputDate className={classes.date} classInput={classes.date__input}
                        title='Дата отъезда'
                        date={dateEnd} 
                        onChange={setDateEnd}/>;
                //LATE CHAINGE TO SELECT ENTERED
                sections.room_or_tickets = 
                <>
                    <SelectEntered className={classes.parents} type='select' value={'1 человек'}
                                options={[ '1 человек', '2 человека', '3 человека', '4 человека']} onChangeFunction={(object) => {
                                    
                                    let countPeople = 0;
                                    if (object.value !== undefined)
                                    {
                                        countPeople = object.value.split(' ')[0];

                                    }
                                    
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
                                    setValueDynamicSelect(temp_valueDynamicSelect);
                                    
                                }}
                                options={someoneElse} name='extension' values={valueDynamicSelect}
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
        console.log(`discount: ${discount}`)
        return (
            <form className={classes.info_going} onSubmit={handleSubmit(handleSubmitPromocode)}>
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
                        'KRW', 'JPY']} disabled={true}/>
                {sections.date_or_time}
                <InputDate className={classes.date} classInput={classes.date__input}
                        title={sections.title_date}
                        date={dateStart}
                        onChange={setDateStart}
                        />
                {/* ROW */}
                {sections.room_or_tickets}
                {/* ROW */}
                <PromoCode register={register({required: true})} name='promocode' className={classes.code}/>
                <div className={classes.price + ' ' + sections.price_behavior}>
                    <span>Итого</span>
                    <h1>{((discount !== undefined) ?  mathPriceWithDiscount(discount, price) : price) + ' ' + currencyData.name}</h1>
                    
                </div>
            </form>
        );
    }

    return(
        <div className={classes.wrap + ' ' + props.className} id='formBooking'>
            <div className={(countServices <= 0)? classes.booking_off : classes.booking_on}>
                <h1>Нет в наличии 😔</h1>
            </div>
            <div className={classes.booking + ' ' + ((countServices <= 0)? classes.booking_none : '')}>
                {/* SEPARATOR */}
                {GenerateInfoGoing()}
                {/* SEPARATOR */}
                <div className={classes.info_person}>
                    <InputText onChange={setClientid} className={classes.fio} name='clientid' placeholder='Имя и фамилия'/>
                    <InputText onChange={setClientEmail} className={classes.e_mail} name='client_email' placeholder='E-mail'/>
                    <InputText onChange={setClientPhone} className={classes.telephone} name='client_phone' placeholder='Телефон'/>
                    <Button disabled={(clientid == undefined || client_phone == undefined || client_email == undefined)? true : false} type='button' 
                    onClick={()=>setMessage({style: {display: 'grid'}})} className={classes.button} value='Забронировать'/>
                    <small>
                        Нажимая кнопку "Забронировать", вы принимаете <Link href='/terms/[category]' as='/terms/payment'><a>наши условия</a></Link>
                    </small>
                </div>
            </div>
            <PayWindow 
            setFunction={setMessage}
            sum={mathPriceWithDiscount(discount, price)} 
            service_name={title} 
            user_result_callback={url_callback} 
            style={message.style} 
            orderId={orderId}
            clientid={clientid}
            client_email={client_email}
            client_phone={client_phone}
            />
        </div>
        
    )
}

export default FormBooking;