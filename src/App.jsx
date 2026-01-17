import React, { useState, useCallback, useEffect, useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DropZone from "./components/DropZone";
import BatchImageList from "./components/BatchImageList";
import ConversionControls from "./components/ConversionControls";
import FileStats from "./components/FileStats";
import DownloadButton from "./components/DownloadButton";
import { convertImage, generateOutputFilename } from "./utils/imageConverter";
import {
  Sparkles,
  Image as ImageIcon,
  Zap,
  Shield,
  Images,
} from "lucide-react";

let imageIdCounter = 0;

const AppContent = () => {
  const [images, setImages] = useState([]);
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);
  const conversionRef = useRef(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
        if (img.convertedPreview) URL.revokeObjectURL(img.convertedPreview);
      });
    };
  }, []);

  const handleFilesSelect = useCallback((files) => {
    const newImages = files.map((file) => ({
      id: ++imageIdCounter,
      file,
      preview: URL.createObjectURL(file),
      convertedBlob: null,
      convertedPreview: null,
      status: "pending",
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  }, []);

  const handleRemoveImage = useCallback((id) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        if (image.preview) URL.revokeObjectURL(image.preview);
        if (image.convertedPreview) URL.revokeObjectURL(image.convertedPreview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview);
      if (img.convertedPreview) URL.revokeObjectURL(img.convertedPreview);
    });
    setImages([]);
  }, [images]);

  const handleConvertAll = useCallback(async () => {
    if (images.length === 0 || isConverting) return;

    // Cancel any pending conversion
    if (conversionRef.current) {
      conversionRef.current.cancelled = true;
    }
    const thisConversion = { cancelled: false };
    conversionRef.current = thisConversion;

    setIsConverting(true);

    // Set all to converting status
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        status: "converting",
        convertedBlob: null,
        convertedPreview: img.convertedPreview
          ? (URL.revokeObjectURL(img.convertedPreview), null)
          : null,
      })),
    );

    // Process images sequentially
    for (let i = 0; i < images.length; i++) {
      if (thisConversion.cancelled) break;

      const img = images[i];

      try {
        const blob = await convertImage(img.file, format, quality);

        if (thisConversion.cancelled) break;

        setImages((prev) =>
          prev.map((prevImg) =>
            prevImg.id === img.id
              ? {
                  ...prevImg,
                  convertedBlob: blob,
                  convertedPreview: URL.createObjectURL(blob),
                  status: "done",
                }
              : prevImg,
          ),
        );
      } catch (error) {
        console.error(`Failed to convert ${img.file.name}:`, error);

        if (thisConversion.cancelled) break;

        setImages((prev) =>
          prev.map((prevImg) =>
            prevImg.id === img.id ? { ...prevImg, status: "error" } : prevImg,
          ),
        );
      }
    }

    setIsConverting(false);
  }, [images, format, quality, isConverting]);

  // Auto-convert when format or quality changes (if we have images)
  useEffect(() => {
    if (images.length > 0 && !isConverting) {
      const timer = setTimeout(() => {
        handleConvertAll();
      }, 300); // Debounce
      return () => clearTimeout(timer);
    }
  }, [format, quality]);

  // Auto-convert when new images are added
  useEffect(() => {
    const hasPending = images.some((img) => img.status === "pending");
    if (hasPending && !isConverting) {
      const timer = setTimeout(() => {
        handleConvertAll();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [images.length]);

  const handleDownloadSingle = useCallback(
    (image) => {
      if (!image.convertedBlob) return;

      const url = URL.createObjectURL(image.convertedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = generateOutputFilename(image.file.name, format);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [format],
  );

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
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Hero Section */}
        {images.length === 0 && (
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
              Transform up to 10 images at once with precision quality control.
              Fast, private, and runs entirely in your browser.
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
                { icon: Images, text: "Batch Convert" },
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

        {/* Title when images are loaded */}
        {images.length > 0 && (
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
              Batch Converter
            </h2>
          </div>
        )}

        {/* Drop Zone */}
        <DropZone
          onFilesSelect={handleFilesSelect}
          disabled={isConverting}
          currentCount={images.length}
        />

        {/* Conversion Controls */}
        {images.length > 0 && (
          <ConversionControls
            format={format}
            setFormat={setFormat}
            quality={quality}
            setQuality={setQuality}
            onConvert={handleConvertAll}
            isConverting={isConverting}
            disabled={images.length === 0}
          />
        )}

        {/* Batch Image List */}
        <BatchImageList
          images={images}
          onRemove={handleRemoveImage}
          onClearAll={handleClearAll}
          onDownloadSingle={handleDownloadSingle}
          format={format}
          isConverting={isConverting}
        />

        {/* File Stats */}
        <FileStats images={images} />

        {/* Download All Button */}
        <DownloadButton
          images={images}
          format={format}
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
