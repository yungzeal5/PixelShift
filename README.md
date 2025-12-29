# PixelShift

<div align="center">

![PixelShift Logo](https://img.shields.io/badge/PixelShift-Image%20Converter-3B82F6?style=for-the-badge&logo=image&logoColor=white)

**A lightning-fast, privacy-first image converter that runs entirely in your browser.**

[![Made with React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Built with Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

[Features](#features) • [Getting Started](#getting-started) • [Usage](#usage) • [Tech Stack](#tech-stack) • [Project Structure](#project-structure)

</div>

---

## ✨ Features

### 🖼️ Image Conversion

- **Multiple Formats** — Convert between WebP, JPEG, PNG, GIF, and BMP
- **Quality Control** — Fine-tune output quality (1-100%) for JPEG and WebP
- **Instant Preview** — Side-by-side comparison of original and converted images
- **Auto-Convert** — Real-time conversion as you adjust settings

### 📊 Smart Analytics

- **File Size Comparison** — See original vs. converted file sizes
- **Compression Stats** — Visual percentage showing size reduction or increase
- **Format Detection** — Automatically displays input file format

### 🎨 Modern UI/UX

- **Dark/Light Theme** — Manual toggle with automatic system preference detection
- **Drag & Drop** — Intuitive file upload with visual feedback
- **Responsive Design** — Works beautifully on desktop and mobile
- **Micro-animations** — Smooth transitions and interactive elements

### 🔒 Privacy First

- **100% Client-Side** — All processing happens in your browser
- **No Server Uploads** — Your images never leave your device
- **No Tracking** — Zero analytics or data collection

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pixelshift.git
   cd pixelshift
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

---

## 📖 Usage

### Basic Workflow

1. **Upload an Image**

   - Drag and drop an image onto the drop zone, or
   - Click the drop zone to open the file picker

2. **Choose Output Format**

   - Select your desired format from the dropdown (WebP, JPEG, PNG, GIF, BMP)

3. **Adjust Quality** _(JPEG/WebP only)_

   - Use the slider to balance quality vs. file size
   - Lower values = smaller files, higher compression
   - Higher values = better quality, larger files

4. **Download**
   - Click the "Download Image" button
   - File saves as `originalname-pixelshift.ext`

### Supported Formats

| Format | Input | Output | Quality Control |
| ------ | ----- | ------ | --------------- |
| WebP   | ✅    | ✅     | ✅ (1-100%)     |
| JPEG   | ✅    | ✅     | ✅ (1-100%)     |
| PNG    | ✅    | ✅     | ❌ (lossless)   |
| GIF    | ✅    | ✅     | ❌              |
| BMP    | ✅    | ✅     | ❌              |

---

## 🛠️ Tech Stack

| Technology                                                                | Purpose                 |
| ------------------------------------------------------------------------- | ----------------------- |
| [React 19](https://react.dev)                                             | UI Framework            |
| [Vite 7](https://vitejs.dev)                                              | Build Tool & Dev Server |
| [Tailwind CSS 4](https://tailwindcss.com)                                 | Styling                 |
| [Lucide React](https://lucide.dev)                                        | Icons                   |
| [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) | Image Processing        |

---

## 📁 Project Structure

```
pixelshift/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ConversionControls.jsx  # Format & quality controls
│   │   ├── DownloadButton.jsx      # Download functionality
│   │   ├── DropZone.jsx            # Drag & drop upload
│   │   ├── FileStats.jsx           # Size comparison display
│   │   ├── Footer.jsx              # App footer
│   │   ├── Header.jsx              # Logo & theme toggle
│   │   └── ImagePreview.jsx        # Original/converted preview
│   ├── context/
│   │   └── ThemeContext.jsx        # Dark/light theme management
│   ├── utils/
│   │   └── imageConverter.js       # Canvas-based conversion logic
│   ├── App.jsx                     # Main application
│   ├── index.css                   # Design system & global styles
│   └── main.jsx                    # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Design System

### Color Palette

#### Dark Theme (Default)

| Token      | Hex       | Usage           |
| ---------- | --------- | --------------- |
| Background | `#0B0E14` | Page background |
| Surface    | `#111827` | Cards, panels   |
| Border     | `#1F2937` | Separators      |
| Primary    | `#3B82F6` | Actions, links  |
| Accent     | `#22D3EE` | Highlights      |

#### Light Theme

| Token      | Hex       | Usage           |
| ---------- | --------- | --------------- |
| Background | `#F8FAFC` | Page background |
| Surface    | `#FFFFFF` | Cards, panels   |
| Border     | `#E2E8F0` | Separators      |

### Typography

```css
font-family: "Inter", system-ui, -apple-system, sans-serif;
```

---

## 📜 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made by [YungZeal.DEV](https://yungzealdev.netlify.app/)

</div>
