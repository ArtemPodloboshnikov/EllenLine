import classes from './DbHeader.module.scss';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Button from '../../CustomElements/Button';
import Link from 'next/link';

const DbHeader = (props) => {

    
    const history = useRouter();
    let header = [];
    let simple_color = 'rgb(37, 54, 201)';
    let click_color = '#333333';
    let sub_color = '#fff';
    let textShadow = `1px 0 0 ${click_color}, -1px 0 0 ${click_color}, 0 1px 0 ${click_color}, 0 -1px 0 ${click_color}, 1px 1px ${click_color}, -1px -1px 0 ${click_color}, 1px -1px 0 ${click_color}, -1px 1px 0 ${click_color}`;
    const backFunction = ()=>{
        console.log(history)
        let address = history.route.split('/');
        address.pop();
        const lastWord = address[address.length - 1];
        if (lastWord.charAt(0) == '[' && lastWord.charAt(lastWord.length - 1) == ']')
        {
            address[address.length - 1] = history.query[lastWord.substr(1, lastWord.length - 2)]
        }
        address = address.join('/');
        history.push(address)
    }

    const standartLayout = (link1, link2, link3)=>{

        let linkColors = ['#fff', '#fff', '#fff'];
        const category = (history.query.category !== undefined)? history.query.category : history.query.queries;
        switch (category)
        {
            case 'insert':
            case 'list': linkColors = [textShadow, 'none', 'none']; break;

            case 'update':
            case 'roles': linkColors = ['none', textShadow, 'none']; break;

            case 'delete':
            case 'candidates': { linkColors = ['none', 'none', textShadow]; break; }
        }
        return (
            <div className={classes.header_standart}>
                <Button className={classes.arrow_back} onClick={()=>backFunction()} value={<i class="fa fa-arrow-left" aria-hidden="true"></i>}/>
                <Link href={link1.url}><a style={{textShadow: linkColors[0]}}>{link1.text}</a></Link> 
                <Link href={link2.url}><a style={{textShadow: linkColors[1]}}>{link2.text}</a></Link> 
                <Link href={link3.url}><a style={{textShadow: linkColors[2]}}>{link3.text}</a></Link> 
            </div>
        )
    }

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
                <div className={classes.back}>
                    <Button className={classes.arrow_back} onClick={()=>backFunction()} value={<i class="fa fa-arrow-left" aria-hidden="true"></i>}/>
                </div>
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
                            <label className='radio_button' id='insert' style={(()=>{ if (radioChecked == '/insert') return {textShadow: textShadow}})()} onClick={radioChangeQueries}>Внести</label>
                        </div>
                        <div>
                            <label className='radio_button' id='update' style={(()=>{ if (radioChecked == '/update') return {textShadow: textShadow}})()} onClick={radioChangeQueries}>Обновить</label>
                        </div>
                        <div>
                            <label className='radio_button' id='delete' style={(()=>{ if (radioChecked == '/delete') return {textShadow: textShadow}})()} onClick={radioChangeQueries}>Удалить</label>
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

            header[0] = standartLayout({url: '/admin/promocode/insert', text: 'Внести'}, 
                                       {url: '/admin/promocode/update', text: 'Обновить'}, 
                                       {url: '/admin/promocode/delete', text: 'Удалить'});

            break;
        }

        case 'employees':{

            header[0] = standartLayout({url: '/admin/employees/list', text: 'Список'}, 
                                       {url: '/admin/employees/roles', text: 'Роли'}, 
                                       {url: '/admin/employees/candidates', text: 'Кандидаты'});

            break;
        }

        case 'finance':
        case 'pages':
        case 'orders':{

            header[0] = (
            <div className={classes.header_empty}>
                <Button className={classes.arrow_back} onClick={()=>backFunction()} value={<i class="fa fa-arrow-left" aria-hidden="true"></i>}/>
            </div>
            )

            break;
        }
        
    }

    return (
        <>
            {header}
        </>
    )
}

export default DbHeader
