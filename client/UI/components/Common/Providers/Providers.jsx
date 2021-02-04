import React from 'react';
//
import classes from './Providers.module.scss';

//В основном для пансионатов с санаториями
const Services = (props) => {
    //#region Обязательные параметр
    const services = props.services;
    const address = props.address;
    //Переменная определяющая тип постороенния секции сервисов
    const type = props.type;
    //#endregion

    //Переменные передающиейся с круизом
    const info = props.info;

    function GenerateSections() {
    
        //#region For all type
        function ConvertServices(service) {
            const massiv = services[service];
            const elements = [];
            massiv.forEach(element => {
                elements.push(<i class={`fa fa-${element.icon}`} aria-hidden="true"></i>);
                elements.push(<p>{element.text}</p>);
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

        let sections = { first: undefined, second: undefined, thrid: undefined };
        switch(type)
        {
            case 'relax':
                sections.first = GenerateSection(
                { 
                    title: 'В наличии',
                    content: ConvertServices('available')
                });
                sections.second = GenerateSection(
                {
                    title: 'Общие услуги',
                    content: ConvertServices('common')
                });
                sections.third = GenerateSection(
                {
                    title: 'Услуги в номерах',
                    content: ConvertServices('rooms')
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
                })
                break;
            case 'tours':
                break;
            default:
                console.log(type + ' this type of providers don`t support');
                return 'ERROR TYPE: ' + type + ' NOT SUPPORTED';
        };  
        return <>
            <div className={classes.section_first}>
                {sections.first}
            </div>
            <div className={classes.section_second}>
                {sections.second}
            </div>
            <div className={classes.section_third}>
                {sections.third}
            </div>
        </>
    }

    return (
        <div className={classes.services + ' ' + props.className}>
            {GenerateSections()}
            <div className={classes.address}>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <h1>{address}</h1>
            </div>
        </div>

    )
}

export default Services;
