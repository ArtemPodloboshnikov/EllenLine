import {useState} from 'react'
import classes from './AdminHeader.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminHeader = (props) => {
    
    
    const history = useRouter();
   
    const clickOnSector = (e) =>{

        switch(e.target.id)
        {
            case 'db': 
                history.push('/admin/db/');
               
                break;
            case 'update': 
                history.push(current_path + '/update');
               
                break;
            case 'delete': 
                history.push(current_path + '/delete');
               
                break;
        }
    }


    return (
    <div className={classes.header_admin}>

        <Link href='/admin/db'>
           <a>База данных</a>
        </Link>
        <Link href='/admin/activity'>
           <a>Активность на сайте</a>
        </Link>
        <Link href='/admin/orders'>
           <a>Заказы</a>
        </Link>
        <Link href='/admin/pages'>
           <a>Страницы</a>
        </Link>
        <Link href='/admin/employees'>
           <a>Сотрудники</a>
        </Link>
        <Link href='/admin/accountant'>
           <a>Панель бухгалтера</a>
        </Link>
    </div>
    );
}

export default AdminHeader
