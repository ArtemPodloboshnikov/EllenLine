import {useEffect, useState} from 'react'
import {get, useForm} from 'react-hook-form';
import Global from '../../../../pages/global';
import classes from './Promocode.module.scss';
//
import InputText from '../../../CustomElements/InputText';
import Button from '../../../CustomElements/Button';
import InputNumber from '../../../CustomElements/InputNumber';
import SelectEntered from '../../../CustomElements/SelectEntered';
import Message from '../../../Common/DialogWindow/Message';

const Promocode = () => {

    const {register, handleSubmit, errors} = useForm();
    const [formData, setFormData] = useState({});
    const [data, setData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'insert'});

    let relax = {}
    if (Object.keys(data).length)
    {
        data.map((d) =>{

            relax[d.title + ': ' + d.typeOfRoom] = d.id;

        })
    }
    const handleOnSubmit = (data) =>{
        data.discount = parseInt(data.discount); 
        const titles = data.titles.split(', ');
        titles.map((title)=>{

            data.ids.push(relax[title])
        })
        setFormData(data)
    }

    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + '/api/relax?only=true')
            const json = await res.json();
            console.log(json)
            setData(json)
        }

        get()

    }, [])

    useEffect(()=>{

        async function insert()
        {
            const res = await fetch(Global.urlServer + '/api/promocode', {

                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)

            });

            setMessage({style: {display: 'grid'}, status: res.status, method: 'insert'});
        }

        if (Object.keys(formData).length != 0)
            insert();

    }, [formData])

    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='name' 
                placeholder='Название промокода' className={classes.input} />
                <InputNumber name='discount' placeholder='Скидка' min={0} max={100} 
                className={classes.number} classWrap={classes.numberWrap} register={register({required: true})}/>
                <SelectEntered options={Object.keys(relax)} 
                type='multiply' name='titles' className={classes.select} />
                <Button value='Внести' className={classes.button} />
            </form>
        </>
    )
}

export default Promocode
