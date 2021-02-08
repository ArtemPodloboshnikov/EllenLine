import React from 'react';
import Tour from './Tour.jsx'
import classes from './Tours.module.css';

const Tours = () => {

    return (
        <div className={classes.tours}>
            <Tour images={
                [
                    'https://i.pinimg.com/originals/85/8f/33/858f3316aad85407dea65f6704d7e2b5.png',
                    'https://rockcult.ru/wp-content/uploads/2020/10/Organectomy-Existential-Disconnect-2019-300x300.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/2/25/BTS_at_%22Map_of_the_Soul_-_Persona%22_global_press_conference%2C_17_April_2019_04.jpg'
                ]}
                    title="BTS лучше всех на планете"
                    price='20000'
                    text='BTS получили мировое признание после выпуска второго студийного альбома Wings, который считался самым успешным в их карьере до января 2018 года (рекорд по продажам был побит мини-альбомом Love Yourself: Her, выпущенным в сентябре 2017 года)[2]. Он позволил группе выиграть номинацию «Артист Года» на престижной музыкальной премии Mnet Asian Music Awards[3]. В 2017 году BTS стали одной из ведущих корейских групп на мировой музыкальной арене: они одержали победу в номинации «Лучший артист социальных сетей» на Billboard Music Awards, их мини-альбом Love Yourself: Her достиг 7 места в американском альбомном чарте Billboard 200, что стало наивысшим результатом среди всех корейских артистов, когда-либо попадавших в этот чарт[4]. Синглы «DNA» и «MIC Drop» удостоились золотых сертификаций от RIAA, что также сделало BTS первым корейским артистом в истории, имеющим подобную сертификацию. Многочисленные рекорды позволили группе второй год подряд одерживать победу в номинации «Артист Года» на Mnet Asian Music Awards[5]. С момента дебюта BTS продали более 5 миллионов своих записей по всему миру[6]. В апреле 2020 года BTS стали самыми продаваемыми артистами в истории Южной Кореи[7].'
                    index='0'
                    duration='10'
                    />
                
        </div>   
    );
}

export default Tours;