/**
 * Convert an image file to a different format using Canvas API
 * @param {File} file - The original image file
 * @param {string} format - Target format (webp, jpeg, png, gif, bmp)
 * @param {number} quality - Quality percentage (1-100), only applies to jpeg/webp
 * @returns {Promise<Blob>} - The converted image as a Blob
 */
export const convertImage = (file, format, quality) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // For formats that don't support transparency, fill with white background
      if (format === "jpeg" || format === "bmp") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = format === "jpeg" ? "image/jpeg" : `image/${format}`;
      // Quality only applies to JPEG and WebP (0-1 range)
      const qualityValue =
        format === "jpeg" || format === "webp" ? quality / 100 : undefined;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Clean up object URL
            URL.revokeObjectURL(img.src);
            resolve(blob);
          } else {
            reject(new Error("Failed to convert image"));
          }
        },
        mimeType,
        qualityValue
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Format file size in human-readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + units[i];
};

/**
 * Get file extension from format
 * @param {string} format - Image format (jpeg, png, webp, etc.)
 * @returns {string} - File extension
 */
export const getFileExtension = (format) => {
  return format === "jpeg" ? "jpg" : format;
};

/**
 * Generate output filename
 * @param {string} originalName - Original filename
 * @param {string} format - Target format
 * @returns {string} - New filename
 */
export const generateOutputFilename = (originalName, format) => {
  const baseName = originalName
    ? originalName.replace(/\.[^/.]+$/, "")
    : "converted";
  const extension = getFileExtension(format);

  return `${baseName}-pixelshift.${extension}`;
};
