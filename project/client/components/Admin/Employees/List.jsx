import classes from './List.module.scss';
import Table from '../../CustomElements/Table';
import ShowInfo from '../../Common/DialogWindow/ShowInfo';
import Message from '../../Common/DialogWindow/MessageDB';
import Button from '../../../components/CustomElements/Button';
import InputText from '../../../components/CustomElements/InputText';
import InputNumber from '../../CustomElements/InputNumber';
//
import {useEffect, useState} from 'react';
import Global from '../../../pages/global';
const Candidates = (props) => {

    
    const [dbData, setDbData] = useState({});
    const [dialogWindow, setDialogWindow] = useState({style: {display: 'none'}, title: '', text: ''})
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'update'})
    const [indexData, setIndexData] = useState(-1);
    const [changeClick, setChangeClick] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    useEffect(() =>{

        async function update(data)
        {
            const res = await fetch(Global.urlServer + '/api/employees?changeData=true', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            
            setDialogWindow({style: {display: 'none'}, title: '', text: ''});
            setMessage({style: {display: 'grid'}, status: res.status, method: 'update'});
            setChangeClick(false);
            setIndexData(-1);
            setDbData({});
        }

        async function deleteVacancy(index)
        {
           
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
            setDialogWindow({style: {display: 'none'}, title: '', text: ''});
            setMessage({style: {display: 'grid'}, status: res.status, method: 'delete'});
            setDbData({})
        }

        if (changeClick || deleteClick)
        {
            const index = document.getElementsByName('index')[0].value;
            let login = document.getElementsByName('login')[0].value;
            let password = document.getElementsByName('password')[0].value;
            let salary = document.getElementsByName('salary')[0].value
            const employeeId = dbData[index].id;

            if (login == '')
            {
                login = dbData[index].login;
            }
            if (password == '')
            {
                password = dbData[index].password;
            }
            if (salary == '')
            {
                salary = dbData[index].salary;
            }

            if (changeClick)
                update({login: login, password: password, salary: salary, id: employeeId})
            if (deleteClick)
            {
                let isDelete = confirm('Вы точно хотите уволить этого сотрудника?')
                if (isDelete)
                    deleteVacancy(index);
                setDeleteClick(false);
            }
            console.log(`login: ${login} password: ${password}`)
            
            

        }

    }, [changeClick, deleteClick])
    console.log(dbData)
    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + '/api/employees?isHire=true');
            const json = await res.json();
            setDbData(json);
            setIndexData(-2);
        } 
        
        if (!Object.keys(dbData).length && indexData == -1)
            get()

    }, [dbData])

    useEffect(()=>{

        if (indexData >= 0)
        {
            console.log(dbData[indexData].name)
            setDialogWindow({style: {display: 'grid'}, title: dbData[indexData].name, text: (()=>{

                return (
                <div className={classes.message_content}>
                    <InputText placeholder='Логин' name='login' className={classes.inputText}/>
                    <InputText type='password' placeholder='Пароль' name='password' className={classes.inputText}/>
                    <InputNumber placeholder='Зарплата' name='salary' value={dbData[indexData].salary} min={0} max={10000000000}
                    className={classes.inputNumber + ' ' + classes.input_top} classWrap={classes.inputNumberWrap + ' ' + classes.input_top}/>
                    <Button type='button' value='Изменить' className={classes.button + ' ' + classes.input_top} onClick={()=>setChangeClick(true)}/>
                    <Button type='button' value='Удалить' className={classes.button + ' ' + classes.input_top} onClick={()=>setDeleteClick(true)}/>
                    <input type='hidden' name='index' value={indexData}/>
                    
                </div>
                )

            })()});

            setIndexData(-2)
        }

    }, [indexData])
    return (
        <>
            <Message setFunction={setMessage} status={message.status} method={message.method} style={message.style}/>
            <ShowInfo setFunction={setDialogWindow} style={dialogWindow.style} title={dialogWindow.title} text={dialogWindow.text}/>
            <Table titles={[{value: 'Имя', key: 'name'}, 
            {value: 'Телефон', key: 'phone'}, {value: 'Email', key: 'email'}, 
            {value: 'Профессия', key: 'profession'}, {value: 'Резюме', key: 'description'}, 
            {value: 'Зарплата', key: 'salary'}, {value: 'Логин', key: 'login'},
            {value: 'Пароль', key: 'password'}]} 
            info={dbData} className={classes.table} ActionButton={({index})=>{
                return <button onClick={()=>{

                    setIndexData(index)

                }}><i class="fas fa-cog"></i></button>
            }}/>
        </>
    )
}

export default Candidates
