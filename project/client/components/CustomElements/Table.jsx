import {useState} from 'react'
import ShowInfo from '../Common/DialogWindow/ShowInfo';
import dateParser from '../../functions/DateParser';
import classes from './Table.module.scss';

const Table = ({titles, info, className, ActionButton}) => {

    if (Object.keys(info).length)
    {
        const [message, setMessage] = useState({style: {display: 'none'}, text: '', title: ''});
        const [searchValues, setSearchValues] = useState(
            
            (()=>{

                let result = [];
                titles.map((title)=>{
                    
                    result.push('');
                })

                return result;

            })()
        );
        let values = Object.values(info);

        let table = [];
        let search_inputs = [];
        for (let i = 0; i < Object.keys(titles).length; i++)
        {

            search_inputs.push(<td><input value={searchValues[i]} onChange={(e)=>{
                
                let temp_searchValues = [...searchValues];
                temp_searchValues[i] = e.target.value;
                setSearchValues(temp_searchValues);

            }} placeholder='Поиск'/></td>);

        }
        
        let titles_content = [];
        Object.values(titles).map((title)=>{

            titles_content.push(<th>{title.value}</th>);

        })
        
        if (ActionButton !== undefined)
        {
            titles_content.push(<th></th>);
            search_inputs.push(<td></td>);
        }
        table[0] = [<tr>{titles_content}</tr>];
        table[1] = [<tr>{search_inputs}</tr>];
    
        for (let i = 0; i < values.length; i++)
        {
            
    
            let table_content = [];
            let flags = [true];
            for (let j = 0; j < Object.keys(titles).length; j++)
            {
                
                let value = values[i][titles[j].key];
                const patternDate = new RegExp('date', 'gi');
                const patternTime = new RegExp('time', 'gi');

                if (searchValues[j] != '')
                {
                    const patternSearch = new RegExp(`${searchValues[j]}`, 'gi');
                  
                    if (patternSearch.test(value))
                    {
                        flags.push(true);
                    }
                    else
                    {
                        flags.push(false);
                    }

                }

                if (patternDate.test(titles[j].key))
                {
                    value = dateParser(value);
                }
                else
                if (patternTime.test(titles[j].key))
                {
                    if (value !== null)
                    {
                        
                        value = value.split(':');
                        value = value[0] + ':' + value[1]
                    }
                    else
                    {
                        value = '';
                    }
                }
                else
                if (titles[j].key == 'isPaid')
                {
                    value = (value)? 'Да' : 'Нет';
                }
                else
                if (value !== undefined && value !== null)
                {
                    
                    if (value.length > 20)
                    {
                        let text = value;
                        const onClick = ()=>setMessage({style: {display: 'grid'}, text: text, title: titles[j].value})
                        value = <button onClick={onClick}><i class="fas fa-file-alt"></i></button>
                    }
                }

                table_content.push(<td>{value}</td>)
            }

            let isSearched = true;
            for (let flag of flags)
            {

                if (flag == false)
                {
                    isSearched = false;
                    break;
                }
            }

            
            if (isSearched)
            {
                if (ActionButton !== undefined)
                {
                    table_content.push(<td><ActionButton index={i}/></td>)
                }

                table.push(<tr>{table_content}</tr>)
            } 
            //table.push(<tr><td>{i.id}</td><td>{i.title}</td><td>{i.price}</td><td>{i.clients}</td><td>{i.client_name}</td><td>{i.phone}</td><td>{i.email}</td><td>{date_start}</td><td>{date_end}</td><td>{i.time}</td><td>{(i.isPaid)? 'Да': 'Нет'}</td></tr>);
        }
        return (
            <>
                <ShowInfo setFunction={setMessage} style={message.style} title={message.title} text={message.text}/>
                <table className={className + ' ' + classes.table}>
                    {table}
                </table>
            </>
        )
    }
    else
    {
        return <table></table>
    }

}

export default Table
