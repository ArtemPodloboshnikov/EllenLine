import AdminHeader from '../components/Common/Header/AdminHeader';
import DbHeader from '../components/Common/Header/DbHeader';
import EmployeesHeader from '../components/Common/Header/EmployeesHeader';
import Head from 'next/head';

export default function AdminLayout ({children, sector, title = 'Эллинлайн'}){

    const headers = [<AdminHeader/>, <DbHeader/>, <EmployeesHeader/>];
    console.log(sector)
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                {(()=>{

                   switch (sector){
                       
                       case 'admin': return headers[0];
  
                       case 'db': return headers[1];

                       case 'employees': return headers[2];
                   }
                })()}
               
                {children}
            </main>
        </>
    )

}