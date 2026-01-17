import React from "react";
import { X, Download, Loader2, CheckCircle, Clock } from "lucide-react";
import { formatFileSize } from "../utils/imageConverter";

const BatchImageList = ({
  images,
  onRemove,
  onClearAll,
  onDownloadSingle,
  format,
  isConverting,
}) => {
  if (images.length === 0) return null;

  return (
    <div className="animate-fade-in" style={{ marginTop: "24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--color-text-secondary)",
            }}
          >
            Images
          </span>
          <span
            style={{
              fontSize: "12px",
              padding: "4px 10px",
              backgroundColor: "var(--color-surface-elevated)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            {images.length}/10
          </span>
        </div>
        <button
          className="btn btn-secondary"
          onClick={onClearAll}
          disabled={isConverting}
          style={{
            fontSize: "12px",
            padding: "6px 12px",
          }}
        >
          Clear All
        </button>
      </div>

      {/* Image Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="surface"
            style={{
              padding: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Remove Button */}
            <button
              onClick={() => onRemove(image.id)}
              disabled={isConverting}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "none",
                cursor: isConverting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all var(--transition-fast)",
                opacity: isConverting ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isConverting) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(239, 68, 68, 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
              }}
            >
              <X size={14} color="white" />
            </button>

            {/* Image Preview */}
            <div
              style={{
                aspectRatio: "16/10",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                backgroundColor: "var(--color-background)",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={image.preview}
                alt={image.file.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Image Info */}
            <div style={{ marginBottom: "8px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "var(--color-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={image.file.name}
              >
                {image.file.name}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>{formatFileSize(image.file.size)}</span>
                {image.convertedBlob && (
                  <>
                    <span>→</span>
                    <span style={{ color: "var(--color-accent)" }}>
                      {formatFileSize(image.convertedBlob.size)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Status & Download */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                }}
              >
                {image.status === "pending" && (
                  <>
                    <Clock
                      size={14}
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <span style={{ color: "var(--color-text-muted)" }}>
                      Pending
                    </span>
                  </>
                )}
                {image.status === "converting" && (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ color: "var(--color-primary)" }}>
                      Converting...
                    </span>
                  </>
                )}
                {image.status === "done" && (
                  <>
                    <CheckCircle
                      size={14}
                      style={{ color: "var(--color-success)" }}
                    />
                    <span style={{ color: "var(--color-success)" }}>Ready</span>
                  </>
                )}
                {image.status === "error" && (
                  <>
                    <X size={14} style={{ color: "var(--color-danger)" }} />
                    <span style={{ color: "var(--color-danger)" }}>Failed</span>
                  </>
                )}
              </div>

              {/* Individual Download */}
              {image.status === "done" && image.convertedBlob && (
                <button
                  onClick={() => onDownloadSingle(image)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(34, 211, 238, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title={`Download as ${format.toUpperCase()}`}
                >
                  <Download size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchImageList;
