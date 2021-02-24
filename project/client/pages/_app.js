import './../styles/globals.scss';
import Authorization from '../components/Admin/Authorization';
import AuthorizationContext from '../layouts/authorization';
import Error from './_error';
import {useState, useContext} from 'react';
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {
  
  const {isVerify: origin_isVerify, pages: origin_pages} = useContext(AuthorizationContext);
  console.log(origin_isVerify)
  const [authorization, setAuthorization] = useState((origin_isVerify === undefined)?{isVerify: false, pages: ''}: {isVerify: origin_isVerify, pages: origin_pages});
  const router = useRouter();
  const route = router.route;
  
  return (
    <>
      {(()=>{

        let flag = false;
        const adminPages = {'Промокоды': 'promocode', 'Сотрудники': 'employees', 
                              'Заказы': 'orders', 'Трафик': 'traffic', 
                              'Страницы': 'pages', 'Финансы': 'finance', 'База данных': 'db'};

        if (/admin/gi.test(route) && !authorization.isVerify)
        {
          return <Authorization setAuthorization={setAuthorization}/>
        }
        else
        {
          flag = true;
        }

        if (authorization.pages != '')
        {
          flag = false;
          if ((new RegExp('^/admin$')).test(route)) flag = true;

              console.log(flag)
          if (!flag)
          {

            for (let page of authorization.pages)
            {
              const pattern = new RegExp(adminPages[page])
              if (pattern.test(route))
              {
                flag = true;
                break;
              }
            }
          }
          
        }
        if (flag)
        {
          return (
            <AuthorizationContext.Provider value={{pages: authorization.pages, adminPages: adminPages}}>
              <Component {...pageProps}/>
            </AuthorizationContext.Provider>
          )
        }
        else
        {
          return <Error statusCode={403} text={'Доступ запрещён'}/>
        }
      })()}
    </>
  )
}

export default MyApp
