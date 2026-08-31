import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', fullWidth = false, disabled = false }) => {

  const className = `${styles.button} ${styles[variant]} ${fullWidth ? styles.full : ''}`;

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
