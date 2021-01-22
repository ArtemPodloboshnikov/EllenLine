import React from 'react'
import classes from './FormDBChange.module.css';
import { Switch, Route } from 'react-router-dom'
import Sanatorium from './InsertDB/Sanatorium'

const FormDBChange = () => {
    return (
        <div>
            <Switch>
                <Route path='/admin/db/sanatorium/insert' component={Sanatorium}/>

            </Switch>
        </div>
    )
}

export default FormDBChange
