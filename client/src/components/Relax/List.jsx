import React from 'react'
import classes from './List.module.css';
import YandexMap from '../Common/Map/YandexMap';

/*
    {parking: true, playground: true, restaurant: true, pebblesBeach: true, sandyBeach: true, sportsGround: true, trainer: true, pool: true, poolUnderRoof: true, park: true, sauna: true, SPA: true, receptionWithAnimals: true, musculoskeletalSystem: true, gynecologicalDiseases: true, urologicalDiseases: true, cardiovascularSystem: true, respiratoryOrgans: true, nervousSystem: true, digestiveSystem: true, metabolicDiseases: true, childrenUnder3: true, singleOccupancy: true, familiesOf4: true}
    [59.87026708231266, 30.26207174039379]
*/

function List(props){

    return (
        
           
        <div className={classes.list}>
            <div className={classes.map}>
                <YandexMap cityCoordinates={props.cityCoordinates} points={props.points}/>
            </div>
            <div className={classes.names}>
            
                    
                        {(()=>{

                            let sanatoriumsDivs = [];
                            props.sanatoriums.map((sanatorium) => {
                                console.log(sanatorium);
                                sanatoriumsDivs.push(

                                
                                    <div>
                                        <p>{sanatorium.title}</p>
                                        <p>{sanatorium.address}</p>
                                        {/* {(()=>{
                                        
                                            let icons = eval(sanatorium.icons);
                                            console.log(icons)
                                            for(let icon in icons){

                                                if (icons[icon] == true)
                                                {
                                                    <img src={'images/cardIcons/' + icon + '.svg'} />
                                                }
                                            };
                                        })()} */}
                                    </div>
        
        
    
                                );
                            });
                            
                            return sanatoriumsDivs;

                        })()}
            </div>
        </div>
      
    )
}

export default List
