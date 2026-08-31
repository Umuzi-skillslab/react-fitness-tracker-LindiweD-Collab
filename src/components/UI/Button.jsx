import PropTypes from 'prop-types';
import styles from './Button.module.css';

/**
 * Button — reusable action button. Used across Exercise, WorkoutPlanner,
 * WorkoutLog and Media components (6+ usages), demonstrating a single
 * component reused in many parents. Default parameter values are used here
 * instead of defaultProps (defaultProps on function components is
 * deprecated in modern React).
 */
const Button = ({ children, onClick, variant = 'primary', type = 'button', fullWidth = false, disabled = false }) => {
  // Conditional styling: combine the base class with a variant class and an
  // optional full-width class using a template string.
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
