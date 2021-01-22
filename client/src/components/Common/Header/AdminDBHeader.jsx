import React, {useState} from 'react'
import classes from './AdminDBHeader.module.css';
import { useParams, useHistory, Link } from 'react-router-dom'

const AdminDBHeader = (props) => {
    const [radioChecked, setRadioChecked] = useState('');
    const history = useHistory();
    
   

    let textColor = ['#009BDF', '#009BDF', '#009BDF', '#009BDF'];
    const {category} = useParams();
    console.log(category);
    let queries_none = '';
    switch (category)
    {
        case 'excursions': textColor = ['#333333', '#009BDF', '#009BDF', '#009BDF'];
            break;
        case 'tours': textColor = ['#009BDF', '#333333', '#009BDF', '#009BDF'];
            break;
        case 'sanatorium': textColor = ['#009BDF', '#009BDF', '#333333', '#009BDF'];
            break;
        case 'pension': textColor = ['#009BDF', '#009BDF', '#009BDF', '#333333'];
            break;
    } 
    if (!category) queries_none = classes.queries_none;
    const current_path = '/admin/db/' + category;
   

    if ((radioChecked != '') && (document.location.pathname != (current_path + radioChecked)))
    {
        history.push(current_path + radioChecked);
    }


    
    console.log(document.location.pathname + radioChecked + ' : ' + current_path);
    const radioChange = (e) => {

        
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

    return (
       
        <div className={classes.header}>
            <div className={classes.trips}>
                <Link to='/admin/db/excursions' style={{color: textColor[0]}}>Экскурсии</Link>
                <Link to='/admin/db/tours' style={{color: textColor[1]}}>Туры</Link>
            </div>
            <div className={classes.queries + ' ' + queries_none}>
                    <div>
                        {/* <Link to={current_path + '/insert'}></Link> */}
                        <input type='radio' name='query' id='insert' onChange={radioChange}/>
                        <label className='radio_button' for='insert'>Внести</label>

                    </div>
                    <div>
                        {/* <Link to={current_path + '/update'}></Link> */}
                        <input type='radio' name='query' id='update' onChange={radioChange}/>
                        <label className='radio_button' for='update'>Обновить</label>
                    </div>
                    <div>
                        {/* <Link to={current_path + '/delete'}></Link> */}
                        <input type='radio' name='query' id='delete' onChange={radioChange}/>
                        <label className='radio_button' for='delete'>Удалить</label>
                    </div>
                    
            </div>
            <div className={classes.relax}>
                <Link to='/admin/db/sanatorium' style={{color: textColor[2]}}>Санатории</Link>
                <Link to='/admin/db/pension' style={{color: textColor[3]}}>Пансионаты</Link>
            </div>
        </div>
      
    )
}

export default AdminDBHeader
