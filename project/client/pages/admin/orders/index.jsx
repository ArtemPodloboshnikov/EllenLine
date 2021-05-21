import AdminLayout from '../../../layouts/AdminLayout';
import {useEffect, useState} from 'react';
import Message from '../../../components/Common/DialogWindow/MessageDB';
import Global from '../../global';
import Table from '../../../components/CustomElements/Table';
import classes from './index.module.scss';

const index = () => {

    const [dbData, setDbData] = useState([]);
    const [indexData, setIndexData] = useState(-1);
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'delete'});

    console.log(dbData)

    useEffect(()=>{ 

        async function deleteOrder()
        {
            const res = await fetch(`${Global.urlServer}/api/orders`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    id: dbData[indexData].id
                })
            })
            setMessage({style: {display: 'grid'}, status: res.status, method: message.method})
            setDbData([]);
            setIndexData(-1);
        }
        if (indexData >= 0)
            deleteOrder()

    }, [indexData])

    useEffect(()=>{ 

        async function get()
        {
            const res = await fetch(`${Global.urlServer}/api/orders`);
            const json = await res.json();

            setDbData(json)
            setIndexData(-2);
        }
        if (indexData == -1 && dbData.length == 0)
            get()

    }, [indexData])

       
    
    return (
        <AdminLayout title='База данных' sector='orders'>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <Table titles={[{value: 'Id', key: 'payment_id'}, {value: 'Название', key: 'title'}, 
                      {value: 'Цена', key: 'price'}, {value: 'Клиенты', key: 'clients'}, 
                      {value: 'Имя заказчика', key: 'client_name'}, {value: 'Телефон', key: 'phone'}, 
                      {value: 'Email', key: 'email'}, {value: 'Дата начала', key: 'date_start'}, 
                      {value: 'Дата конца', key: 'date_end'}, {value: 'Время', key: 'time'}, 
                      {value: 'Оплачено', key: 'isPaid'}]} info={dbData} className={classes.table} ActionButton={({index})=>{
                        return <button onClick={()=>{

                            setIndexData(index);
                            console.log(index)
                        }}><i class="far fa-times-circle"></i></button>
            }}/>
        </AdminLayout>
    )
}

export default index
