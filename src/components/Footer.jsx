import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "24px 32px",
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "var(--color-text-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        © {currentYear} PixelShift • Made by{" "}
        <a
          href="https://yungzealdev.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--color-accent)",
            textDecoration: "none",
            fontWeight: "500",
            transition: "opacity var(--transition-fast)",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          YungZeal.DEV
        </a>
      </p>
    </footer>
  );
};

export default Footer;
