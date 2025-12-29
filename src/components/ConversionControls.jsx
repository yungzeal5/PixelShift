import React from "react";
import { RefreshCw, ChevronDown } from "lucide-react";

const FORMAT_OPTIONS = [
  { value: "webp", label: "WebP", supportsQuality: true },
  { value: "jpeg", label: "JPEG", supportsQuality: true },
  { value: "png", label: "PNG", supportsQuality: false },
  { value: "gif", label: "GIF", supportsQuality: false },
  { value: "bmp", label: "BMP", supportsQuality: false },
];

const ConversionControls = ({
  format,
  setFormat,
  quality,
  setQuality,
  onConvert,
  isConverting,
  disabled,
}) => {
  const currentFormat = FORMAT_OPTIONS.find((f) => f.value === format);
  const showQualitySlider = currentFormat?.supportsQuality;

  return (
    <div
      className="surface animate-fade-in"
      style={{
        padding: "24px",
        marginTop: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Format Selector */}
        <div style={{ flex: "0 0 auto" }}>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "600",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "8px",
            }}
          >
            Output Format
          </label>
          <div className="select-wrapper" style={{ position: "relative" }}>
            <select
              className="select"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              disabled={disabled || isConverting}
            >
              {FORMAT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--color-text-muted)",
              }}
            />
          </div>
        </div>

        {/* Quality Slider */}
        {showQualitySlider && (
          <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "8px",
              }}
            >
              <span>Quality</span>
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-primary)",
                  fontWeight: "700",
                  padding: "2px 8px",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {quality}%
              </span>
            </label>
            <input
              type="range"
              className="slider"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={disabled || isConverting}
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${quality}%, var(--color-border) ${quality}%, var(--color-border) 100%)`,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4px",
                fontSize: "11px",
                color: "var(--color-text-muted)",
              }}
            >
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>
        )}

        {/* Convert Button */}
        <div style={{ flex: "0 0 auto", marginLeft: "auto" }}>
          <button
            className="btn btn-primary"
            onClick={onConvert}
            disabled={disabled || isConverting}
            style={{
              minWidth: "140px",
            }}
          >
            {isConverting ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                Convert
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionControls;
