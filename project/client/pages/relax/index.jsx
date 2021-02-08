import ClientLayout from '../../layouts/ClientLayout';
//import CountryDescription from '../Common/countryDescription/countryDescription';
import ChooseResort from './ChooseResort.jsx';
import classes from './index.module.scss';



    
const Relax = () => {
    
    
    return (
        <ClientLayout title='Отдых'>
            <ChooseResort leftText='Пансионаты' rightText='Отели'/>
        </ClientLayout>
    )
}

export default Relax
