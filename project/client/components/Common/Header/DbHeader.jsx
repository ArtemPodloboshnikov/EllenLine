import classes from './DbHeader.module.scss';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const DbHeader = (props) => {

    
    const history = useRouter();
    let header = [];
    let simple_color = 'rgb(37, 54, 201)';
    let click_color = '#333333';

    switch (props.sector)
    {
        case 'db':{

            const [radioChecked, setRadioChecked] = useState('');
            let textColor = [simple_color, simple_color, simple_color, simple_color, simple_color, simple_color, simple_color];
            const {category} = history.query;
            
        
            let queries_none = '';
            switch (category)
            {
                case 'cruises': textColor[0] = click_color;
                    break;
                case 'tours': textColor[1] = click_color;
                    break;
                case 'relax': textColor[2] = click_color;
                    break;
                case 'treatment': textColor[3] = click_color;
                    break;
                case 'countries': textColor[4] = click_color;
                    break;
                case 'cities': textColor[5] = click_color;
                    break;
                case 'languages': textColor[6] = click_color;
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
                            <label className='radio_button' id='insert' onClick={radioChangeQueries}>Внести</label>
                        </div>
                        <div>
                            <label className='radio_button' id='update' onClick={radioChangeQueries}>Обновить</label>
                        </div>
                        <div>
                            <label className='radio_button' id='delete' onClick={radioChangeQueries}>Удалить</label>
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

            const radioChangeQueries = (e) => {

                
                
                switch(e.target.id)
                {
                    case 'insert': 
                        history.push('/admin/promocode/insert');
                        break;
                    case 'update': 
                        history.push('/admin/promocode/update');
                        break;
                    case 'delete': 
                        history.push('/admin/promocode/delete');
                        break;
                }
            }

            header[0] = (

                <div className={classes.header_promocode + ' ' + classes.header_db__queries}>
                    <div>
                        <label className='radio_button' id='insert' onClick={radioChangeQueries}>Внести</label>
                    </div>
                    <div>
                        <label className='radio_button' id='update' onClick={radioChangeQueries}>Обновить</label>
                    </div>
                    <div>
                        <label className='radio_button' id='delete' onClick={radioChangeQueries}>Удалить</label>
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
                case 'list': linkColors = [simple_color, '#fff', '#fff']; break;

                case 'roles': linkColors = ['#fff', simple_color, '#fff']; break;

                case 'candidates': linkColors = ['#fff', '#fff', simple_color]; break;
            }
            header[0] = (
                <div className={classes.header_employees}>
                <Link href='/admin/employees/list'><a style={{color: linkColors[0]}}>Список</a></Link> 
                <Link href='/admin/employees/roles'><a style={{color: linkColors[1]}}>Роли</a></Link> 
                <Link href='/admin/employees/candidates'><a style={{color: linkColors[2]}}>Кандидаты</a></Link> 
                </div>
            )

            break;
        }

        case 'finance':{

            let linkColors = ['#fff', '#fff', '#fff'];
            const {category} = history.query;
            switch (category)
            {
                case 'list': linkColors = [simple_color, '#fff', '#fff']; break;

                case 'roles': linkColors = ['#fff', simple_color, '#fff']; break;

                case 'candidates': linkColors = ['#fff', '#fff', simple_color]; break;
            }
            header[0] = (
                <div className={classes.header_employees}>
                    <Link href='/admin/finance/list'><a style={{color: linkColors[0]}}>Список</a></Link> 
                    <Link href='/admin/finance/roles'><a style={{color: linkColors[1]}}>Роли</a></Link> 
                    <Link href='/admin/finance/candidates'><a style={{color: linkColors[2]}}>Кандидаты</a></Link> 
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
