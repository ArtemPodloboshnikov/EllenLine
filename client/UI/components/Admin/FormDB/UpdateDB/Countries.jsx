import React, {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/Message';
import { useForm } from "react-hook-form";
import SelectEntered from '../../../CustomElements/SelectEntered';
import TextArea from '../../../CustomElements/TextArea';
import Button from '../../../CustomElements/Button';
import classes from './Countries.module.scss';

const Countries = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});
    const [textAreaValue, setTextAreaValue] = useState();

    let countries = {Россия: ''};
    let nameCountryIds = {};
    console.log(dbData)
    if (Object.keys(dbData).length != 0)
    {
        dbData.map((country)=>{

            countries[country.name] = country.description;
            nameCountryIds[country.name] = country.id;
        })
    }
    const handleOnSubmit = (data)=>{
        
        data.id = nameCountryIds[data.country];
        delete data.country;
        setFormData(data);
        
    }

    useEffect(()=>{

        async function get()
        {
            await fetch('http://localhost:4000/api/countries?with=description')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                  console.log(data)
                setDbData(data);
              });
            
            
            
            
        }
        get();
        
        

    }, [])

    useEffect(()=>{

        async function insert()
        {
       
            const json =  await fetch('http://localhost:4000/api/countries', {
                method: 'PUT',
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
            <Message setFunction={setMessage} style={message.style} 
            status={message.status} body={message.body}/>
            <form className={classes.form + ' ' + props.className} onSubmit={handleSubmit(handleOnSubmit)}>
                <SelectEntered register={register({required: true})} name='country'
                className={classes.select} placeholder='Страна' options={Object.keys(countries)} />
                
                <TextArea classTextArea={classes.textarea} register={register({required: true})} name='description'
                className={classes.textarea} title='Описание' placeholder='Введите описание' value={textAreaValue} setValue={setTextAreaValue}/>

                <div className={classes.buttons}>
                    <Button type='button' setFunction={setTextAreaValue} data={countries} nameOfLink='country'
                    className={classes.button_description} classInput={classes.button__text} value='Получить описание' />
                    <Button className={classes.button_change} classInput={classes.button__text} value='Изменить' />
                </div>
            </form>   
        </>
    )
}

export default Countries
