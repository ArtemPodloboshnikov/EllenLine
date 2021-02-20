import { useRouter } from 'next/router';
import AdminLayout from '../../../layouts/AdminLayout';
import Candidates from '../../../components/Admin/Employees/Candidates';
import List from '../../../components/Admin/Employees/List';
import Roles from '../../../components/Admin/Employees/Roles';
// import classes from '../../../styles/Admin/FormDB/FormDB.module.scss';

export default function Employees(){
    const router = useRouter();
    const {category} = router.query;

    return (
    <AdminLayout title='Сотрудники' sector='employees'>

        {(()=>{
            
            switch (category)
            {
                case 'list': return <List/>;

                case 'roles': return <Roles/>;

                case 'candidates': return <Candidates/>;

            }

        })()}
       
    </AdminLayout>
    )
}