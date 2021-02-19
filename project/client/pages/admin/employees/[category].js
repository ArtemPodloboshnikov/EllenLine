import { useRouter } from 'next/router';
import AdminLayout from '../../../layouts/AdminLayout';
import Candidates from '../../../components/Admin/Employees/Candidates';
// import classes from '../../../styles/Admin/FormDB/FormDB.module.scss';

export default function Employees(){
    const router = useRouter();
    const {category} = router.query;

    return (
    <AdminLayout title='Сотрудники' sector='employees'>

        {(()=>{
            
            switch (category)
            {
                case 'list': return <Candidates/>;

                case 'roles': return <p>ddd</p>;

                case 'candidates': return <Candidates/>;

            }

        })()}
       
    </AdminLayout>
    )
}