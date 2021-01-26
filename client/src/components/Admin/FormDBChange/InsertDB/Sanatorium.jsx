import React, {useState, useEffect} from 'react'
import classes from './Sanatorium.module.css'
import InputText from '../../../CustomElements/InputText'
import TextArea from '../../../CustomElements/TextArea'
import InputNumber from '../../../CustomElements/InputNumber'
import DynamicList from '../../../CustomElements/DynamicList'
import Button from '../../../CustomElements/Button'
import { useForm } from "react-hook-form";
import Message from '../../../Common/DialogWindow/Message';
import FilesUploader from '../../../CustomElements/FilesUploader'
import EditMap from '../../../Common/Map/EditMap';
import SelectEntered from '../../../CustomElements/SelectEntered'

const Sanatorium = (props) => {
   
    const {register, handleSubmit, errors} = useForm()
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [cityName, setCityName] = useState('Санкт-Петербург');
    const handleOnSubmit = (data)=>{
        console.log(data)
        setFormData(data)
    }

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
       
            // const json =  await fetch('http://localhost:4000/api/sanatoriums', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json;charset=utf-8'
            //     },
            //     body: JSON.stringify(formData)
            // });
            // console.log(json);

            // if (json.status === 404)
            // {
            //     setMessage({style: {display: 'grid'}, status: json.status, body: json.statusText});
            //     console.log(message);
            // }
            
            alert('Data send');
            
        }
        if (Object.keys(formData).length != 0)
        {
            insert()
        }

    }, [formData])
    return (

        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body} />
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='title' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Название санатория'/>
            
                <TextArea register={register({required: true})} name='description'
                className={classes.textarea} classTitle={classes.textarea__title} 
                classTextArea={classes.textarea__text} title='Описание' placeholder='Введите описание'/>

                <InputNumber register={register({required: true})} name='stars' 
                className={classes.inputNumber} placeholder='★' min='1' max='5'/>

                <FilesUploader register={register({required: true})} name='files' 
                className={classes.filesUploader} classInput={classes.filesUploader__text} 
                classPlaceholder={classes.filesUploader__placeholder} placeholder='Фото санатория' />
                
                <SelectEntered register={register({required: true})} name='country' 
                className={classes.select} placeholder='Страна' options={Object.keys(contries_cities.countries)} />

                <SelectEntered register={register({required: true})} name='city' onChangeFunction={setCityName}
                className={classes.select} placeholder='Город' options={Object.keys(contries_cities.cities)} />

                <EditMap cityName={cityName} points={[]} className={classes.map}/>

                <div className={classes.form__services}>
                    <DynamicList name='inStock' register={register({required: true})} className={classes.dynamicList} 
                    classInput={classes.dynamicList__input} placeholder='В наличии'/>
                    <DynamicList name='commonServices' register={register({required: true})} className={classes.dynamicList} 
                    classInput={classes.dynamicList__input} placeholder='Общие услуги'/>
                    <DynamicList name='servicesRoom' register={register({required: true})} className={classes.dynamicList} 
                    classInput={classes.dynamicList__input} placeholder='Услуги в номерах'/>
                </div>

                <Button className={classes.button} classInput={classes.button__text} value='Внести' />
            </form>
        </>
    )
}

export default Sanatorium
