import {useEffect, useState} from 'react'
import {get, useForm} from 'react-hook-form';
import Global from '../../../../pages/global';
import classes from './Promocode.module.scss';
//
import SelectEntered from '../../../CustomElements/SelectEntered';
import InputText from '../../../CustomElements/InputText';
import Button from '../../../CustomElements/Button';
import InputNumber from '../../../CustomElements/InputNumber';
import Message from '../../../Common/DialogWindow/Message';

const Promocode = () => {

    const {register, handleSubmit, errors} = useForm();
    const [formData, setFormData] = useState({});
    const [data, setData] = useState({})
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'update'});
    
    let code = {};
    if (Object.keys(data).length != 0)
    {
        data.map((promo)=>{

            code[promo.name] = {id: promo.id, discount: promo.discount};

        })
    }
    const handleOnSubmit = (data) =>{
        
        data.id = code[data.promocode].id;
        data.discount = parseInt(data.discount); 
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

        async function update()
        {
            const res = await fetch(Global.urlServer + '/api/promocode', {

                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)

            });

            setMessage({style: {display: 'grid'}, status: res.status, method: 'update'});
        }

        if (Object.keys(formData).length != 0)
            update();

    }, [formData])
    console.log(discount)
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <SelectEntered register={register({required: true})} name='promocode' onChangeFunction={(obj) => {
                    setName(obj.value);
                    setDiscount(code[obj.value].discount);
                }}
                placeholder='Название промокода' className={classes.select} options={Object.keys(code)}/>
                <InputText register={register({required: true})} name='name'
                placeholder='Новое название' className={classes.input} value={name}/>
                <InputNumber name='discount' placeholder='Скидка' min={0} max={100} value={discount}
                className={classes.number} classWrap={classes.numberWrap} register={register({required: true})}/>
                <Button value='Обновить' className={classes.button} />
            </form>
        </>
    )
}

export default Promocode
