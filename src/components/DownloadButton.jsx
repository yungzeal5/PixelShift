import React, { useState } from "react";
import { Download, Package, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { generateOutputFilename } from "../utils/imageConverter";

const DownloadButton = ({ images, format, disabled }) => {
  const [isZipping, setIsZipping] = useState(false);

  const readyImages = images.filter(
    (img) => img.status === "done" && img.convertedBlob,
  );

  const handleDownloadAll = async () => {
    if (readyImages.length === 0) return;

    setIsZipping(true);

    try {
      const zip = new JSZip();

      readyImages.forEach((image, index) => {
        const filename = generateOutputFilename(image.file.name, format);
        // Add index to prevent duplicate names
        const uniqueFilename =
          readyImages.length > 1 &&
          readyImages.filter((img) => img.file.name === image.file.name)
            .length > 1
            ? filename.replace(
                `.${format === "jpeg" ? "jpg" : format}`,
                `-${index + 1}.${format === "jpeg" ? "jpg" : format}`,
              )
            : filename;
        zip.file(uniqueFilename, image.convertedBlob);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pixelshift-batch-${readyImages.length}-images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to create ZIP:", error);
      alert("Failed to create ZIP file. Please try downloading individually.");
    } finally {
      setIsZipping(false);
    }
  };

  if (readyImages.length === 0) return null;

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
        onClick={handleDownloadAll}
        disabled={disabled || isZipping}
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, #06B6D4 100%)",
          color: "#0B0E14",
          fontWeight: "600",
          fontSize: "16px",
          padding: "16px 32px",
          minWidth: "240px",
          boxShadow: "var(--shadow-lg), 0 0 30px rgba(34, 211, 238, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isZipping) {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow =
              "var(--shadow-lg), 0 0 40px rgba(34, 211, 238, 0.4)";
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow =
            "var(--shadow-lg), 0 0 30px rgba(34, 211, 238, 0.3)";
        }}
      >
        {isZipping ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Creating ZIP...
          </>
        ) : (
          <>
            <Package size={20} />
            Download All ({readyImages.length}) as ZIP
          </>
        )}
      </button>
    </div>
  );
};

export default DownloadButton;
