"use client";

import { useState } from "react";

export default function HabitForm({ addHabit }) {
  const [habit, setHabit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!habit.trim()) return;

    addHabit(habit.trim());
    setHabit("");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="✨ Enter a new habit..."
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />

        <button type="submit">
          ➕ Add Habit
        </button>
      </div>
    </form>
  );
}