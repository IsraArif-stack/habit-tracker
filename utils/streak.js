import {
  differenceInCalendarDays,
  parseISO,
} from "date-fns";

// Current Streak
export function getCurrentStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;

  const dates = [...completedDates]
    .map((date) => parseISO(date))
    .sort((a, b) => b - a);

  let streak = 0;
  let current = new Date();

  for (let date of dates) {
    const diff = differenceInCalendarDays(current, date);

    if (diff === 0) {
      streak++;
      current = date;
    } else if (diff === 1) {
      streak++;
      current = date;
    } else {
      break;
    }
  }

  return streak;
}

// Longest Streak
export function getLongestStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;

  const dates = [...completedDates]
    .map((date) => parseISO(date))
    .sort((a, b) => a - b);

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = differenceInCalendarDays(
      dates[i],
      dates[i - 1]
    );

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }

  return longest;
}