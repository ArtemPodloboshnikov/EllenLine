import classes from './SidebarHeader.module.scss';
import Link from 'next/link'
import Image from 'next/image'

const SidebarHeader = () => {
    return (
        <aside className={classes.aside}>
            <div className={classes.aside__links}>
                <Link href='/home' className={classes.header__button}><Image src='/images/logo.svg' width={70} height={70}/></Link>
                <Link href='/trips' className={classes.header__button}><Image src='/images/suitcase.svg' width={50} height={50}/></Link>
                <Link href='/places' className={classes.header__button}><Image src='/images/hotel.svg' width={50} height={50}/></Link>
                <Link href='/attractions' className={classes.header__button}><Image src='/images/tower.svg' width={50} height={50}/></Link>
                <Link href='/collaboration' className={classes.header__button}><Image src='/images/collaboration.svg' width={50} height={50}/></Link>
            </div>
        </aside>
    )
}

export default SidebarHeader
