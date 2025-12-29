import React from "react";
import { Download } from "lucide-react";

const DownloadButton = ({
  convertedBlob,
  format,
  originalFileName,
  disabled,
}) => {
  const handleDownload = () => {
    if (!convertedBlob) return;

    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");

    // Generate filename
    const baseName = originalFileName
      ? originalFileName.replace(/\.[^/.]+$/, "")
      : "converted";
    const extension = format === "jpeg" ? "jpg" : format;

    a.href = url;
    a.download = `${baseName}-pixelshift.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!convertedBlob) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "24px",
      }}
    >
      <button
        className="btn"
        onClick={handleDownload}
        disabled={disabled}
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, #06B6D4 100%)",
          color: "#0B0E14",
          fontWeight: "600",
          fontSize: "16px",
          padding: "16px 32px",
          minWidth: "200px",
          boxShadow: "var(--shadow-lg), 0 0 30px rgba(34, 211, 238, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow =
            "var(--shadow-lg), 0 0 40px rgba(34, 211, 238, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow =
            "var(--shadow-lg), 0 0 30px rgba(34, 211, 238, 0.3)";
        }}
      >
        <Download size={20} />
        Download Image
      </button>
    </div>
  );
};

export default DownloadButton;
