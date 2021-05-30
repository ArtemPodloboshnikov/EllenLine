import React from 'react'
import classes from './Clients.module.scss';
import MediaQuery from 'react-responsive';

const Clients = () => {
    return (
        <div className="section">
            <div className='section__title_right'>
                <p>Наши клиенты</p>
            </div>
            <MediaQuery query="(min-device-width: 1433px)">
                <div className={ classes.clients + ' ' + classes.clients_border}>
                    <div className={ classes.clients__content }>
                        <img src='images/ldpr.png'/>
                        <img src='images/sr.png'/>
                        <img src='images/minnesota.png'/>
                        <img src='images/gazprom.png'/>
                        <img src='images/un.svg'/>
                        <img src='images/rosmorport.png'/>
                        <img src='images/dhl.png' className={ classes.dhl_margin }/>
                        <img src='images/friedrich_ebert.png' className={ classes.friedrichEbert_column }/>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 1433px)">
                <div className={ classes.clients__content }>
                    <img src='images/ldpr.png'/>
                    <img src='images/sr.png'/>
                    <img src='images/minnesota.png'/>
                    <img src='images/gazprom.png'/>
                    <img src='images/un.svg'/>
                    <img src='images/rosmorport.png'/>
                    <img src='images/dhl.png'/>
                    <img src='images/friedrich_ebert.png'/>
                </div>
            </MediaQuery>
            
        </div>
    )
}

export default Clients
