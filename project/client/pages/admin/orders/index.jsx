import AdminLayout from '../../../layouts/AdminLayout';
import {useEffect, useState} from 'react';
import Global from '../../global';
import Table from '../../../components/CustomElements/Table';
import classes from './index.module.scss';

const index = () => {

    const [data, setData] = useState([]);

    // const dateParser = (date) =>{

    //     return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    // }
    // const getTable = (info) =>{

    //     let table = [<tr><th>id</th><th>Название</th><th>Цена</th><th>Клиенты</th><th>Имя заказчика</th><th>Телефон</th><th>Email</th><th>Дата начала</th><th>Дата конца</th><th>Время</th><th>Оплачено</th></tr>];
    //     info.map((i)=>{
            
    //         let date_start = new Date(i.date_start);
    //         date_start = dateParser(date_start);

    //         let date_end = new Date(i.date_end);
    //         date_end = dateParser(date_end);

    //         table.push(<tr><td>{i.id}</td><td>{i.title}</td><td>{i.price}</td><td>{i.clients}</td><td>{i.client_name}</td><td>{i.phone}</td><td>{i.email}</td><td>{date_start}</td><td>{date_end}</td><td>{i.time}</td><td>{(i.isPaid)? 'Да': 'Нет'}</td></tr>);
    //     })
    //     return (

    //         <table className={classes.table}>
    //             {table}
    //         </table>
      

    //     )

    // }
    console.log(data)
    useEffect(()=>{ 

        async function get()
        {
            const res = await fetch(`${Global.urlServer}/api/orders`);
            const json = await res.json();

            setData(json)
        }

        get()

    }, [])

       
    
    return (
        <AdminLayout title='База данных' sector='orders'>
            <Table titles={[{value: 'Название', key: 'title'}, 
                      {value: 'Цена', key: 'price'}, {value: 'Клиенты', key: 'clients'}, 
                      {value: 'Имя заказчика', key: 'client_name'}, {value: 'Телефон', key: 'phone'}, 
                      {value: 'Email', key: 'email'}, {value: 'Дата начала', key: 'date_start'}, 
                      {value: 'Дата конца', key: 'date_end'}, {value: 'Время', key: 'time'}, 
                      {value: 'Оплачено', key: 'isPaid'}]} info={data} className={classes.table}/>
        </AdminLayout>
    )
}

export default index
