import classes from './EmployeesHeader.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EmployeesHeader = () => {

    const router = useRouter();
    const {category} = router.query;
    let linkColors = ['#0062FF', '#0062FF', '#0062FF'];

    switch (category)
    {
        case 'list': linkColors[0] = '#333333';

        case 'roles': linkColors[1] = '#333333';

        case 'salary': linkColors[2] = '#333333';
    }
    return (
        <div className={classes.header}>
           <Link href='/admin/employees/list'><a style={{color: linkColors[0]}}>Список</a></Link> 
           <Link href='/admin/employees/roles'><a style={{color: linkColors[1]}}>Роли</a></Link> 
           <Link href='/admin/employees/salary'><a style={{color: linkColors[2]}}>Кандидаты</a></Link> 
        </div>
    )
}

export default EmployeesHeader
