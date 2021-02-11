import Global from '../../global';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
//
import ClientLayout from '../../../layouts/ClientLayout';
import {default as TermsComponent} from '../../../components/Terms/Terms';

export default function Terms({data})
{
    const router = useRouter();
    const category = router.query.category;
    const [dbData, setDbData] = useState(data);
    const titles = {payment: 'Условия оплаты'}
    
    useEffect(()=>{

        async function get()
        {
            const res = await fetch(Global.urlServer + '/file/pages' + '?category=' + category);
            const info = await res.json();
            console.log(info)
            setDbData(info)
        }

        if (!data)
        {
            get();
        }

    }, [category])

    return (
        <ClientLayout title={titles[category]} preloader={!dbData}>
            <TermsComponent data={dbData}/>
        </ClientLayout>
    )
}

Terms.getInitialProps = async ({req, query}) =>{

    if (!req)
    {
        return {data: null}
    }

    const res = await fetch(Global.urlServer + '/file/pages' + '?category=' + query.category);
    const info = await res.json();
    console.log(info)
    return {data: info};
}

