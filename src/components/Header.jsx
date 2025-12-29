import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "18px",
            color: "white",
          }}
        >
          P
        </div>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "var(--color-accent)" }}>YungZeal</span>
          <span style={{ color: "var(--color-text-muted)" }}>.DEV</span>
        </span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="btn-icon"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        style={{
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default Header;
