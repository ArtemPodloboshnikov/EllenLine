import {useEffect} from 'react'
import { sha256 } from 'js-sha256';
//
import Button from '../../CustomElements/Button';
//
import classes from './PayWindow.module.scss';
import messageStyle from './Message.module.scss';

const PayWindow = (props) => {
    const sum = props.sum;
    const title = props.title;
    const orderid = props.orderId;
    const secret_word = 'Saint-Petersburg';
    const user_result_callback = props.user_result_callback;
    const clientid = props.clientid;
    const client_email = props.client_email;
    const client_phone = props.client_phone;
    const sign = (props.style.display != 'none')?sha256(sum + title + orderid + clientid + client_email + client_phone + secret_word) : '';
    console.log(`sign: ${sign}`);
    console.log(`orderid: ${orderid}`)
    return (
        <>
        <div className={messageStyle.window} style={props.style}>
            <div className={messageStyle.title}>
                Бронирование
            </div>
            <form method='POST' action='https://demo.paykeeper.ru/create/' accept-charset="utf-8" className={messageStyle.body}>
                Нажав на эту кнопку вы перейдёте на форму оплаты. Дополнительная информация будет выдана после оплаты.
                <Button className={classes.button} value='Форма оплаты'/>
                <input type='hidden' name='sum' value={sum}/>
                <input type='hidden' name='service_name' value={title}/>
                <input type='hidden' name='user_result_callback' value={user_result_callback}/>
                <input type='hidden' name='clientid' value={clientid}/>
                <input type='hidden' name='client_email' value={client_email}/>
                <input type='hidden' name='client_phone' value={client_phone}/>
                <input type='hidden' name='sign' value={sign}/>
            </form>
            <div>
                <div className={messageStyle.close} onClick={() => props.setFunction({style: {display: 'none'}})}></div>
            </div>
        </div>
        <div className={messageStyle.wrap} style={props.style}>
           
        </div>
    </>
    )
}

export default PayWindow
