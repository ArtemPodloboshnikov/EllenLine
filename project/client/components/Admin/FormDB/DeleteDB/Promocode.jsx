import {useEffect, useState} from 'react'
import {get, useForm} from 'react-hook-form';
import Global from '../../../../pages/global';
import classes from '../Common.module.scss';
//
import SelectEntered from '../../../CustomElements/SelectEntered';
import Button from '../../../CustomElements/Button';
import Message from '../../../Common/DialogWindow/MessageDB';

const Promocode = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [formData, setFormData] = useState({});
    const [data, setData] = useState({})
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'delete'});
    
    let code = {};
    if (Object.keys(data).length != 0)
    {
        data.map((promo)=>{

            code[promo.name] = {id: promo.id};

        })
    }
    const handleOnSubmit = (data) =>{
        
        data.id = code[data.promocode].id;
        setFormData(data)
    }

    
    console.log(code)
    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + '/api/promocode')
            const json = await res.json();
            console.log(json)
            setData(json)
        }

        get()

    }, [])

    useEffect(()=>{

        async function deleteDB()
        {
            const res = await fetch(Global.urlServer + '/api/promocode', {

                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)

            });

            setMessage({style: {display: 'grid'}, status: res.status, method: 'delete'});
        }

        if (Object.keys(formData).length != 0)
            deleteDB();

    }, [formData])
 
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={props.className} onSubmit={handleSubmit(handleOnSubmit)}>
                <SelectEntered register={register({required: true})} name='promocode'
                placeholder='Название промокода' className={classes.select} options={Object.keys(code)}/>
    
                <Button value='Удалить' className={classes.button} />
            </form>
        </>
    )
}

export default Promocode
