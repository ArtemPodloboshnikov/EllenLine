import { useRouter } from 'next/router';
import AdminLayout from '../../../../layouts/AdminLayout';
import classes from '../../../../styles/FormDB.module.scss';
import {default as RelaxInsert} from '../../../../components/Admin/FormDB/InsertDB/Relax';
import {default as CountriesInsert} from '../../../../components/Admin/FormDB/InsertDB/Countries';
import {default as CitiesInsert} from '../../../../components/Admin/FormDB/InsertDB/Cities';
import {default as CitiesUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Cities';
import {default as LanguagesInsert} from '../../../../components/Admin/FormDB/InsertDB/Languages';
import {default as ToursInsert} from '../../../../components/Admin/FormDB/InsertDB/Tours';
import {default as TreatmentInsert} from '../../../../components/Admin/FormDB/InsertDB/Treatment';
import {default as CruisesInsert} from '../../../../components/Admin/FormDB/InsertDB/Cruises';
import UpdatePage from '../../../../components/Admin/FormDB/UpdateDB/UpdatePage';
import DeletePage from '../../../../components/Admin/FormDB/DeleteDB/DeletePage'; 

export default function QueryDB(){

    const router = useRouter();
    const {category, query} = router.query;
 
    return (

        <AdminLayout title='База данных' sector='db'>
           {(()=>{

               switch (category){

                   case 'relax':{

                       switch (query){
                            
                            case 'insert':  return <RelaxInsert className={classes.form}/>;

                            case 'update': return <UpdatePage className={classes.form} 
                                                    category={category} 
                                                    table={[{value: 'Название', key: 'title'}, {value: 'Цена', key: 'price'}, 
                                                    {value: 'Скидка', key: 'discount'}, {value: 'Звёзды', key: 'stars'}, 
                                                    {value: 'Описание', key: 'description'}, {value: 'Тип', key: 'type'}, 
                                                    {value: 'Тип комнаты', key: 'typeOfRoom'}, {value: 'Город', key: 'city'}, 
                                                    {value: 'Адрес', key: 'address'}, {value: 'Услуги', key: 'services'},
                                                    {value: 'Количество', key: 'count'}, {value: 'Кл. мест', key: 'count_people'},
                                                    {value: 'Условия оплаты', key: 'payment_term'}]}/>;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                       }
                   }
                   case 'treatment':{

                        switch (query){
                            
                            case 'insert':  return <TreatmentInsert className={classes.form}/>;

                            case 'update': return <UpdatePage className={classes.form} 
                                                    category={category} 
                                                    table={[{value: 'Название', key: 'title'}, {value: 'Цена', key: 'price'}, 
                                                    {value: 'Скидка', key: 'discount'}, {value: 'Условия оплаты', key: 'payment_term'},
                                                    {value: 'Описание', key: 'description'}, {value: 'Тип', key: 'type'}, 
                                                    {value: 'Тип комнаты', key: 'typeOfRoom'}, {value: 'Город', key: 'city'}, 
                                                    {value: 'Адрес', key: 'address'}, {value: 'Программа лечения', key: 'program'},
                                                    {value: 'Кл. мест', key: 'count_people'}, {value: 'Услуги', key: 'services'},
                                                    {value: 'Количество', key: 'count'}]}/>;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                        }
                   }
                   case 'cruises':{

                        switch (query){
                            
                            case 'insert':  return <CruisesInsert className={classes.form}/>;

                            case 'update': return <UpdatePage className={classes.form} 
                                                    category={category} 
                                                    table={[{value: 'Название', key: 'title'}, {value: 'Тип', key: 'titleOfCompany'},
                                                    {value: 'Цена', key: 'price'}, {value: 'Скидка', key: 'discount'}, 
                                                    {value: 'Условия оплаты', key: 'payment_term'}, {value: 'Описание', key: 'description'}, 
                                                    {value: 'Тип', key: 'type'}, {value: 'Тип коробля', key: 'typeOfShip'},  
                                                    {value: 'Тип каюты', key: 'typeOfRoom'}, {value: 'Город', key: 'city'}, 
                                                    {value: 'Адрес', key: 'address'}, {value: 'Кл. кают', key: 'count'},
                                                    {value: 'Кл. мест', key: 'count_people'}, {value: 'Услуги', key: 'services'}]}/>;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                        }
                   }
                   case 'tours':{

                        switch (query){
                            
                            case 'insert':  return <ToursInsert className={classes.form}/>;

                            case 'update': return;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                        }
                   }
                   case 'countries':{

                        switch (query){

                            case 'insert':  return <CountriesInsert className={classes.form}/>;

                            case 'update': return;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                        }
                   }

                   case 'cities':{

                        switch (query){

                            case 'insert':  return <CitiesInsert className={classes.form}/>;

                            case 'update': return <CitiesUpdate className={classes.form}/>;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                        }
                   }

                   case 'languages':{

                        switch (query){

                            case 'insert':  return <LanguagesInsert className={classes.form}/>;

                            case 'update': return;

                            case 'delete': return <DeletePage category={category} className={classes.form}/>;
                        }
                   }
               }
               
           })()}
        </AdminLayout>

    )


}