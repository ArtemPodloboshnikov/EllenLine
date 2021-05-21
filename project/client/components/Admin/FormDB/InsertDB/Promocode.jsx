import {useEffect, useState} from 'react'
import {get, useForm} from 'react-hook-form';
import Global from '../../../../pages/global';
import classes from '../Common.module.scss';
//
import InputText from '../../../CustomElements/InputText';
import Button from '../../../CustomElements/Button';
import InputNumber from '../../../CustomElements/InputNumber';
import SelectEntered from '../../../CustomElements/SelectEntered';
import Message from '../../../Common/DialogWindow/MessageDB';

const Promocode = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const [formData, setFormData] = useState({});
    const [data, setData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'insert'});

    let categories = {}
    if (Object.keys(data).length)
    {
        data.map((d) =>{

            categories[d.title + ': ' + d.typeOfRoom] = d.id + '_' + d.type;

        })
    }
    const handleOnSubmit = (data) =>{
        data.discount = parseInt(data.discount); 
        const titles = data.titles.split(', ');
        data.pages = [];
        titles.map((title)=>{

            let arr = categories[title].split('_');
            data.pages.push({id: parseInt(arr[0]), type: arr[1]})
        })
        setFormData(data)
    }

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
            
            let array = relax.concat(treatment);
            console.log(array)

            setData(array)
        }

        get();

        console.log(data)

    }, [])

    useEffect(()=>{

        let id_code = 0;

        function update(id_code)
        {
            let fetches = [];

            const promices = formData.pages.map(page=>{
                
                fetch(Global.urlServer + `/api/${page.type}`, {
                    
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({id: page.id, id_promocode: id_code})
                    
                })

            })

            Promise.all(promices);
            
        }
        
        async function insert()
        {
            const res = await fetch(Global.urlServer + '/api/promocode', {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
                
            });
            
            const json = await res.json();
            
            id_code = json.id_code;
            setMessage({style: {display: 'grid'}, status: ((id_code > 0)? 'OK' : 'ERROR'), method: 'insert'});
        }
        

        if (Object.keys(formData).length != 0)
        {
            insert();
            update(id_code);
        }

    }, [formData])

    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='name' 
                placeholder='Название промокода' className={classes.inputText} />
                <InputNumber name='discount' placeholder='Скидка' min={0} max={100} 
                className={classes.inputNumber} classWrap={classes.inputNumber_wrap} register={register({required: true})}/>
                <SelectEntered options={Object.keys(categories)} register={register({required: true})}
                type='multiply' name='titles' className={classes.select} />
                <Button value='Внести' className={classes.button} />
            </form>
        </>
    )
}

export default Promocode
