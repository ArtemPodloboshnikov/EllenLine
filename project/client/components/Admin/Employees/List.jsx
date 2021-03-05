import classes from './List.module.scss';
import {useEffect, useState} from 'react';

const List = (props) => {

    const [formData, setFormData] = useState();
    const [dbData, setDbData] = useState();
    useEffect(()=>{

        fetch('http://localhost:4000/api/employees')
        .then(response=>{

            return response.json();
        })
        .then(data=>{


        })

    }, [])
    return (
        <form className={props.className + ' ' + classes.form}>
            dsds
        </form>
    )
}

export default List
