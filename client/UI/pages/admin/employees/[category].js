import { useRouter } from 'next/router';
import AdminLayout from '../../../layouts/AdminLayout';
import List from '../../../components/Admin/Employees/List';
import classes from '../../../styles/Admin/FormDB/FormDB.module.scss';

export default function Employees(){
    const router = useRouter();
    const {category} = router.query;

    return (
    <AdminLayout title='Сотрудники' sector='employees'>

        {(()=>{
            
            switch (category)
            {
                case 'list': console.log(category); return <List className={classes.form}/>;

                case 'roles': return <p>ddd</p>;

                case 'salary': return; 

            }

        })()}
       
    </AdminLayout>
    )
}