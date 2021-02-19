import classes from './Candidates.module.scss';
import Table from '../../CustomElements/Table';
import Message from '../../Common/DialogWindow/MessageDB';
//
import {useEffect, useState} from 'react';
import substitutionIds from '../../../functions/SubstitutionIds';
import { sha256 } from 'js-sha256';
import Global from '../../../pages/global';
const Candidates = (props) => {

    
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'candidate'})
    const [idForHire, setIdForHire] = useState(0);
    const [indexData, setIndexData] = useState(0);
    const [originIds, setOriginIds] = useState({});
    
    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + '/api/employees?isHire=false');
            const json = await res.json();
            setDbData(json);
            setOriginIds(substitutionIds(json, 'id'));
            setIndexData(-1);
        } 
        
        if (!Object.keys(dbData).length && indexData >= 0)
            get()

    }, [dbData])

    useEffect(()=>{

        async function insert()
        {
            const res = await fetch(Global.urlServer + '/api/employees?hire=true', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({

                    id: idForHire,
                    login: dbData[indexData].name,
                    password: sha256(dbData[indexData].phone + dbData[indexData].email).substring(0, 7)
                })
            })
        
            setMessage({style: {display: 'grid'}, status: res.status, method: 'candidate'})
            setIdForHire(0);
            setIndexData(0);
            setDbData({})
        }

        if (idForHire)
            insert();
    }, [idForHire])
    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <Table titles={[{value: 'Id', key: 'id'}, {value: 'Имя', key: 'name'}, 
            {value: 'Телефон', key: 'phone'}, {value: 'Email', key: 'email'}, 
            {value: 'Профессия', key: 'profession'}, {value: 'Резюме', key: 'description'}]} 
            info={dbData} className={classes.table} ActionButton={({index})=>{
                return <button onClick={()=>{

                    setIndexData(index);
                    setIdForHire(originIds[index + 1]);

                }}><i class="fas fa-briefcase"></i></button>
            }}/>
        </>
    )
}

export default Candidates
