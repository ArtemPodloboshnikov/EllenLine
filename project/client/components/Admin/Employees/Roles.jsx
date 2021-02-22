import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import Global from '../../../pages/global';
//
import classForm from '../../../styles/FormDB.module.scss';
import classes from './Roles.module.scss';
//
import ShowInfo from '../../Common/DialogWindow/ShowInfo';
import Message from '../../Common/DialogWindow/MessageDB';
import SelectEntered from '../../CustomElements/SelectEntered';
import InputText from '../../CustomElements/InputText';
import Button from '../../CustomElements/Button';
import Table from '../../CustomElements/Table';

const Roles = () => {

    const {register: registerDelete, handleSubmit: handleSubmitDelete} = useForm();
    const {register: registerEdit, handleSubmit: handleSubmitEdit} = useForm();
    const {register: registerAdd, handleSubmit: handleSubmitAdd} = useForm();
    const {register: registerGive, handleSubmit: handleSubmitGive} = useForm();
    const arrowSize = [40, 40];
    
    const [dialogWindow, setDialogWindow] = useState({style: {display: 'none'}, title: '', text: ''})
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'update'})
    const [indexData, setIndexData] = useState(-1);
    const [roles, setRoles] = useState({});
    const [dbData, setDbData] = useState({});
    const [currentRole, setCurrentRole] = useState([]);
    const pagesAll = ['Промокоды', 'Сотрудники', 'Заказы', 'Трафик', 'Страницы', 'Финансы', 'База данных', '*'];
    let rolesNameId = {};
    let rolesNamePages = {};
    
    const rolesPages = (roleName) =>{
        
        return rolesNamePages[roleName];
    }
    function updateDataBeforeActionOfForm(status, method)
    {
        setMessage({style: {display: 'grid'}, status: status, method: method})
        setIndexData(-1);
        setDbData({});
    }
    function whichPages(data, changeField)
    {
        data.pages = data[changeField];
        delete data[changeField];

        if (data.pages == '*')
        {
            const pages_all = [...pagesAll].filter((page) => page !== '*');
            data.pages = pages_all;
        } 
        else
        {

            data.pages = data.pages.split(', ');
        }
    }
    
    if (Object.keys(roles).length != 0)
    {
        let rolesIdName = {}
        roles.map((role)=>{

            rolesNameId[role.name] = role.id;
            rolesNamePages[role.name] = role.pages;
            rolesIdName[role.id] = role.name;
        })

        
        Object.values(dbData).map((employee)=>{

            employee.role = rolesIdName[employee.id_role];
        }) 

    }
    console.log(rolesNameId)
    let rolesName = Object.keys(rolesNameId) || [];

    const handleAdd = (data) =>{

        
        whichPages(data, 'pagesInsert');
        
        async function add(info)
        {
            const res = await fetch(Global.urlServer + '/api/roles', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(info)
            });
            updateDataBeforeActionOfForm(res.status, 'insert');
        }

        add(data);
    }
    const handleEdit = (data) =>{

        let temp_data = {...data};
        data.id = rolesNameId[temp_data.name];
        data.name = temp_data.newName;
        delete data.newName;
        whichPages(data, 'pagesUpdate');
        console.log(data)
        async function edit(info)
        {
            const res = await fetch(Global.urlServer + '/api/roles', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(info)
            });

            updateDataBeforeActionOfForm(res.status, 'update');
            
        }

        edit(data)
    }
    
    const handleDelete = (data) =>{

        data.id = rolesNameId[data.nameDelete];
        delete data.nameDelete;
       
        async function deleteData(info)
        {
            const res = await fetch(Global.urlServer + '/api/roles', {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(info)
            });

            updateDataBeforeActionOfForm(res.status, 'delete');
            
        }

        deleteData(data)
    }

    const handleGive = (data) =>{
        console.log(data)
        data.id_role = rolesNameId[data.nameGive];
        delete data.nameGive;
        
        async function update(info)
        {
            const res = await fetch(Global.urlServer + '/api/employees?idRole=true', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(info)
            });

            updateDataBeforeActionOfForm(res.status, 'update');
            setDialogWindow({style: {display: 'none'}, title: '', text: ''})
        }

        update(data)
    }
    useEffect(()=>{

        async function get()
        {
            let res = await fetch(Global.urlServer + '/api/employees?for=roles');
            let json = await res.json();
            setDbData(json);

            res = await fetch(Global.urlServer + '/api/roles');
            json = await res.json();
            setRoles(json);
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
                <form className={classes.message_content} onSubmit={handleSubmitGive(handleGive)}>
                    <SelectEntered className={classes.select} type='select' name='nameGive' arrowSize={arrowSize}
                    register={registerGive({required: true})} options={rolesName} placeholder='Роли'/>
                    <Button value='Изменить' className={classes.button}/>
                    <input type='hidden' name='id_employee' ref={registerGive({required: true})} value={dbData[indexData].id}/>
                </form>
                )

            })()});

            setIndexData(-2)
        }

    }, [indexData])

    return (
        <>
            <div className={classes.forms}>
                <form className={classForm.form + ' ' + classes.form} onSubmit={handleSubmitDelete(handleDelete)}>
                    <SelectEntered arrowSize={arrowSize} className={classes.select} type='select' name='nameDelete' 
                    register={registerDelete({required: true})} options={rolesName} placeholder='Роли'/>
                    <Button className={classes.button} value='Удалить роль'/>
                </form>   
                <form className={classForm.form + ' ' + classes.form} onSubmit={handleSubmitEdit(handleEdit)}>
                    <SelectEntered className={classes.inputText} arrowSize={arrowSize}  register={registerEdit({required: true})}
                    name='name' placeholder='Название роли' options={rolesName} onChangeFunction={(obj)=>setCurrentRole(obj.value)}/>
                    <InputText className={classes.inputText} register={registerEdit({required: true})} 
                    name='newName' placeholder='Новое название' value={currentRole}/>
                    <SelectEntered className={classes.select} type='multiply' name='pagesUpdate' arrowSize={arrowSize}
                    register={registerEdit({required: true})} options={pagesAll} value={rolesPages(currentRole)} placeholder='Страницы'/>
                    <Button className={classes.button} value='Изменить роль'/>
                </form>   
                <form className={classForm.form + ' ' + classes.form} onSubmit={handleSubmitAdd(handleAdd)}>
                    <InputText className={classes.inputText} register={registerAdd({required: true})} 
                    name='name' placeholder='Название роли'/>
                    <SelectEntered className={classes.select} type='multiply' name='pagesInsert' arrowSize={arrowSize}
                    register={registerAdd({required: true})} options={pagesAll} placeholder='Страницы'/>
                    <Button className={classes.button} value='Добавить роль'/>
                </form>   
            </div>

            <Message setFunction={setMessage} status={message.status} method={message.method} style={message.style}/>
            <ShowInfo setFunction={setDialogWindow} style={dialogWindow.style} title={dialogWindow.title} text={dialogWindow.text}/>
            <Table titles={[{value: 'Имя', key: 'name'}, {value: 'Профессия', key: 'profession'}, {value: 'Роль', key: 'role'}]} 
            info={dbData} className={classes.table} ActionButton={({index})=>{
                return <button onClick={()=>{

                    setIndexData(index)

                }}><i class="fas fa-cog"></i></button>
            }}/>
        </>
    )
}

export default Roles
