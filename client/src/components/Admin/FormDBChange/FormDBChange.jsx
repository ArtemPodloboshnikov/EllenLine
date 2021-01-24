import React from 'react'
import classes from './FormDBChange.module.css';
import { Switch, Route } from 'react-router-dom';
import Sanatorium from './InsertDB/Sanatorium';
import {default as CountriesInsert} from './InsertDB/Countries';
import {default as CountriesUpdate} from './UpdateDB/Countries';
import {default as CountriesDelete} from './DeleteDB/Countries';
import {default as CitiesInsert} from './InsertDB/Cities';
import {default as CitiesUpdate} from './UpdateDB/Cities';
import {default as CitiesDelete} from './DeleteDB/Cities';

const FormDBChange = () => {
    return (
        <div>
            <Switch>
                <Route path='/admin/db/sanatorium/insert' component={()=><Sanatorium className={classes.form}/>}/>
                <Route path='/admin/db/countries/insert' component={()=><CountriesInsert className={classes.form}/>}/>
                <Route path='/admin/db/countries/update' component={()=><CountriesUpdate className={classes.form}/>}/>
                <Route path='/admin/db/countries/delete' component={()=><CountriesDelete className={classes.form}/>}/>
                <Route path='/admin/db/cities/insert' component={()=><CitiesInsert className={classes.form}/>}/>
                <Route path='/admin/db/cities/update' component={()=><CitiesUpdate className={classes.form}/>}/>
                <Route path='/admin/db/cities/delete' component={()=><CitiesDelete className={classes.form}/>}/>
            </Switch>
        </div>
    )
}

export default FormDBChange
