import {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/Message';
import { useForm } from "react-hook-form";
import InputText from '../../../CustomElements/InputText';
import TextArea from '../../../CustomElements/TextArea';
import Button from '../../../CustomElements/Button';
import classes from './Countries.module.css';

const Countries = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [formData, setFormData] = useState({}); 

    const handleOnSubmit = (data)=>{
        
        setFormData(data);
    }
    useEffect(()=>{

        async function insert()
        {
       
            const json =  await fetch('http://localhost:4000/api/countries', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });
            

           
            setMessage({style: {display: 'grid'}, status: json.status, body: json.statusText});
            
            
            
            
        }
        if (Object.keys(formData).length != 0)
        {
            insert()
        }

    }, [formData])

    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body}/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='name' className={classes.inputText} 
                placeholder='Название страны'/>
                
                <TextArea register={register({required: true})} name='description' classTextArea={classes.textarea__text}
                className={classes.textarea} title='Описание' placeholder='Введите описание'/>

                <Button className={classes.button} classInput={classes.button__text} value='Добавить' />
            </form>   
        </>
    )
}

export default Countries
