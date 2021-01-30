import AdminHeader from '../components/Common/Header/AdminHeader';
import DbHeader from '../components/Common/Header/DbHeader';
import EmployeesHeader from '../components/Common/Header/EmployeesHeader';
import Head from 'next/head';

export default function AdminLayout ({children, sector, title = 'Эллинлайн'}){

    // const headers = [<AdminHeader/>, <DbHeader/>];
    console.log(sector);

    function ConvertSector(to_sector) {
        switch (to_sector) {
            
            case 'admin': return <AdminHeader/>;    

            case 'db': return <DbHeader/>;

            case 'employees': return headers[2];
        }
    }

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                {ConvertSector(sector)}
                {children}
            </main>
        </>
    )

}