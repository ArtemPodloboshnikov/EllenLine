import React, {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/Message';
import { useForm } from "react-hook-form";
import InputText from '../../../CustomElements/InputText';
import SelectEntered from '../../../CustomElements/SelectEntered';
import Button from '../../../CustomElements/Button';
import classes from './Cities.module.css';

const Cities = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});

    let contries_cities = {countries: {}, cities: {}};

    if (Object.keys(dbData).length != 0) 
    {
        console.log(dbData)
        dbData.countries.map(data => {
            contries_cities.countries[data.name] =  data.id;
            
        });
        dbData.cities.map(data => {
            contries_cities.cities[data.name] =  data.id;
        });
    }
    const handleOnSubmit = (data)=>{
        
        data.idCountry = contries_cities.countries[data.country];
        data.idCity = contries_cities.cities[data.city];
        delete data.country;
        delete data.city;
        setFormData(data);
    }
    useEffect(()=>{

        async function get()
        {
            let result = {};
            await fetch('http://localhost:4000/api/countries')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {countries: data};
              });
            await fetch('http://localhost:4000/api/cities')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, cities: data};
              });
            
            setDbData(result);
           
        }
        get();
        
        

    }, [])
    useEffect(()=>{

        async function insert()
        {
       
            const json =  await fetch('http://localhost:4000/api/cities', {
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
    console.log(contries_cities);
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body}/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                
                <SelectEntered register={register({required: true})} name='country' className={classes.select} 
                options={Object.keys(contries_cities.countries)} placeholder='Название страны'/>

                <SelectEntered register={register({required: true})} name='city' className={classes.select} 
                options={Object.keys(contries_cities.cities)} placeholder='Название города'/>
                

                <Button className={classes.button} classInput={classes.button__text} value='Обновить' />
            </form>   
        </>
    )
}

export default Cities
