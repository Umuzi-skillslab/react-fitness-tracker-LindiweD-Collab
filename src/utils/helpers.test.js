import {
  formatDuration,
  difficultyIcon,
  calculateTotalCalories,
  calculateTotalWeight,
  capitalize,
  emptyWorkoutPlan,
} from './helpers';

describe('helpers', () => {
  test('formatDuration formats minutes under an hour', () => {
    expect(formatDuration(45)).toBe('45 min');
  });

  test('formatDuration formats an exact hour', () => {
    expect(formatDuration(60)).toBe('1 hr');
  });

  test('difficultyIcon returns the correct emoji per level (ternary logic)', () => {
    expect(difficultyIcon('beginner')).toBe('🟢');
    expect(difficultyIcon('intermediate')).toBe('🟡');
    expect(difficultyIcon('advanced')).toBe('🔴');
  });

  test('calculateTotalCalories sums caloriesBurn across exercises', () => {
    const total = calculateTotalCalories([{ caloriesBurn: 50 }, { caloriesBurn: 30 }]);
    expect(total).toBe(80);
  });

  test('calculateTotalWeight multiplies sets x reps x weight and sums entries', () => {
    const total = calculateTotalWeight([
      { sets: 3, reps: 10, weight: 20 },
      { sets: 2, reps: 8, weight: 0 },
    ]);
    expect(total).toBe(600);
  });

  test('capitalize uppercases only the first letter', () => {
    expect(capitalize('monday')).toBe('Monday');
  });

  test('emptyWorkoutPlan creates all seven days with empty arrays', () => {
    const plan = emptyWorkoutPlan();
    expect(Object.keys(plan)).toHaveLength(7);
    expect(plan.monday).toEqual([]);
  });
});
