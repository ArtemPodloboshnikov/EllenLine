import classes from './VerticalList.module.scss';
import VerticalListItem from './VerticalListItem';

const VerticalList = (props) => {

    let elements = [];

    if (props.items !== undefined)
    {

        props.items.map((item)=>{
            
            elements.push(<VerticalListItem item={item}/>);
        })
    }
    return (
        <div className={classes.list + ' ' + props.className}>
            {elements}
        </div>
    )
}

export default VerticalList
