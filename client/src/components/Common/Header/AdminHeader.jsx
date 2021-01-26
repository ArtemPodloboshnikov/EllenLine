import React, {useState} from 'react'
import classes from './AdminHeader.module.css';
import { useParams, useHistory, Link } from 'react-router-dom'

const AdminHeader = (props) => {
    const [radioChecked, setRadioChecked] = useState('');
    const history = useHistory();
    
   

    let textColor = ['#0062FF', '#0062FF', '#0062FF', '#0062FF', '#0062FF', '#0062FF', '#0062FF'];
    const {sector, category} = useParams();
    console.log(sector);
   
    let queries_none = '';
    switch (category)
    {
        case 'excursions': textColor[0] = '#333333';
            break;
        case 'tours': textColor[1] = '#333333';
            break;
        case 'sanatorium': textColor[2] = '#333333';
            break;
        case 'pension': textColor[4] = '#333333';
            break;
        case 'countries': textColor[4] = '#333333';
            break;
        case 'cities': textColor[5] = '#333333';
            break;
        case 'languages': textColor[6] = '#333333';
            break;
    } 
    
    if (!category) queries_none = classes.header_db__queries_none;
    const current_path = '/admin/db/' + category;
   

    if ((radioChecked != '') && (document.location.pathname != (current_path + radioChecked)))
    {
        history.push(current_path + radioChecked);
    }


    
   // console.log(document.location.pathname + radioChecked + ' : ' + current_path);
    const radioChangeQueries = (e) => {

        
        switch(e.target.id)
        {
            case 'insert': 
                history.push(current_path + '/insert');
                setRadioChecked('/insert'); 
                break;
            case 'update': 
                history.push(current_path + '/update');
                setRadioChecked('/update');  
                break;
            case 'delete': 
                history.push(current_path + '/delete');
                setRadioChecked('/delete');  
                break;
        }
        console.log(e.target.id)
    }
    const clickOnSector = (e) =>{

        switch(e.target.id)
        {
            case 'db': 
                history.push('/admin/db/');
                //setRadioChecked('/insert'); 
                break;
            case 'update': 
                history.push(current_path + '/update');
                setRadioChecked('/update');  
                break;
            case 'delete': 
                history.push(current_path + '/delete');
                setRadioChecked('/delete');  
                break;
        }
    }
    let content = [];
    content[0] = (<div className={classes.header_db}>
        <div className={classes.header_db__parameters}>
            <Link to='/admin/db/countries' style={{color: textColor[4]}}>Страны</Link>
            <Link to='/admin/db/cities' style={{color: textColor[5]}}>Города</Link>
            <Link to='/admin/db/languages' style={{color: textColor[6]}}>Языки</Link>
        </div>
        <div className={classes.header_db__trips}>
            <Link to='/admin/db/excursions' style={{color: textColor[0]}}>Экскурсии</Link>
            <Link to='/admin/db/tours' style={{color: textColor[1]}}>Туры</Link>
        </div>
        <div className={classes.header_db__queries + ' ' + queries_none}>
                <div>
                    <input type='radio' name='query' id='insert' onChange={radioChangeQueries}/>
                    <label className='radio_button' for='insert'>Внести</label>

                </div>
                <div>
                    <input type='radio' name='query' id='update' onChange={radioChangeQueries}/>
                    <label className='radio_button' for='update'>Обновить</label>
                </div>
                <div>
                    <input type='radio' name='query' id='delete' onChange={radioChangeQueries}/>
                    <label className='radio_button' for='delete'>Удалить</label>
                </div>
                
        </div>
        <div className={classes.header_db__relax}>
            <Link to='/admin/db/sanatorium' style={{color: textColor[2]}}>Санатории</Link>
            <Link to='/admin/db/pension' style={{color: textColor[3]}}>Пансионаты</Link>
        </div>
    </div>)

    content[1] = (<div className={classes.header_admin}>

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
                    Что-то ещё
                </div>
    </div>);

    return (()=>{

        console.log(sector);
        if (sector === undefined)
        {
            return content[1];
        }
        else 
        if (sector == 'db') 
        {
            return content[0];
        }

    })();
}

export default AdminHeader
