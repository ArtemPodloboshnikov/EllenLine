import { useRouter } from 'next/router';
import AdminLayout from '../../../../layouts/AdminLayout';
import classes from '../../../../styles/FormDB.module.scss';
import {default as RelaxInsert} from '../../../../components/Admin/FormDB/InsertDB/Relax';
import {default as RelaxUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Relax';
import {default as CountriesInsert} from '../../../../components/Admin/FormDB/InsertDB/Countries';
import {default as CountriesUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Countries';
import {default as CountriesDelete} from '../../../../components/Admin/FormDB/DeleteDB/Countries';
import {default as CitiesInsert} from '../../../../components/Admin/FormDB/InsertDB/Cities';
import {default as CitiesUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Cities';
import {default as CitiesDelete} from '../../../../components/Admin/FormDB/DeleteDB/Cities';
import {default as LanguagesInsert} from '../../../../components/Admin/FormDB/InsertDB/Languages';
import {default as LanguagesDelete} from '../../../../components/Admin/FormDB/DeleteDB/Languages';
import {default as ToursInsert} from '../../../../components/Admin/FormDB/InsertDB/Tours';
import {default as TreatmentInsert} from '../../../../components/Admin/FormDB/InsertDB/Treatment';

export default function QueryDB(){

    const router = useRouter();
    const {category, query} = router.query;
 
    return (

        <AdminLayout title='База данных' sector='db'>
           {(()=>{

               switch (category){

                   case 'relax':{

                       switch (query){
                            
                            case 'insert':  return <RelaxInsert className={classes.form}/>

                            case 'update': return <RelaxUpdate className={classes.form}/>

                            case 'delete': return;
                       }
                   }
                   case 'treatment':{

                        switch (query){
                            
                            case 'insert':  return <TreatmentInsert className={classes.form}/>

                            case 'update': return;

                            case 'delete': return;
                        }
                   }
                   case 'cruises':{

                        switch (query){
                            
                            case 'insert':  return <Relax className={classes.form}/>

                            case 'update': return;

                            case 'delete': return;
                        }
                   }
                   case 'tours':{

                        switch (query){
                            
                            case 'insert':  return <ToursInsert className={classes.form}/>

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

                   case 'languages':{

                        switch (query){

                            case 'insert':  return <LanguagesInsert className={classes.form}/>

                            case 'update': return;

                            case 'delete': return <LanguagesDelete className={classes.form}/>
                        }
                   }
               }
               
           })()}
        </AdminLayout>

    )


}