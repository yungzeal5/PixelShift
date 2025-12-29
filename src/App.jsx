import React, { useState, useCallback, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DropZone from "./components/DropZone";
import ImagePreview from "./components/ImagePreview";
import ConversionControls from "./components/ConversionControls";
import FileStats from "./components/FileStats";
import DownloadButton from "./components/DownloadButton";
import { convertImage } from "./utils/imageConverter";
import { Sparkles, Image as ImageIcon, Zap, Shield } from "lucide-react";

const AppContent = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [convertedPreview, setConvertedPreview] = useState(null);
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (convertedPreview) URL.revokeObjectURL(convertedPreview);
    };
  }, []);

  const handleFileSelect = useCallback(
    (file) => {
      // Clean up previous previews
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (convertedPreview) URL.revokeObjectURL(convertedPreview);

      setOriginalFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setConvertedBlob(null);
      setConvertedPreview(null);
    },
    [originalPreview, convertedPreview]
  );

  const handleConvert = useCallback(async () => {
    if (!originalFile) return;

    setIsConverting(true);

    try {
      // Clean up previous converted preview
      if (convertedPreview) URL.revokeObjectURL(convertedPreview);

      const blob = await convertImage(originalFile, format, quality);
      setConvertedBlob(blob);
      setConvertedPreview(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [originalFile, format, quality, convertedPreview]);

  // Auto-convert when format or quality changes (if we have an original file)
  useEffect(() => {
    if (originalFile && !isConverting) {
      const timer = setTimeout(() => {
        handleConvert();
      }, 300); // Debounce
      return () => clearTimeout(timer);
    }
  }, [format, quality, originalFile]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          padding: "32px",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Hero Section */}
        {!originalFile && (
          <div
            className="animate-fade-in"
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Convert Images{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Instantly
              </span>
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "var(--color-text-secondary)",
                maxWidth: "500px",
                margin: "0 auto 32px",
                lineHeight: 1.6,
              }}
            >
              Transform your images to any format with precision quality
              control. Fast, private, and runs entirely in your browser.
            </p>

            {/* Features */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "32px",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: Zap, text: "Lightning Fast" },
                { icon: Shield, text: "100% Private" },
                { icon: ImageIcon, text: "Multiple Formats" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--color-text-muted)",
                    fontSize: "14px",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--color-accent)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Title when image is loaded */}
        {originalFile && (
          <div
            className="animate-fade-in"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Sparkles size={24} style={{ color: "var(--color-accent)" }} />
              Image Converter
            </h2>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (originalPreview) URL.revokeObjectURL(originalPreview);
                if (convertedPreview) URL.revokeObjectURL(convertedPreview);
                setOriginalFile(null);
                setOriginalPreview(null);
                setConvertedBlob(null);
                setConvertedPreview(null);
              }}
              style={{ fontSize: "14px", padding: "8px 16px" }}
            >
              Upload New
            </button>
          </div>
        )}

        {/* Drop Zone */}
        {!originalFile && (
          <DropZone onFileSelect={handleFileSelect} disabled={isConverting} />
        )}

        {/* Conversion Controls */}
        {originalFile && (
          <ConversionControls
            format={format}
            setFormat={setFormat}
            quality={quality}
            setQuality={setQuality}
            onConvert={handleConvert}
            isConverting={isConverting}
            disabled={!originalFile}
          />
        )}

        {/* Image Preview */}
        <ImagePreview
          originalFile={originalFile}
          originalPreview={originalPreview}
          convertedPreview={convertedPreview}
          isConverting={isConverting}
        />

        {/* File Stats */}
        {originalFile && (
          <FileStats
            originalSize={originalFile?.size}
            convertedSize={convertedBlob?.size}
          />
        )}

        {/* Download Button */}
        <DownloadButton
          convertedBlob={convertedBlob}
          format={format}
          originalFileName={originalFile?.name}
          disabled={isConverting}
        />
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
