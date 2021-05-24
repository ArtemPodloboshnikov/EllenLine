import {useEffect, useState} from 'react'
import {get, useForm} from 'react-hook-form';
import Global from '../../../../pages/global';
import classes from '../Common.module.scss';
//
import SelectEntered from '../../../CustomElements/SelectEntered';
import InputText from '../../../CustomElements/InputText';
import Button from '../../../CustomElements/Button';
import InputNumber from '../../../CustomElements/InputNumber';
import Message from '../../../Common/DialogWindow/MessageDB';

const Promocode = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [formData, setFormData] = useState({});
    const [data, setData] = useState({})
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'update'});
    
    let code = {};
    let categories = {}
    if (Object.keys(data).length != 0)
    {
        data.promocode.map((promo)=>{

            code[promo.name] = {id: promo.id, discount: promo.discount};

        })
        data.categories.map((d) =>{

            categories[d.title + ': ' + d.typeOfRoom] = d.id + '_' + d.type;

        })
    }
    const handleOnSubmit = (data) =>{
        
        data.id = code[data.promocode].id;
        data.discount = parseInt(data.discount); 

        const titles = data.titles.split(', ');
        data.pages = [];
        titles.map((title)=>{

            let arr = categories[title].split('_');
            data.pages.push({id: parseInt(arr[0]), type: arr[1]})
        })
        setFormData(data)
    }

    
    console.log(code)
    useEffect(()=>{

        function typeField(arr, type)
        {   
            arr.map(obj=>{

                obj.type = type;
            })
        }

        async function get()
        {

            let res = await fetch(Global.urlServer + '/api/relax?only=true')
            let relax = await res.json();
            typeField(relax, 'relax');
            
            res = await fetch(Global.urlServer + '/api/treatment?only=true')
            let treatment = await res.json();
            typeField(treatment, 'treatment')
            
            let obj = {};
            obj.categories = relax.concat(treatment);
            
            res = await fetch(Global.urlServer + '/api/promocode')
            let promocode = await res.json();
            obj.promocode = promocode;
            console.log(obj)
            setData(obj)
        }

        get()

    }, [])

    useEffect(()=>{

        function updatePages(id_code)
        {
            let fetches = [];

            formData.pages.map(page=>{
                
                fetch(Global.urlServer + `/api/${page.type}`, {
                    
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({id: page.id, id_promocode: id_code})
                    
                })

            })

            
        }

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
            updatePages(formData.id)
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
                placeholder='Новое название' className={classes.inputText} value={name}/>
                
                <InputNumber name='discount' placeholder='Скидка' min={0} max={100} value={discount}
                className={classes.inputNumber} classWrap={classes.inputNumber_wrap} register={register({required: true})}/>
                
                <SelectEntered options={Object.keys(categories)} register={register({required: true})}
                type='multiply' name='titles' className={classes.select} />
               
                <Button value='Обновить' className={classes.button} />
            </form>
        </>
    )
}

export default Promocode
