import React from 'react'
import classes from './Services.module.css';
import MediaQuery from 'react-responsive';

const Services = () => {
    return (
        <div className="section">
            <div className="section__title_left">
                <p>Наши услуги</p>
            </div>
            <div className={ classes.services }>
            <MediaQuery query="(min-device-width: 1433px)">
                <div className={ classes.services__block + ' ' + classes.block__template_right }>
                    <div className={classes.block__image} style={{backgroundImage: 'url(' + 'images/Home/pansionate.jpg' + ')'}}>
                       
                    </div>
                    
                    <div className={classes.block__text + ' ' + classes.block__text_left}>
                        <p>Мы сотрудничаем с огромным количесвом пансионатов, санаториев и гостинниц. Вы обязательно найдёте место, в котором смогли бы восстановить свои силы.</p>
                    </div>
                    <div className={ classes.block__number }>
                      
                        <p>1</p>
                        
                    </div>
                </div>
                <div className={ classes.services__block + ' ' + classes.block__template_left }>
                    <div className={classes.block__image} style={{backgroundImage: 'url(' + 'images/Home/excursions.jpg' + ')'}}>
                       
                    </div>
                    
                    <div className={classes.block__text + ' ' + classes.block__text_right}>
                        <p>Наши экскурсоводы – профессионалы своего дела. Они знают то, о чём говорят и будут рады поделится этим с вами.</p>
                    </div>
                    <div className={ classes.block__number }>
                      
                        <p>2</p>
                        
                    </div>
                </div>
                <div className={ classes.services__block + ' ' + classes.block__template_right }>
                    <div className={classes.block__image} style={{backgroundImage: 'url(' + 'images/Home/cruise.jpg' + ')'}}>
                       
                    </div>
                    
                    <div className={classes.block__text + ' ' + classes.block__text_left}>
                        <p>Наши круизы откроют вам великолепные пейзажи. Берите с собой фотоаппарат, если не хотите забыть подобное.</p>
                    </div>
                    <div className={ classes.block__number }>
                      
                        <p>3</p>
                        
                    </div>
                </div>
                <div className={ classes.services__block + ' ' + classes.block__template_left }>
                    <div className={classes.block__image} style={{backgroundImage: 'url(' + 'images/Home/map.png' + ')'}}>
                       
                    </div>
                    
                    <div className={classes.block__text + ' ' + classes.block__text_right}>
                        <p>В мире ещё столько всего интересного. Пора наконец окрыть горизонты! У нас вы сможите найти любую страну. Осталось лишь забронировать отель ; )</p>
                    </div>
                    <div className={ classes.block__number }>
                      
                        <p>4</p>
                        
                    </div>
                </div>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1433px)">
                    <div className={ classes.services__block }>
                        <div className={ classes.block__ImageText } style={{backgroundImage: 'url(' + 'images/Home/map.png' + ')'}}>
                            <p>В мире ещё столько всего интересного. Пора наконец окрыть горизонты! У нас вы сможите найти любую страну. Осталось лишь забронировать отель ; )</p>
                        </div>
                    </div>
                </MediaQuery>
            </div>
           
          
            
        </div>
    )
}

export default Services
