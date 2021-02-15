import classes from './PromocodeHeader.module.scss';
import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const PromocodeHeader = () => {

    const history = useRouter();
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
    console.log(radioChecked)

    return (
        <div className={classes.header}>
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
}

export default PromocodeHeader
