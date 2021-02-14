import classes from './index.module.scss';

const Error404 = () => {
    return (
        <div className={classes.error}>
            <div>
                <h1>404</h1>
                <h2>Not Found</h2>

            </div>
        </div>
    )
}

export default Error404
