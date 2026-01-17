import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";

const MAX_IMAGES = 10;

const DropZone = ({ onFilesSelect, disabled, currentCount = 0 }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [limitWarning, setLimitWarning] = useState(null);

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const processFiles = useCallback(
    (fileList) => {
      const imageFiles = Array.from(fileList).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length === 0) return;

      const remainingSlots = MAX_IMAGES - currentCount;

      if (remainingSlots <= 0) {
        setLimitWarning(`Maximum ${MAX_IMAGES} images allowed`);
        setTimeout(() => setLimitWarning(null), 3000);
        return;
      }

      const filesToAdd = imageFiles.slice(0, remainingSlots);

      if (imageFiles.length > remainingSlots) {
        setLimitWarning(
          `Only ${filesToAdd.length} of ${imageFiles.length} images added (limit: ${MAX_IMAGES})`,
        );
        setTimeout(() => setLimitWarning(null), 3000);
      }

      onFilesSelect(filesToAdd);
    },
    [onFilesSelect, currentCount],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles],
  );

  const handleFileInput = useCallback(
    (e) => {
      processFiles(e.target.files);
      // Reset input so same files can be selected again
      e.target.value = "";
    },
    [processFiles],
  );

  const handleClick = () => {
    if (!disabled) {
      document.getElementById("file-input").click();
    }
  };

  const isFull = currentCount >= MAX_IMAGES;

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
          isFull
            ? "var(--color-warning)"
            : isDragOver
              ? "var(--color-primary)"
              : "var(--color-border)"
        }`,
        backgroundColor: isDragOver
          ? "rgba(59, 130, 246, 0.05)"
          : "var(--color-surface)",
        cursor: disabled || isFull ? "not-allowed" : "pointer",
        transition: "all var(--transition-normal)",
        textAlign: "center",
        opacity: disabled || isFull ? 0.6 : 1,
        transform: isDragOver ? "scale(1.01)" : "scale(1)",
      }}
    >
      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp"
        onChange={handleFileInput}
        style={{ display: "none" }}
        disabled={disabled || isFull}
        multiple
      />

      {/* Limit Warning Toast */}
      {limitWarning && (
        <div
          className="animate-fade-in"
          style={{
            position: "absolute",
            top: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-warning)",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <AlertCircle size={16} />
          {limitWarning}
        </div>
      )}

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
            {isFull
              ? "Maximum images reached"
              : isDragOver
                ? "Drop your images here"
                : "Drop images or click to upload"}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "var(--color-text-muted)",
            }}
          >
            {isFull
              ? `${currentCount}/${MAX_IMAGES} images`
              : `Up to ${MAX_IMAGES} images • JPG, PNG, WebP, GIF, BMP`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
