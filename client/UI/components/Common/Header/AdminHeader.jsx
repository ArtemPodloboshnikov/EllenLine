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

        <div id='db' onClick={clickOnSector}>
            База данных
        </div>
        <div id='activity' onClick={clickOnSector}>
            Активность на сайте
        </div>
        <div id='orders' onClick={clickOnSector}>
            Заказы
        </div>
        <div id='pages' onClick={clickOnSector}>
            Страницы
        </div>
        <div id='roles' onClick={clickOnSector}>
            Роли
        </div>
        <div id='db' onClick={clickOnSector}>
            Панель бухгалтера
        </div>
    </div>
    );
}

export default AdminHeader
