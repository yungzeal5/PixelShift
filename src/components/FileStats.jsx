import React, { useMemo } from "react";
import {
  HardDrive,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Images,
} from "lucide-react";

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + units[i];
};

const FileStats = ({ images }) => {
  const stats = useMemo(() => {
    const readyImages = images.filter(
      (img) => img.status === "done" && img.convertedBlob,
    );

    if (readyImages.length === 0) return null;

    const totalOriginal = readyImages.reduce(
      (sum, img) => sum + img.file.size,
      0,
    );
    const totalConverted = readyImages.reduce(
      (sum, img) => sum + (img.convertedBlob?.size || 0),
      0,
    );

    const difference = totalOriginal - totalConverted;
    const percentChange = ((difference / totalOriginal) * 100).toFixed(1);
    const isReduction = difference > 0;

    return {
      count: readyImages.length,
      totalOriginal,
      totalConverted,
      difference,
      percentChange: Math.abs(percentChange),
      isReduction,
    };
  }, [images]);

  if (!stats) return null;

  return (
    <div
      className="surface animate-fade-in"
      style={{
        padding: "20px 24px",
        marginTop: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {/* Image Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            backgroundColor: "var(--color-surface-elevated)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Images size={18} style={{ color: "var(--color-primary)" }} />
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Images
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--color-text-primary)",
              }}
            >
              {stats.count} ready
            </div>
          </div>
        </div>

        {/* Original Size */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            backgroundColor: "var(--color-surface-elevated)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <HardDrive size={18} style={{ color: "var(--color-text-muted)" }} />
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total Original
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--color-text-primary)",
              }}
            >
              {formatFileSize(stats.totalOriginal)}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight size={20} style={{ color: "var(--color-text-muted)" }} />

        {/* Converted Size */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            backgroundColor: "var(--color-surface-elevated)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <HardDrive size={18} style={{ color: "var(--color-accent)" }} />
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total Converted
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--color-accent)",
              }}
            >
              {formatFileSize(stats.totalConverted)}
            </div>
          </div>
        </div>

        {/* Percentage Change */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            backgroundColor: stats.isReduction
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${
              stats.isReduction
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(239, 68, 68, 0.2)"
            }`,
          }}
        >
          {stats.isReduction ? (
            <TrendingDown size={20} style={{ color: "var(--color-success)" }} />
          ) : (
            <TrendingUp size={20} style={{ color: "var(--color-danger)" }} />
          )}
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: stats.isReduction
                  ? "var(--color-success)"
                  : "var(--color-danger)",
              }}
            >
              {stats.isReduction ? "-" : "+"}
              {stats.percentChange}%
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--color-text-muted)",
              }}
            >
              {stats.isReduction ? "Saved" : "Larger"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileStats;
