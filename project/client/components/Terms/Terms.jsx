import classes from './Terms.module.scss';

const Terms = (props) => {
   
    const content = [];
    const classTitle = ['section__title_right', 'section__title_left']
    let indexTitle = 0;
    console.log(props.data)
    for (let info of Object.values(props.data))
    {
        const classContent = 'content_' + info.type;
        let content_main = [];

        if (info.type == 'card')
        {
            for (let item of info.content)
            {
                content_main.push(

                    <div className={classes[classContent]} dangerouslySetInnerHTML={{__html: item}}/>
                )
                
            }

            content_main = [<div className={classes.content_cards}>{content_main}</div>];
        }
        if (info.type == 'list')
        {
            for (let i = 0; i < info.content.length; i++)
            {
                content_main.push(

                    <div className={classes[classContent]}>
                        <div>{i + 1}</div>
                        <div dangerouslySetInnerHTML={{__html: info.content[i]}}/>
                    </div>
                )
                
            }

            content_main = [<div className={classes.content_lists}>{content_main}</div>];
        }
        else
        {
            content_main.push(<div className={classes[classContent]} dangerouslySetInnerHTML={{__html: info.content}}/>)
        }
        if (indexTitle > 1) indexTitle = 0;
        content.push(
            <div className='section'>
                <div className={classTitle[indexTitle]}><p>{info.title}</p></div>
                {content_main}
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
