import classes from './Candidates.module.scss';
import Table from '../../CustomElements/Table';
import Message from '../../Common/DialogWindow/MessageDB';
import ShowInfo from '../../Common/DialogWindow/ShowInfo';
import Button from '../../../components/CustomElements/Button';
//
import {useEffect, useState} from 'react';
import substitutionIds from '../../../functions/SubstitutionIds';
import { sha256 } from 'js-sha256';
import randomInt from '../../../functions/RandomInt';
import Global from '../../../pages/global';

const Candidates = (props) => {

    
    const [dbData, setDbData] = useState({});
    const [dialogWindow, setDialogWindow] = useState({style: {display: 'none'}, title: '', text: ''})
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'candidate'})
    const [hireClick, setHireClick] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const [indexData, setIndexData] = useState(-1);

    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + '/api/employees?isHire=false');
            const json = await res.json();
            setDbData(json);
            setIndexData(-2);
        } 
        
        if (Object.keys(dbData).length == 0 && indexData == -1)
            get()

    }, [dbData])

    useEffect(()=>{

        if (indexData >= 0)
        {
            
            setDialogWindow({style: {display: 'grid'}, title: dbData[indexData].name, text: (()=>{

                return (
                <div className={classes.message_content}>
                    <Button type='button' value={<i class="fas fa-briefcase"></i>} className={classes.button} onClick={()=>setHireClick(true)}/>
                    <Button type='button' value={<i class="far fa-times-circle"></i>} className={classes.button} onClick={()=>setDeleteClick(true)}/>
                    <input type='hidden' name='index' value={indexData}/>
                </div>
                )

            })()});

            setIndexData(-1);
        }

    }, [indexData])

    useEffect(()=>{

        async function insert(index)
        {
            const hashSum = sha256(dbData[index].phone + dbData[index].email + randomInt(0, 100));
            const start_pos = randomInt(0, (hashSum.length - 1));
            console.log(`random: ${start_pos} password: ${hashSum.substr(start_pos, 7)}`);
            const res = await fetch(Global.urlServer + '/api/employees?hire=true', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({

                    id: dbData[index].id,
                    login: dbData[index].name,
                    password: hashSum.substr(start_pos, 7)
                })
            })
            
            const sendMail = await Email.send({
                Host : "smtp.timeweb.ru",
                Username : "info@ellinline.ru",
                Password : "6ca46WQE",
                To : dbData[index].email,
                From : "info@ellinline.ru",
                Subject : "Вакансия принята!",
                Body : "Вы нам подходите. Мы вам позвоним или пришлём письмо с почты: 7850343@mail.ru"
            })

            if (sendMail == 'OK')
                setDialogWindow({style: {display: 'grid'}, title: 'Письмо отправлено', text: 'Теперь кандидат знает, что его заявку приняли.'});
            setMessage({style: {display: 'grid'}, status: res.status, method: 'candidate'});
            setHireClick(false);
            setIndexData(-1);
            setDbData({})
        }

        async function deleteVacancy(index)
        {
            //Пароль от почтового ящика: 6ca46WQE
            

            const sendMail = await Email.send({
                Host : "smtp.timeweb.ru",
                Username : "info@ellinline.ru",
                Password : "6ca46WQE",
                To : dbData[index].email,
                From : "info@ellinline.ru",
                Subject : "Вакансия отклонена",
                Body : "Вы нам не подходите. Если хотите выяснить причину, то напишите на почту: 7850343@mail.ru"
            })

            if (sendMail == 'OK')
                setDialogWindow({style: {display: 'grid'}, title: 'Письмо отправлено', text: 'Теперь кандидат знает, что его заявку отклонили.'});
            
                const res = await fetch(Global.urlServer + '/api/employees', {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({

                    id: dbData[index].id
                })
            })

            setIndexData(-1);
            setMessage({style: {display: 'grid'}, status: res.status, method: 'delete'});
            setDbData({})
        }

        if (hireClick || deleteClick)
        {

            const index = parseInt(document.getElementsByName('index')[0].value)
    
            if (hireClick)
                insert(index);
            if (deleteClick)
            {
                let isDelete = confirm('Вы точно хотите удалить вакансию?')
                if (isDelete)
                    deleteVacancy(index);
                setDeleteClick(false);
            }
        }
    }, [hireClick, deleteClick])

    return (
        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <ShowInfo setFunction={setDialogWindow} style={dialogWindow.style} title={dialogWindow.title} text={dialogWindow.text}/>
            <Table titles={[{value: 'Имя', key: 'name'}, 
            {value: 'Телефон', key: 'phone'}, {value: 'Email', key: 'email'}, 
            {value: 'Профессия', key: 'profession'}, {value: 'Резюме', key: 'description'}]} 
            info={dbData} className={classes.table} ActionButton={({index})=>{
                return <button onClick={()=>{

                    setIndexData(index);

                }}><i class="fas fa-cog"></i></button>
            }}/>
        </>
    )
}

export default Candidates
