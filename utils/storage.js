export const loadHabits = () => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("habits");

  return data ? JSON.parse(data) : [];
};

export const saveHabits = (habits) => {
  localStorage.setItem("habits", JSON.stringify(habits));
};