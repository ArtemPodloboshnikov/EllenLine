import classes from './Terms.module.scss';

const Terms = (props) => {
   
    const content = [];
    const classTitle = ['section__title_right', 'section__title_left']
    let indexTitle = 0;
    console.log(classes)
    for (let info of Object.values(props.data))
    {
        const classContent = 'content_' + info.type;
        if (indexTitle > 1) indexTitle = 0;
        content.push(
            <div className='section'>
                <div className={classTitle[indexTitle]}><p>{info.title}</p></div>
                <div className={classes[classContent]} dangerouslySetInnerHTML={{__html: info.content}}/>
            </div>
        )
        indexTitle++;
    }
    return (
        <div className={classes.terms}>
            {content}
        </div>
    )
}

export default Terms
