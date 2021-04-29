import {useEffect, useState} from 'react'
import convertTimestamp from '../../../functions/ConvertTimestamp';
import classes from './index.module.scss';
import AdminLayout from '../../../layouts/AdminLayout';
import { Chart } from "react-google-charts";

const Finance = () => {

    const [dataY, setDataY] = useState();
    const [dataX, setDataX] = useState([{"payment_system_id":"52","label":"\u0412\u0422\u0411","data":[[1586628000000,484],[1586806560000,529],[1586985120000,428],[1587163680000,255],[1587342240000,466],[1587520800000,413],[1587699360000,403],[1587877920000,428],[1588056480000,221],[1588235040000,328],[1588413600000,384],[1588592160000,355],[1588770720000,243],[1588949280000,546],[1589127840000,587]]},{"payment_system_id":"53","label":"\u0423\u0411\u0420\u0438\u0420","data":[[1586628000000,88],[1586806560000,21],[1586985120000,71],[1587163680000,17],[1587342240000,56],[1587520800000,80],[1587699360000,121],[1587877920000,33],[1588056480000,67],[1588235040000,44],[1588413600000,77],[1588592160000,134],[1588770720000,21],[1588949280000,16],[1589127840000,58]]},{"payment_system_id":"127","label":"\u0422\u0435\u0441\u0442\u043e\u0432\u044b\u0439 \u041f\u043b\u0430\u0442\u0451\u0436","data":[[1586628000000,380472],[1586806560000,279503],[1586985120000,10896],[1587163680000,2733],[1587342240000,25746],[1587520800000,149134],[1587699360000,34640],[1587877920000,291085],[1588056480000,3846858],[1588235040000,546562],[1588413600000,3331],[1588592160000,115083],[1588770720000,21998909],[1588949280000,9288],[1589127840000,10838]]},{"payment_system_id":"40","label":"\u0421\u0431\u0435\u0440\u0431\u0430\u043d\u043a","data":[[1586628000000,379],[1586806560000,355],[1586985120000,480],[1587163680000,181],[1587342240000,349],[1587520800000,449],[1587699360000,139],[1587877920000,411],[1588056480000,314],[1588235040000,432],[1588413600000,220],[1588592160000,268],[1588770720000,471],[1588949280000,383],[1589127840000,362]]},{"payment_system_id":"6","label":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442","data":[[1586628000000,148],[1586806560000,96],[1586985120000,175],[1587163680000,128],[1587342240000,158],[1587520800000,198],[1587699360000,103],[1587877920000,132],[1588056480000,78],[1588235040000,90],[1588413600000,88],[1588592160000,190],[1588770720000,74],[1588949280000,74],[1589127840000,46]]},{"payment_system_id":"100","label":"\u0420\u043e\u0441\u0415\u0432\u0440\u043e\u0411\u0430\u043d\u043a","data":[[1586628000000,65],[1586806560000,27],[1586985120000,36],[1587163680000,158],[1587342240000,43],[1587520800000,40],[1587699360000,165],[1587877920000,11],[1588056480000,77],[1588235040000,132],[1588413600000,66],[1588592160000,54],[1588770720000,43],[1588949280000,30],[1589127840000,92]]},{"payment_system_id":"110","label":"\u0420\u0424\u0418 \u0411\u0430\u043d\u043a","data":[[1586628000000,42],[1586806560000,12],[1586985120000,62],[1587163680000,41],[1587342240000,50],[1587520800000,9],[1587699360000,142],[1587877920000,48],[1588056480000,90],[1588235040000,23],[1588413600000,91],[1588592160000,146],[1588770720000,13],[1588949280000,57],[1589127840000,19]]},{"payment_system_id":"20","label":"\u041f\u0440\u043e\u043c\u0441\u0432\u044f\u0437\u044c\u0431\u0430\u043d\u043a","data":[[1586628000000,35],[1586806560000,162],[1586985120000,127],[1587163680000,16],[1587342240000,7],[1587520800000,42],[1587699360000,18],[1587877920000,38],[1588056480000,67],[1588235040000,112],[1588413600000,17],[1588592160000,42],[1588770720000,27],[1588949280000,14],[1589127840000,40]]},{"payment_system_id":"41","label":"\u0411\u0430\u043d\u043a \u041e\u0442\u043a\u0440\u044b\u0442\u0438\u0435","data":[[1586628000000,60],[1586806560000,38],[1586985120000,41],[1587163680000,62],[1587342240000,71],[1587520800000,47],[1587699360000,25],[1587877920000,24],[1588056480000,15],[1588235040000,85],[1588413600000,71],[1588592160000,75],[1588770720000,56],[1588949280000,97],[1589127840000,131]]},{"payment_system_id":"90","label":"\u041c\u041a\u0411","data":[[1586628000000,61],[1586806560000,81],[1586985120000,75],[1587163680000,8],[1587342240000,117],[1587520800000,62],[1587699360000,142],[1587877920000,45],[1588056480000,110],[1588235040000,120],[1588413600000,100],[1588592160000,68],[1588770720000,69],[1588949280000,96],[1589127840000,82]]}]);
    let sumByMonth = [];
    const accumulation = (array, obj) =>{

        // console.log(array[0])
        for (let index in array)
        {
            // console.log(array[index].month, obj.month)
            if (array[index].month === obj.month)
            {
                array[index].amount += obj.amount;
                return false;
            }
            
        }

        return true;
    }
    if (dataX.length != 0)
    {
        let temp_sumByMonth = [];

        dataX.map(obj=>{

            console.log(obj)
            obj.data.map(data=>{
                
                let elem = {month: convertTimestamp(data[0]).month, amount: data[1]};

                if (accumulation(sumByMonth, elem))
                {
                    sumByMonth.push(elem)
                }
                
            })
        })
        console.log(sumByMonth)
        // sumByMonth[0] = {mount: temp_sumByMonth[0].mount, amount: temp_sumByMonth[0].amount};
        // console.log(sumByMonth[0])
        // temp_sumByMonth.map(obj=>{
            
        //     let afterLength = sumByMonth.length;
        //     console.log(obj)
        //     sumByMonth.map((obj2, index)=>{
        //         console.log(obj2)
    
        //         if (obj2.month === obj.month)
        //         {
        //             console.log(obj2.month === obj.month)
        //             // let temp_obj2 = {...obj2};
        //             sumByMonth[index] = { month: obj.month, amount: (obj2.amount + obj.amount) }
        //         }
                
        //     })

        //     if (sumByMonth.length == afterLength)
        //     {
        //         sumByMonth.push({month: obj.month, amount: obj.amount})
        //     }
        // })

        // sumByMonth.splice(0, 1);
        // temp_sumByMonth = null;
    }

    useEffect(()=>{

        async function getPrices()
        {
            //https://ellinline.server.paykeeper.ru/info/systems/sums/?start=2020-04-12&end=2020-05-12
            const res = await fetch('https://demo.paykeeper.ru/info/systems/sums/?start=2020-04-12&end=2020-05-12',{

                mode: 'cors',
            });
            const json = await res.text();
            //setDataX(json);
        }

        getPrices();

    }, [])

    console.log(sumByMonth);

    return (
        <AdminLayout title='Финансы' sector='finance'>
            <div className={classes.chart}>
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={(()=>{

                        let data = [['Месяцы', 'Выручка']]

                        sumByMonth.map(obj=>{
                            console.log(obj)
                            data.push([obj.month, obj.amount])
                        })
                        
                        return data;
                    })()}
                    
                    options={{
                        series: {
                        
                            0: { axis: 'Temps' }
                        },
                        axes: {
      // Adds labels to each axis; they don't have to match the axis names.
                        y: {
                            Temps: { label: 'Руб.' },
                        },
                        // series: {
                        // 1: { curveType: 'function' },
                        // },
                        }
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        </AdminLayout>
    )
}

export default Finance