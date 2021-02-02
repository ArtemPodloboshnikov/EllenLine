import ClientLayout from '../layouts/ClientLayout';
import { useEffect, useState } from 'react';
import Home from './home/index.jsx';

// Стоит выделить Home в отдельный компонент в папку Home, вместе со стилями
// СКАЗАНО СДЕЛАННО
export default function App(){

    const [data, setData] = useState({advantages: [], services: []});
    // useEffect(() => 
    // {
    //     // Обновляем заголовок документа, используя API браузера

    //     async function getData()
    //     {
    
    //       const response =  await fetch('http://localhost:4000/file/getHomePage');
    //       const json = await response.json();
    //       setData(json);
    //     }

    //     getData();
    // }, []);

    console.log(data);

    return <Home/>
}
