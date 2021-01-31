import React from 'react'
import classes from './Advantages.module.scss';

const Advantages = (props) => {
    // debugger;
    if (props.data.length == 0) return(<></>);
    const advantages = []
    const cssClass = [classes.advantages__blockImage_1, classes.advantages__blockImage_2, classes.advantages__blockImage_3]
    props.data.map((d, index)=>{

        
        advantages.push(<div key={index.toString()} className={ classes.advantages__block }>
            <h1 key={index}>{d.title}</h1>
            <p key={index}>{d.text}</p>
            <div key={index} className={cssClass[index]}>
                <img key={index} src={d.icon} />
            </div>
        </div>)
    });
    
    return (
        <div className='section'>
            <div className='section__title_right'>
                <p>Почему мы?</p>
            </div>
            <div className={ classes.advantages__blocks }>
                {advantages}
            </div>
        </div>
    )
}

export default Advantages
