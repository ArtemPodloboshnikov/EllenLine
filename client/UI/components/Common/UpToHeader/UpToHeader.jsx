import classes from './UpToHeader.module.scss';

function UpToHeader(props){
    
    
    const handleUpButton = () => {

        let current_scroll = props.scroll;
        let toUp = setInterval(()=>{

            if (current_scroll <= 0){
                clearInterval(toUp);
            }
            window.scrollTo(0, current_scroll = current_scroll - 40);

        }, 0.00000001)
        
    };
   

    return (
        <div onClick={handleUpButton} className={classes.wrap}>
            <img src='images/UpToHeader/topArrow.svg' />
        </div>
    )
}

export default UpToHeader
