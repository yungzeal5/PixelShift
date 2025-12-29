import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

const DropZone = ({ onFileSelect, disabled }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect, disabled]
  );

  const handleFileInput = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [onFileSelect]
  );

  const handleClick = () => {
    if (!disabled) {
      document.getElementById("file-input").click();
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        position: "relative",
        padding: "48px 32px",
        borderRadius: "var(--radius-xl)",
        border: `2px dashed ${
          isDragOver ? "var(--color-primary)" : "var(--color-border)"
        }`,
        backgroundColor: isDragOver
          ? "rgba(59, 130, 246, 0.05)"
          : "var(--color-surface)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all var(--transition-normal)",
        textAlign: "center",
        opacity: disabled ? 0.6 : 1,
        transform: isDragOver ? "scale(1.01)" : "scale(1)",
      }}
    >
      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp"
        onChange={handleFileInput}
        style={{ display: "none" }}
        disabled={disabled}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "var(--radius-lg)",
            backgroundColor: isDragOver
              ? "rgba(59, 130, 246, 0.1)"
              : "var(--color-surface-elevated)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all var(--transition-normal)",
          }}
        >
          {isDragOver ? (
            <ImageIcon size={32} style={{ color: "var(--color-primary)" }} />
          ) : (
            <Upload size={32} style={{ color: "var(--color-text-muted)" }} />
          )}
        </div>

        <div>
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: "var(--color-text-primary)",
            }}
          >
            {isDragOver
              ? "Drop your image here"
              : "Drop an image or click to upload"}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "var(--color-text-muted)",
            }}
          >
            Supports JPG, PNG, WebP, GIF, BMP
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
