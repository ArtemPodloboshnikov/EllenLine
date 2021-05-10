import React from 'react';
//
import PresentationMap from '../Map/PresentationMap';
//
import classes from './Providers.module.scss';
//
import iconsMaker from '../../../functions/IconsMaker';

//В основном для пансионатов с санаториями
const Providers = (props) => {
    //#region Обязательные параметр
    const services = props.services;
    const address = props.address;
    //Переменная определяющая тип постороенния секции сервисов
    const type = props.type;
    //#endregion
    console.log(services)
    //tours, cruises
    const info = props.info;
    //tours
    const points = props.points;
    const program = props.program;
   
    
    function GenerateSections() {
    
        //#region For all type
        function ConvertServices(service) {
            const massiv = services[service];
            console.log()
            const elements = [];
            massiv.map(element => {
                let icon = iconsMaker(element, false, 'primary')
                let res = '';
                if (typeof icon == 'string')
                {
                    res = <i class={icon} aria-hidden="true"></i>
                }
                else
                {
                    res = <div className={classes.icon}>{icon}</div>
                }
                elements.push(res);
                elements.push(<p>{element}</p>);
            });
            return elements;
        }

        function GenerateSection(section, className = '') {
            return <>
                <h1>{section.title}</h1>
                <div className={classes.service + ' ' + className}>
                    {section.content}
                </div>
            </>
        }
        //#endregion

        //#region For cruises
        function ConvertShipInfo() {
            const words = 
            [ 
                ['Год постройки:', ' г.'],
                ['Количество пассажиров:', ' чел.'],
                ['Пассажирских палуб:', ''],
                ['Длина:', ''],
                ['Ширина:', ''],
                ['Осадка:', ''],
                ['Скорость:', ''],
                ['Проход теплохода:', '']
            ];
            const elements = [];
            Object.keys(info).forEach((element, index) => {
                elements.push(<span>{words[index][0]}</span>);
                elements.push(<p>{info[element] + words[index][1]}</p>);
            });
            return elements;
        }
        //#endregion

        //#region For tours
        function ConvertTourInfo() {
            return <>
                <i class="fa fa-map-o" aria-hidden="true"></i>
                <div className={classes.map}>
                    <PresentationMap 
                    className={classes.ymap}
                    points={[{coordinates: points, 
                        hintContent: '', 
                        balloonContentBody: ''}]}/>
                </div>
                <i class="fa fa-language" aria-hidden="true"></i>
                <div className={classes.languages}>
                    <p>{info.languages.join(', ')}</p>
                </div>
                <i class="fa fa-globe" aria-hidden="true"></i>
                <div className={classes.countries}>
                    <p>{info.countries.join(', ')}</p>
                </div>
                <i class="fa fa-road" aria-hidden="true"></i>
                <div className={classes.routes}>
                    <p>{info.routes.map((element) => 'Автобусные туры ' + element).join(', ')}</p>
                </div>
            </>
        }
        //#endregion

        let sections = 
        { 
            first: undefined, 
            second: undefined, 
            thrid: undefined,
            className: undefined
        };
        switch(type)
        {
            case 'treatment':
            case 'relax':
                sections.first = GenerateSection(
                { 
                    title: 'В наличии',
                    content: ConvertServices('inStock')
                });
                sections.second = GenerateSection(
                {
                    title: 'Общие услуги',
                    content: ConvertServices('commonServices')
                });
                sections.third = GenerateSection(
                {
                    title: 'Услуги в номерах',
                    content: ConvertServices('servicesRoom')
                });
                break;
            case 'cruises':
                sections.first = GenerateSection(
                {
                    title: 'О лайнере',
                    content: ConvertShipInfo()
                }, classes.cruises);
                sections.second = GenerateSection(
                {
                    title: 'В наличии',
                    content: ConvertServices('available')
                });
                sections.third = GenerateSection(
                {
                    title: 'В каютах',
                    content: ConvertServices('cabin')   
                });
                break;
            case 'tours':
                sections.className = classes.tours;
                sections.first = GenerateSection(
                {
                    title: 'Общая информация',
                    content: ConvertTourInfo()
                });
                sections.second = GenerateSection(
                {
                    title: 'Оплаченные услуги',
                    content: ConvertServices('included')
                });
                sections.third = GenerateSection(
                {
                    title: 'Платные услуги',
                    content: ConvertServices('payable')
                });
                break;
            default:
                console.log(type + ' this type of providers don`t support');
                return 'ERROR TYPE: ' + type + ' NOT SUPPORTED';
        };  
        return <div className={classes.sections + ' ' + sections.className}>
            <div className={classes.section_first}>
                {sections.first}
            </div>
            <div className={classes.section_second}>
                {sections.second}
            </div>
            <div className={classes.section_third}>
                {sections.third}
            </div>
        </div>
    }

    return (
        <>
            <div className={classes.services + ' ' + props.className}>
                {GenerateSections()}
                <div className={classes.address}>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <h1>{address}</h1>
                </div>
            </div>
            <PresentationMap 
                    className={(type == 'relax' || type == 'treatment') ? classes.relax__map : classes.relax__map_none}
                    points={[{coordinates: points, 
                        hintContent: '', 
                        balloonContentBody: ''}]}/>

            {(()=>{
                
                switch (type)
                {
                    case 'treatment': return <div className={classes.program} dangerouslySetInnerHTML={{__html: program}}/>;
                }

            })()}

        </>

    )
}

export default Providers;
