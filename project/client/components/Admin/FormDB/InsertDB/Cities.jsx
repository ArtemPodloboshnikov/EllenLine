import {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/Message';
import { useForm } from "react-hook-form";
import InputText from '../../../CustomElements/InputText';
import SelectEntered from '../../../CustomElements/SelectEntered';
import Button from '../../../CustomElements/Button';
import classes from './Cities.module.scss';

const Cities = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: ''});
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});

    let countries = [];

    if (Object.keys(dbData).length != 0) 
    {
        dbData.map(country => {
            countries[country.name] = country.id
        });
    }
    const handleOnSubmit = (data)=>{
        
        data.idCountry = countries[data.country];
        delete data.name; //FIXME Where from 'name' is define?
        setFormData(data);
    }
    useEffect(()=>{

        async function get()
        {
            await fetch('http://localhost:4000/api/countries')
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
    //console.log(dbData);
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                
                <SelectEntered register={register({required: true})} name='country' className={classes.select} 
                options={Object.keys(countries)} placeholder='Название страны'/>

                <InputText register={register({required: true})} name='city' className={classes.inputText} 
                placeholder='Название города'/>
                

                <Button className={classes.button} classInput={classes.button__text} value='Добавить' />
            </form>   
        </>
    )
}

export default Cities
