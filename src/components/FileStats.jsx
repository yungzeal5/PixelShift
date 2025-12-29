import React, { useMemo } from "react";
import { HardDrive, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + units[i];
};

const FileStats = ({ originalSize, convertedSize }) => {
  const stats = useMemo(() => {
    if (!originalSize || !convertedSize) return null;

    const difference = originalSize - convertedSize;
    const percentChange = ((difference / originalSize) * 100).toFixed(1);
    const isReduction = difference > 0;

    return {
      difference,
      percentChange: Math.abs(percentChange),
      isReduction,
    };
  }, [originalSize, convertedSize]);

  if (!originalSize) return null;

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
              Original
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--color-text-primary)",
              }}
            >
              {formatFileSize(originalSize)}
            </div>
          </div>
        </div>

        {convertedSize && (
          <>
            {/* Arrow */}
            <ArrowRight
              size={20}
              style={{ color: "var(--color-text-muted)" }}
            />

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
                  Converted
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "var(--color-accent)",
                  }}
                >
                  {formatFileSize(convertedSize)}
                </div>
              </div>
            </div>

            {/* Percentage Change */}
            {stats && (
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
                  <TrendingDown
                    size={20}
                    style={{ color: "var(--color-success)" }}
                  />
                ) : (
                  <TrendingUp
                    size={20}
                    style={{ color: "var(--color-danger)" }}
                  />
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
                    {stats.isReduction ? "Smaller" : "Larger"}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileStats;
