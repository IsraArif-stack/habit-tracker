"use client";

import HabitCard from "./HabitCard";

export default function HabitList({
  habits,
  deleteHabit,
  completeHabit,
}) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>

        <h2>No Habits Yet</h2>

        <p>
          Start your productivity journey by adding your first habit.
        </p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          deleteHabit={deleteHabit}
          completeHabit={completeHabit}
        />
      ))}
    </div>
  );
}