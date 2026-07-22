"use client";

import {
  eachDayOfInterval,
  format,
  subDays,
} from "date-fns";

export default function Heatmap({ completedDates }) {
  const today = new Date();

  const days = eachDayOfInterval({
    start: subDays(today, 364),
    end: today,
  });

  // Count completions per date
  const counts = {};

  completedDates.forEach((date) => {
    counts[date] = (counts[date] || 0) + 1;
  });

  const getLevel = (count) => {
    if (count === 0) return "level-0";
    if (count === 1) return "level-1";
    if (count === 2) return "level-2";
    if (count === 3) return "level-3";
    return "level-4";
  };

  return (
    <div className="heatmap">

      <div className="heatmap-header">
        <span>Less</span>

        <div className="heatmap-legend">
          <div className="heatmap-cell level-0"></div>
          <div className="heatmap-cell level-1"></div>
          <div className="heatmap-cell level-2"></div>
          <div className="heatmap-cell level-3"></div>
          <div className="heatmap-cell level-4"></div>
        </div>

        <span>More</span>
      </div>

      <div className="heatmap-grid">
        {days.map((day) => {
          const date = format(day, "yyyy-MM-dd");
          const count = counts[date] || 0;

          return (
            <div
              key={date}
              className={`heatmap-cell ${getLevel(count)}`}
              title={`${date} • ${count} completion(s)`}
            />
          );
        })}
      </div>

    </div>
  );
}