import {useState} from 'react';
import classes from './Authorization.module.scss';
import InputText from '../CustomElements/InputText';
import Button from '../CustomElements/Button';
import {useForm} from 'react-hook-form';
import Global from '../../pages/global';
import Message from '../Common/DialogWindow/ShowInfo';

const Authorization = (props) => {

    const {register, handleSubmit} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, title: '', text: ''});

    const handleOnSubmit = (data) => {

        async function verify()
        {
            const res = await fetch(encodeURI(Global.urlServer + `/api/employees?verify=true&login=${data.login}&password=${data.password}`));
            const json = await res.json();
            
            if (json.length)
            {
                props.setAuthorization({isVerify: true, pages: json});
            }
            else
            {
                setMessage({style: {display: 'grid'}, title: 'Что-то не так', text: 'Введённые данные — неверны'})
            }
        }

        verify(data)
    }
    return (
        <>
            <Message setFunction={setMessage} style={message.style} title={message.tilte} text={message.text}/>
            <form className={classes.wrap} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='login' placeholder='Логин'/>
                <InputText register={register({required: true})} name='password' placeholder='Пароль' type='password'/>
                <Button value='Войти'/>
            </form>
        </>
    )
}

export default Authorization
