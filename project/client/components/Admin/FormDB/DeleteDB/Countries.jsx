import {useState, useEffect} from 'react'
import Message from '../../../Common/DialogWindow/MessageDB';
import { useForm } from 'react-hook-form';
import SelectEntered from '../../../CustomElements/SelectEntered';
import Button from '../../../CustomElements/Button';
import classes from './Countries.module.scss';

const Countries = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});

    let nameCountryIds = {};

    if (Object.keys(dbData).length != 0)
    {
        dbData.map((country)=>{

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

        async function delete_row()
        {
       
            const json =  await fetch('http://localhost:4000/api/countries', {
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
            delete_row();
        }

    }, [formData])
    
    return (
        <>
            <Message setFunction={setMessage} style={message.style} 
            status={message.status} body={message.body}/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <SelectEntered register={register({required: true})} name='country'
                className={classes.select} placeholder='Страна' options={Object.keys(nameCountryIds)} />
                   
                <Button className={classes.button} value='Удалить' />
            </form>   
        </>
    )
}

export default Countries
