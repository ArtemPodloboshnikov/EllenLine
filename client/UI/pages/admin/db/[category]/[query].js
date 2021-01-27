import { useRouter } from 'next/router';
import AdminLayout from '../../../../layouts/AdminLayout';
import Sanatorium from '../../../../components/Admin/FormDB/InsertDB/Sanatorium';
import classes from '../../../../styles/Admin/FormDB/FormDB.module.scss';
import {default as CountriesInsert} from '../../../../components/Admin/FormDB/InsertDB/Countries';
import {default as CountriesUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Countries';
import {default as CountriesDelete} from '../../../../components/Admin/FormDB/DeleteDB/Countries';
import {default as CitiesInsert} from '../../../../components/Admin/FormDB/InsertDB/Cities';
import {default as CitiesUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Cities';
import {default as CitiesDelete} from '../../../../components/Admin/FormDB/DeleteDB/Cities';

export default function QueryDB(){

    const router = useRouter();
    const {category, query} = router.query;
    console.log('category: ' + category + ' query: ' + query);
    return (

        <AdminLayout title='Панель администратора' sector='db'>
           {(()=>{

               switch (category){

                   case 'sanatorium':{

                       switch (query){
                            
                            case 'insert':  return <Sanatorium className={classes.form}/>

                            case 'update': return;

                            case 'delete': return;
                       }
                   }

                   case 'countries':{

                        switch (query){

                            case 'insert':  return <CountriesInsert className={classes.form}/>

                            case 'update': return <CountriesUpdate className={classes.form}/>

                            case 'delete': return <CountriesDelete className={classes.form}/>
                        }
                   }

                   case 'cities':{

                        switch (query){

                            case 'insert':  return <CitiesInsert className={classes.form}/>

                            case 'update': return <CitiesUpdate className={classes.form}/>

                            case 'delete': return <CitiesDelete className={classes.form}/>
                        }
                   }
               }
               
           })()}
        </AdminLayout>

    )


}