import PropTypes from 'prop-types';
import styles from './common.module.css';

const ErrorState = ({ message }) => (
  <div className={styles.errorState}>
    <strong>Something went wrong.</strong>
    <p>{message}</p>
  </div>
);

ErrorState.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorState;
