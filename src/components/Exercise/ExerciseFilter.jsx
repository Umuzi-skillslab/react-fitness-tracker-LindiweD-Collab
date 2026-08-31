import PropTypes from 'prop-types';
import SearchBar from '../UI/SearchBar';
import Button from '../UI/Button';
import { CATEGORIES, DIFFICULTIES, MUSCLE_GROUPS } from '../../data/exercisesData';
import { capitalize } from '../../utils/helpers';
import styles from './Exercise.module.css';

/**
 * ExerciseFilter — search box plus category/muscle-group/difficulty
 * dropdowns. Lifts all filter state up to the parent (ExercisesPage) via
 * callback props, and demonstrates several onChange handlers.
 */
const ExerciseFilter = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  muscleGroup,
  onMuscleGroupChange,
  difficulty,
  onDifficultyChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    searchTerm || category !== 'all' || muscleGroup !== 'all' || difficulty !== 'all';

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={onSearchChange}
        onClear={() => onSearchChange('')}
      />
      <div className={styles.filterBar}>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {capitalize(cat)}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={muscleGroup}
          onChange={(e) => onMuscleGroupChange(e.target.value)}
        >
          <option value="all">All Muscle Groups</option>
          {MUSCLE_GROUPS.map((muscle) => (
            <option key={muscle} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          {DIFFICULTIES.map((level) => (
            <option key={level} value={level}>
              {capitalize(level)}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

ExerciseFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  muscleGroup: PropTypes.string.isRequired,
  onMuscleGroupChange: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default ExerciseFilter;
