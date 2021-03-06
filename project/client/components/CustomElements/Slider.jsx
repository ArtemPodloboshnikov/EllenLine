import { useState } from 'react';
import classes from './Slider.module.scss';
import Image from 'next/image';

const Slider = (props) => {
    //images is massive, full of src like: http://mlp, ./images/image/jpg
    const[images, setImages] = useState(props.images.split(','));
    const[index, setIndex] = useState(props.index ? props.index : 0);
    const type = props.type;

    function AddImages() {
        let elements = [];
        if(images && images.length != 0)
        {
            for(let i = 0;i < images.length; i++)
            {
                elements.push(<Image className={classes.item + (i == index ? ' ' + classes.active : '')} 
                src={'/images/' + type.toUpperCase()[0] + type.split('').splice(1).join('') + '/' + images[i]} layout="fill"/>)
            }
        }
        return elements;
    }

    function OnClick(e) {
        // console.log(e.target == <i></i>);
        if(e.currentTarget.classList.contains(classes.right))
        {
            //right
            if(index < images.length - 1)
                setIndex(index + 1);
            console.log('right');
        }
        else
        {
            //left
            if(index > 0)
                setIndex(index - 1);
            console.log('left');
        }
        console.log(index);
    }

    return (
        <div className={classes.slider + ' ' + props.className}>
            <div className={classes.left} onClick={(e) => OnClick(e)}>
                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            {AddImages()}
            <div className={classes.right} onClick={(e) => OnClick(e)}>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default Slider;