import {useEffect, useState} from 'react';
import jsxToString from 'jsx-to-string';

const TranslatorPage = ({children}) => {

    const [page, setPage] = useState(children); 

    useEffect(()=>{

        async function translatePage(page, lang)
        {
            let json = '';
            
            const res = await fetch(encodeURI(`https://cors-anywhere.herokuapp.com/https://fasttranslator.herokuapp.com/api/v1/text/to/text?source=${page}&lang=${lang}&as=json`), {
                // mode: 'no-cors',
                headers: {
                    // 'Content-Type': 'application/json;charset=utf-8',
                    // 'Accept': 'text/plain',
                    // 'Access-Control-Allow-Origin': '*',
                    'Content-Type': "origin",
                    'Content-Type': "x-requested-with"
                }
                // method: 'GET',
                //body: {source: '<div>Hi</div>', lang: 'en-ru', as: 'json'}
            })
            //console.log(JSON.parse(page))
            json = await res.json();
            console.log(json)
            setPage(json.data);
        }

        //let pattern = /j/gi;
        //page.replace(pattern, )
        if (typeof page === 'object')
        {
            console.log(page)
            console.log(jsxToString(page))
            translatePage(jsxToString(page), 'ru-en')
        }
        
    }, [])
    
    const content = '';
    
    
    
    console.log(page)
    
    return (

        (()=>{

            if (typeof page == 'object')
            {
    
                return page
            }
            else
            {
                
                return <div>{eval(page)}</div>
            }

        })()
        
            
       
    )
}

export default TranslatorPage
