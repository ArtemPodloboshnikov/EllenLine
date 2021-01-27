import {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/Message';
import { useForm } from "react-hook-form";
import SelectEntered from '../../../CustomElements/SelectEntered';
import Button from '../../../CustomElements/Button';
import classes from './Cities.module.css';

const Cities = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});

    let cities = [];

    if (Object.keys(dbData).length != 0) 
    {
        dbData.map(city => {
            cities[city.name] = city.id
        });
    }
    const handleOnSubmit = (data)=>{
        
        data.id = cities[data.city];
        delete data.city;
        setFormData(data);
    }
    useEffect(()=>{

        async function get()
        {
            await fetch('http://localhost:4000/api/cities')
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

        async function insert()
        {
       
            const json =  await fetch('http://localhost:4000/api/cities', {
                method: 'DELETE',
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
    //console.log(dbData);
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body}/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
               
                <SelectEntered register={register({required: true})} name='city' className={classes.select} 
                options={Object.keys(cities)} placeholder='Название города'/>

                <Button className={classes.button} classInput={classes.button__text} value='Удалить' />
            </form>   
        </>
    )
}

export default Cities
