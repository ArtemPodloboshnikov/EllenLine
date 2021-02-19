import {useState} from 'react'
import {useForm} from 'react-hook-form';
import Global from '../global';
//
import ClientLayout from '../../layouts/ClientLayout';
import TextArea from '../../components/CustomElements/TextArea';
import InputText from '../../components/CustomElements/InputText';
import Button from '../../components/CustomElements/Button';
import Message from '../../components/Common/DialogWindow/MessageDB';
//
import classes from './index.module.scss';
import classForm from '../../styles/FormDB.module.scss';

const Vacancy = () => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'vacancy'})
    const handleOnSubmit = (data) =>{

        async function insert()
        {
            const res = await fetch(Global.urlServer + '/api/employees', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })

            console.log(res)
            setMessage({style: {display: 'grid'}, status: res.status, method: 'vacancy'})
        }

        insert();

    }

    return (
        <ClientLayout title='Вакансии' description='Оставьте свою вакансию для турфирмы "Эллинлайн"' keywords='вакансии, менеджер, бухгалтер'>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={classForm.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText placeholder='ФИО' name='name' className={classes.inputText} register={register({required: true})}/>
                <InputText placeholder='Телефон' name='phone' className={classes.inputText + ' ' + classes.inputText_top} register={register({required: true})}/>
                <InputText placeholder='Email' name='email' className={classes.inputText + ' ' + classes.inputText_top} register={register({required: true})}/>
                <InputText placeholder='Профессия' name='profession' className={classes.inputText + ' ' + classes.inputText_top} register={register({required: true})}/>
                <TextArea title='Резюме' placeholder='Расскажите о себе' name='description' classTextArea={classes.textarea_text}
                register={register({required: true})} className={classes.textarea}/>
                <Button value='Отправить' className={classes.button}/>
            </form>
        </ClientLayout>
    )
}

export default Vacancy;