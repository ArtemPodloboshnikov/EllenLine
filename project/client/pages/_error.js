import classes from '../styles/Error.module.scss';

function Error({ statusCode, text }) {
    return (
        <div className={classes.error}>
            <div>
                <h1>{statusCode}</h1>
                <h2>{text || 'Not Found'}</h2>
            </div>
        </div>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error