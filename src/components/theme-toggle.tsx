import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Auto dark mode by local time (after 6PM or before 6AM)
  useEffect(() => {
    const hour = new Date().getHours();
    const defaultTheme = hour >= 18 || hour < 6 ? "dark" : "light";
    setTheme(defaultTheme);
    document.documentElement.setAttribute("data-theme", defaultTheme);
  }, []);

  // Manual override for admin
  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Simulated admin check (replace with actual auth later)
  const isAdmin = true;
  if (!isAdmin) return null;

  return (
    <button
      onClick={handleToggle}
      style={{
        background: "none",
        border: "1px solid var(--border)",
        color: "var(--text)",
        borderRadius: 6,
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: 16,
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

// --- Global theme variables ---
const lightTheme = `
:root[data-theme='light'] {
  --background: #ffffff;
  --card: #f9fafb;
  --border: #d1d5db;
  --text: #0b0b0b;
  --text-muted: #475569;
  --accent: #0f172a;
  --steel: #737373;
  --track: #e5e7eb;
  --nav-bg: #ffffffee;
}
`;

const darkTheme = `
:root[data-theme='dark'] {
  --background: #000000;
  --card: #101010;
  --border: #2f2f2f;
  --text: #e5e7eb;
  --text-muted: #9ca3af;
  --accent: #cccccc;
  --steel: #c0c0c0;
  --track: #27272a;
  --nav-bg: #000000f0;
}
`;

// Inject theme CSS
const style = document.createElement("style");
style.innerHTML = lightTheme + darkTheme;
document.head.appendChild(style);

// --- Gleam animation and responsiveness ---
const extraCSS = `
@keyframes gleam {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.hero-gleam {
  background: linear-gradient(90deg, #a0a0a0, #ffffff, #a0a0a0);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gleam 10s linear infinite;
}

body, html {
  margin: 0;
  padding: 0;
  background-color: var(--background);
  color: var(--text);
}

header, main, footer {
  max-width: 100%;
  margin: 0;
  border: none;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }
  .mobile-nav-button {
    display: block;
    background: none;
    border: 1px solid var(--border);
    padding: 6px 8px;
    border-radius: 6px;
    color: var(--text);
    cursor: pointer;
  }
}
`;
const gleamStyle = document.createElement("style");
gleamStyle.innerHTML = extraCSS;
document.head.appendChild(gleamStyle);
