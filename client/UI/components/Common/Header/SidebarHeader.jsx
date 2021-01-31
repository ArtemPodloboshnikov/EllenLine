import classes from './SidebarHeader.module.scss';
import Link from 'next/link'

const SidebarHeader = () => {
    return (
        <aside className={classes.aside}>
            <div className={classes.aside__links}>
                <Link href='/home' className={classes.header__button}><img src='images/logo.svg'/></Link>
                <Link href='/trips' className={classes.header__button}><img src='images/suitcase.svg'/></Link>
                <Link href='/places' className={classes.header__button}><img src='images/hotel.svg'/></Link>
                <Link href='/attractions' className={classes.header__button}><img src='images/tower.svg'/></Link>
                <Link href='/collaboration' className={classes.header__button}><img src='images/collaboration.svg'/></Link>
            </div>
        </aside>
    )
}

export default SidebarHeader
