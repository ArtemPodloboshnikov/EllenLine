import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Global from '../../../../pages/global';
//
import classes from '../Common.module.scss';
//
import SelectEntered from '../../../CustomElements/SelectEntered';
import Message from '../../../Common/DialogWindow/MessageDB';
import Button from '../../../CustomElements/Button';

const DeletePage = (props) => {

    const [dbData, setDbData] = useState({});
    const [formData, setFormData] = useState({});
    const {register, handleSubmit} = useForm();
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [flag, setFlag] = useState(true);
    let namesAndIds = {};
    if (Object.keys(dbData).length != 0)
    {
        dbData.map(data=>{

            if (data.title !== undefined && data.typeOfRoom !== undefined)
            {
                namesAndIds[data.title + ': ' + data.typeOfRoom] = data.id;
            }
            else
            if (data.title !== undefined)
            {
                namesAndIds[data.title] = data.id;
            }
            else
            if (data.name !== undefined)
            {
                namesAndIds[data.name[0].toUpperCase() + data.name.slice(1)] = data.id;
            }
        })
    }

    const handleOnSubmit = (data)=>{

        const id = namesAndIds[data.name];
        setFormData({id: id});
    }

    useEffect(()=>{

        async function deleteFromDB()
        {
            const res = await fetch(Global.urlServer + `/api/${props.category}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });
         
            setMessage({style: {display: 'grid'}, status: res.status});
            setFlag(true);
        }

        if (Object.keys(formData).length != 0)
            deleteFromDB();

    }, [formData])

    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + `/api/${props.category}?only=true`);
            const json = await res.json();
            setDbData(json);
            setFlag(false);
        }
        
        if (flag)
            get();
    }, [])
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method='delete'/>
            <form className={props.className} onSubmit={handleSubmit(handleOnSubmit)}>
                <SelectEntered 
                options={(Object.keys(namesAndIds).length != 0)? Object.keys(namesAndIds): []} 
                placeholder='Название' 
                className={classes.select} 
                register={register({required: true})} 
                name='name'/>
                <Button className={classes.button} classInput={classes.button__text} value='Удалить' />
            </form>
        </>
    )
}

export default DeletePage
