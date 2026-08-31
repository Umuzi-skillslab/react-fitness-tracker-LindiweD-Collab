import PropTypes from 'prop-types';
import styles from './Card.module.css';

/**
 * Card — generic content container. Demonstrates the children/composition
 * pattern: any JSX passed between <Card> tags is rendered inside it.
 */
const Card = ({ children, raised = true, className = '', style = {} }) => {
  // Conditional styling: combine the base class with an optional "raised"
  // hover-effect class, plus any caller-supplied className.
  const combinedClassName = `${styles.card} ${raised ? styles.raised : ''} ${className}`;

  return (
    <div className={combinedClassName} style={style}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  raised: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Card;
