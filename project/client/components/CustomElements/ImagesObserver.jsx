import {useRef} from 'react'
import classes from './ImagesObserver.module.scss';
import Image from 'next/image';

const ImagesObserver = (props) => {

    let images = [];
    let i = 0;
    let filter = ''; 
    const deleteImage = (e) => {

        let photos = [...props.tempPhotos];
        delete photos[e.target.id];
        console.log(parseInt(e.target.id))
        props.setTempPhotos(photos);
    }

    const recoverImage = (e) => {
        let id = document.getElementsByName(e.target.id)[0].value;
        let photos = [...props.tempPhotos];
        photos[parseInt(id)] = e.target.id;
        props.setTempPhotos(photos);
    }

    let isEquals = true;
    props.pathImages.map(path=>{
       
        props.tempPhotos.includes(path)
        let checkbox = document.getElementById(props.idCheckbox);
        if (props.tempPhotos.includes(path))
        {
            filter = '';
            if (checkbox != null && isEquals) checkbox.checked = false;
            
        }
        else
        {
            filter = 'brightness(40%)';
            if (isEquals)
            {
                isEquals = false;
                if (checkbox != null) checkbox.checked = true;
            }
        }
        
       
        
        images.push(
            <div className={classes.image} style={{backgroundImage: `url(${props.prefix + path})`, filter: filter}}>
                <div onClick={deleteImage} id={i}>Удалить</div>
                <div onClick={recoverImage} id={path}><input name={path} type='hidden' value={i}/>Восстановить</div>
            </div>
        )
    
        i++;
    })
   
    return (
        <div className={classes.wrap + ' ' + props.className}>
            {images}
        </div>
    )
}

export default ImagesObserver
