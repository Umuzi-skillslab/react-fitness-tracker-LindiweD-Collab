import PropTypes from 'prop-types';
import { difficultyIcon, capitalize } from '../../utils/helpers';
import styles from './Badge.module.css';

// Maps a difficulty/category string to a background color. Kept outside the
// component so it isn't recreated on every render.
const COLOR_MAP = {
  beginner: 'var(--color-beginner)',
  intermediate: 'var(--color-intermediate)',
  advanced: 'var(--color-advanced)',
  strength: 'var(--color-pulse)',
  cardio: 'var(--color-danger)',
  flexibility: 'var(--color-teal)',
  balance: 'var(--color-ink)',
};

/**
 * Badge — small pill label for a difficulty or category value. Demonstrates
 * an inline style computed from props (expression as prop / dynamic style).
 */
const Badge = ({ value, showIcon = false }) => {
  const background = COLOR_MAP[value] || 'var(--color-text-muted)';

  return (
    <span className={styles.badge} style={{ backgroundColor: background }}>
      {showIcon ? difficultyIcon(value) + ' ' : ''}
      {capitalize(value)}
    </span>
  );
};

Badge.propTypes = {
  value: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
};

export default Badge;
