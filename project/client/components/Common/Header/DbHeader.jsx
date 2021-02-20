import classes from './DbHeader.module.scss';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const DbHeader = (props) => {

    
    const history = useRouter();
    let header = [];
   

    switch (props.sector)
    {
        case 'db':{

            const [radioChecked, setRadioChecked] = useState('');
            let textColor = ['#0062FF', '#0062FF', '#0062FF', '#0062FF', '#0062FF', '#0062FF', '#0062FF'];
            const {category} = history.query;
            
        
            let queries_none = '';
            switch (category)
            {
                case 'cruises': textColor[0] = '#333333';
                    break;
                case 'tours': textColor[1] = '#333333';
                    break;
                case 'relax': textColor[2] = '#333333';
                    break;
                case 'treatment': textColor[3] = '#333333';
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
        
        
            
            console.log(radioChecked);
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
            // console.log(e.target.id)
            }

            header[0] = (
            <div className={classes.header_db}>
                <div className={classes.header_db__parameters}>
                    <Link href='/admin/db/countries'><a style={{color: textColor[4]}}>Страны</a></Link>
                    <Link href='/admin/db/cities'><a style={{color: textColor[5]}}>Города</a></Link>
                    <Link href='/admin/db/languages'><a style={{color: textColor[6]}}>Языки</a></Link>
                </div>
                <div className={classes.header_db__trips}>
                    <Link href='/admin/db/cruises'><a style={{color: textColor[0]}}>Круизы</a></Link>
                    <Link href='/admin/db/tours'><a style={{color: textColor[1]}}>Туры</a></Link>
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
                    <Link href='/admin/db/relax'><a style={{color: textColor[2]}}>Отдых</a></Link>
                    <Link href='/admin/db/treatment'><a style={{color: textColor[3]}}>Лечение</a></Link>
                </div>
            </div>
            )

            break;
        }
        case 'promocode':{

            const [radioChecked, setRadioChecked] = useState([false, false, false]);

            const radioChangeQueries = (e) => {

                let temp_radioChecked = [];
                
                switch(e.target.id)
                {
                    case 'insert': 
                        history.push('/admin/promocode/insert');
                        temp_radioChecked = [true, false, false];
                        setRadioChecked(temp_radioChecked); 
                        break;
                    case 'update': 
                        history.push('/admin/promocode/update');
                        temp_radioChecked = [false, true, false];
                        setRadioChecked(temp_radioChecked);  
                        break;
                    case 'delete': 
                        history.push('/admin/promocode/delete');
                        temp_radioChecked = [false, false, true];
                        setRadioChecked(temp_radioChecked);  
                        break;
                }
            }

            header[0] = (

                <div className={classes.header_promocode + ' ' + classes.header_db__queries}>
                    <div>
                        <input type='radio' name='query' id='insert' checked={radioChecked[0]} onChange={radioChangeQueries}/>
                        <label className='radio_button' for='insert'>Внести</label>
                    </div>
                    <div>
                        <input type='radio' name='query' id='update' checked={radioChecked[1]} onChange={radioChangeQueries}/>
                        <label className='radio_button' for='update'>Обновить</label>
                    </div>
                    <div>
                        <input type='radio' name='query' id='delete' checked={radioChecked[2]} onChange={radioChangeQueries}/>
                        <label className='radio_button' for='delete'>Удалить</label>
                    </div>
                </div>
            )

            break;
        }

        case 'employees':{

            let linkColors = ['#fff', '#fff', '#fff'];
            const {category} = history.query;
            switch (category)
            {
                case 'list': linkColors = ['#FFDD00', '#fff', '#fff']; break;

                case 'roles': linkColors = ['#fff', '#FFDD00', '#fff']; break;

                case 'candidates': linkColors = ['#fff', '#fff', '#FFDD00']; break;
            }
            header[0] = (
                <div className={classes.header_employees}>
                <Link href='/admin/employees/list'><a style={{color: linkColors[0]}}>Список</a></Link> 
                <Link href='/admin/employees/roles'><a style={{color: linkColors[1]}}>Роли</a></Link> 
                <Link href='/admin/employees/candidates'><a style={{color: linkColors[2]}}>Кандидаты</a></Link> 
                </div>
            )
        }
        
    }

    return (
        <>
            {header}
        </>
    )
}

export default DbHeader
