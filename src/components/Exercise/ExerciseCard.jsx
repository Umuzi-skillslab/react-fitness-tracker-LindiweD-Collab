import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { formatDuration } from '../../utils/helpers';
import styles from './Exercise.module.css';

/**
 * ExerciseCard — summary card for one exercise. Reused inside ExerciseList
 * (grandchild of ExercisesPage), demonstrating 3+ levels of nesting:
 * ExercisesPage > ExerciseList > ExerciseCard.
 */
const ExerciseCard = ({ exercise, onSelect, isInPlan = false }) => {
  const { name, category, difficulty, duration, caloriesBurn } = exercise;

  return (
    <Card
      className={`${styles.card} ${isInPlan ? styles.inPlan : ''}`}
      style={{ cursor: 'pointer' }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div onClick={() => onSelect(exercise.id)}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{name}</h3>
          {isInPlan && <span title="Already in your workout plan">✅ In plan</span>}
        </div>
        <div className={styles.badgeRow}>
          <Badge value={category} />
          <Badge value={difficulty} showIcon />
        </div>
        <div className={styles.meta}>
          <span>⏱ {formatDuration(duration)}</span>
          <span>🔥 {caloriesBurn} cal</span>
        </div>
      </div>
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    duration: PropTypes.number,
    caloriesBurn: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isInPlan: PropTypes.bool,
};

export default ExerciseCard;
