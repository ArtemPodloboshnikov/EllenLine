import AdminLayout from '../../../../layouts/AdminLayout';
import classes from '../../../../styles/FormDB.module.scss'
import {default as PromocodeInsert} from '../../../../components/Admin/FormDB/InsertDB/Promocode';
import {default as PromocodeUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Promocode';
import {default as PromocodeDelete} from '../../../../components/Admin/FormDB/DeleteDB/Promocode';
import {useRouter} from 'next/router';

const index = () => {

    const router = useRouter();
    let content = [];
    switch(router.query.queries)
    {
        case 'insert': content = [<PromocodeInsert className={classes.form}/>]; break;

        case 'update': content = [<PromocodeUpdate className={classes.form}/>]; break;

        case 'delete': content = [<PromocodeDelete className={classes.form}/>]; break;
    }
    console.log(content)
    return (
        <AdminLayout title='Промокоды' sector='promocode'>
           {content}
        </AdminLayout>
    )
}

export default index
