import AdminLayout from '../../../../layouts/AdminLayout';
import {default as PromocodeInsert} from '../../../../components/Admin/FormDB/InsertDB/Promocode';
import {default as PromocodeUpdate} from '../../../../components/Admin/FormDB/UpdateDB/Promocode';
import {default as PromocodeDelete} from '../../../../components/Admin/FormDB/DeleteDB/Promocode';
import {useRouter} from 'next/router';

const index = () => {

    const router = useRouter();
    let content = [];
    switch(router.query.queries)
    {
        case 'insert': content = [<PromocodeInsert/>]; break;

        case 'update': content = [<PromocodeUpdate/>]; break;

        case 'delete': content = [<PromocodeDelete/>]; break;
    }
    console.log(content)
    return (
        <AdminLayout title='Промокоды' sector='promocode'>
           {content}
        </AdminLayout>
    )
}

export default index
