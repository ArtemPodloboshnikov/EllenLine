import {useState, useEffect} from 'react'
import Global from '../../../../pages/global';
import Message from '../../../Common/DialogWindow/MessageDB';
import { useForm } from "react-hook-form";
import InputText from '../../../CustomElements/InputText';
import Button from '../../../CustomElements/Button';
import classes from '../Common.module.scss';

const Languages = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: ''});
    const [formData, setFormData] = useState({}); 

    const handleOnSubmit = (data)=>{
        
        setFormData(data);
    }
    useEffect(()=>{

        async function insert()
        {
       
            const json =  await fetch(Global.urlServer + '/api/languages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });
            

           
            setMessage({style: {display: 'grid'}, status: json.status, method: 'insert'});
            
            
            
            
        }
        if (Object.keys(formData).length != 0)
        {
            insert()
        }

    }, [formData])

    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='name' className={classes.inputText} 
                placeholder='Название языка'/>

                <Button className={classes.button} classInput={classes.button__text} value='Добавить' />
            </form>   
        </>
    )
}

export default Languages
