"use client";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="dark-toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}