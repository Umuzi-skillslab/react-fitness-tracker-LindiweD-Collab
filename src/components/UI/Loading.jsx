import PropTypes from 'prop-types';
import styles from './Loading.module.css';

/** Loading — spinner shown while data is being prepared. */
const Loading = ({ message = 'Loading...' }) => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
    <p>{message}</p>
  </div>
);

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
