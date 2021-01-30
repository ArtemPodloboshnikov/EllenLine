import {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/Message';
import { useForm } from "react-hook-form";
import SelectEntered from '../../../CustomElements/SelectEntered';
import Button from '../../../CustomElements/Button';
import classes from './Languages.module.css';

const Languages = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});

    let nameLanguagesIds = {};

    if (Object.keys(dbData).length != 0)
    {
        dbData.map((language)=>{

            nameLanguagesIds[language.name[0].toUpperCase() + language.name.slice(1)] = language.id;
        })
    }
    const handleOnSubmit = (data)=>{
        
        data.id = nameLanguagesIds[data.language];
        delete data.language;
        setFormData(data);
        
    }

    useEffect(()=>{

        async function get()
        {
            await fetch('http://localhost:4000/api/languages')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                setDbData(data);
              });
            

            
            
        }
        get();
        
        

    }, [])

    useEffect(()=>{

        async function delete_row()
        {
       
            const json =  await fetch('http://localhost:4000/api/languages', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });
            

           
            setMessage({style: {display: 'grid'}, status: json.status, body: json.statusText, method: 'delete'});
            
            
            
            
        }
        if (Object.keys(formData).length != 0)
        {
            delete_row();
        }

    }, [formData])
    
    return (
        <>
            <Message setFunction={setMessage} style={message.style} 
            status={message.status} body={message.body} method={message.method}/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <SelectEntered register={register({required: true})} name='language'
                className={classes.select} placeholder='Язык' options={Object.keys(nameLanguagesIds)} />
                   
                <Button className={classes.button} value='Удалить' />
            </form>   
        </>
    )
}

export default Languages
