export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}


export function difficultyIcon(difficulty) {
  if (difficulty === 'beginner') return '🟢';
  if (difficulty === 'intermediate') return '🟡';
  return '🔴';
}

export function calculateTotalCalories(exercises) {
  return exercises.reduce((total, ex) => total + (ex.caloriesBurn || 0), 0);
}

export function calculateTotalWeight(logEntries) {
  return logEntries.reduce(
    (total, entry) => total + entry.sets * entry.reps * (entry.weight || 0),
    0
  );
}

export function calculateStreak(history) {
  if (!history || history.length === 0) return 0;
  const days = [...new Set(history.map((h) => h.date))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  for (const day of days) {
    const dayDate = new Date(day);
    const diffDays = Math.round((cursor - dayDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      streak += 1;
      cursor = dayDate;
    } else {
      break;
    }
  }
  return streak;
}

export function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function emptyWorkoutPlan() {
  return DAYS_OF_WEEK.reduce((plan, day) => ({ ...plan, [day]: [] }), {});
}
