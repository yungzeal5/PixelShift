import React from "react";
import { Loader2 } from "lucide-react";

const ImagePreview = ({
  originalFile,
  originalPreview,
  convertedPreview,
  isConverting,
}) => {
  if (!originalPreview) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        marginTop: "24px",
      }}
    >
      {/* Original Image */}
      <div className="surface" style={{ padding: "16px", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Original
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--color-text-muted)",
              padding: "4px 8px",
              backgroundColor: "var(--color-surface-elevated)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {originalFile?.type?.split("/")[1]?.toUpperCase() || "IMAGE"}
          </span>
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            backgroundColor: "var(--color-background)",
            aspectRatio: "16/10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={originalPreview}
            alt="Original"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Converted Image */}
      <div className="surface" style={{ padding: "16px", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Converted
          </span>
          {convertedPreview && !isConverting && (
            <span
              style={{
                fontSize: "12px",
                color: "var(--color-accent)",
                padding: "4px 8px",
                backgroundColor: "rgba(34, 211, 238, 0.1)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Ready
            </span>
          )}
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            backgroundColor: "var(--color-background)",
            aspectRatio: "16/10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isConverting ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              <Loader2 size={32} className="animate-spin" />
              <span style={{ fontSize: "14px" }}>Converting...</span>
            </div>
          ) : convertedPreview ? (
            <img
              src={convertedPreview}
              alt="Converted"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <span
              style={{
                fontSize: "14px",
                color: "var(--color-text-muted)",
              }}
            >
              Select format and convert
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
