import {useContext} from 'react'
import AuthorizationContext from '../../../layouts/authorization';
import classes from './AdminHeader.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminHeader = (props) => {
    
    
    const history = useRouter();
    const {pages, adminPages} = useContext(AuthorizationContext);
    let links = [];
    let jsxStyle = [`'`];
    let indexStyle = 0;
    let indexColumn = 0;
    console.log(pages)
    const clickOnSector = (e) =>{

        switch(e.target.id)
        {
            case 'db': 
                history.push('/admin/db/');
               
                break;
            case 'update': 
                history.push(current_path + '/update');
               
                break;
            case 'delete': 
                history.push(current_path + '/delete');
               
                break;
        }
    }
    for (let page of pages)
    {
      links.push(<Link href={'/admin/' + adminPages[page]}><a className={classes[adminPages[page]]}>{page}</a></Link>);
      if (jsxStyle[indexStyle].split(' ').length == 3)
      {
         jsxStyle[indexStyle] += `'`;
         indexStyle++;
      }
      // jsxStyle[indexStyle] = jsxStyle[indexStyle].substring(0, jsxStyle[indexStyle].length - 1);
      // jsxStyle[indexStyle] += ' ';
      jsxStyle[indexStyle] += `${adminPages[page]}` + ' ';
      if (indexColumn < 3)
         indexColumn++;
    }
   console.log(indexStyle)
    let style = (indexStyle == 3)? {} : {

        gridTemplateRows: `repeat(${indexStyle + 1}, 1fr)`, 
        gridTemplateColumns:  `repeat(${indexColumn}, 1fr)`,
        gridTemplateAreas: `${jsxStyle}`
    
    }
    console.log(style)
    return (
       
    <div className={classes.header_admin} style={style}>
      {links}
      
    </div>
    );
}

export default AdminHeader
