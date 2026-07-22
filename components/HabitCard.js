"use client";

import {
  getCurrentStreak,
  getLongestStreak,
} from "../utils/streak";

export default function HabitCard({
  habit,
  deleteHabit,
  completeHabit,
}) {
  const completed = habit.completedDates.length;

  const currentStreak = getCurrentStreak(
    habit.completedDates
  );

  const longestStreak = getLongestStreak(
    habit.completedDates
  );

  const goal = 30;
  const progress = Math.min((completed / goal) * 100, 100);

  // Achievement Badge
  let badge = "";
  let badgeClass = "";

  if (currentStreak >= 100) {
    badge = "👑 Legend";
    badgeClass = "legend";
  } else if (currentStreak >= 30) {
    badge = "🥇 Gold";
    badgeClass = "gold";
  } else if (currentStreak >= 7) {
    badge = "🥈 Silver";
    badgeClass = "silver";
  } else if (currentStreak >= 3) {
    badge = "🥉 Bronze";
    badgeClass = "bronze";
  }

  return (
    <div className="habit-card">
      <div className="habit-info">

        <div className="habit-title-row">
          <h3>{habit.name}</h3>

          <span className="habit-badge">
            🔥 Active
          </span>
        </div>

        {badge && (
          <div className={`achievement-badge ${badgeClass}`}>
            {badge} Badge
          </div>
        )}

        <div className="habit-stats">
          <div className="stat-box">
            <span className="stat-number">
              {completed}
            </span>
            <span className="stat-label">
              Completed
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-number">
              {currentStreak}
            </span>
            <span className="stat-label">
              Current Streak
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-number">
              {longestStreak}
            </span>
            <span className="stat-label">
              Longest Streak
            </span>
          </div>
        </div>

        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        <p className="progress-text">
          {completed} / {goal} Days Completed ({Math.round(progress)}%)
        </p>

      </div>

      <div className="habit-actions">
        <button
          className="complete-btn"
          onClick={() => completeHabit(habit.id)}
        >
          ✅ Complete Today
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteHabit(habit.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}