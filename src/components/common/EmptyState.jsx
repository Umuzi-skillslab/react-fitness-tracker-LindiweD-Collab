import PropTypes from 'prop-types';
import styles from './common.module.css';

const EmptyState = ({ icon = '📭', message }) => (
  <div className={styles.emptyState}>
    <span className={styles.icon}>{icon}</span>
    <p>{message}</p>
  </div>
);

EmptyState.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default EmptyState;
