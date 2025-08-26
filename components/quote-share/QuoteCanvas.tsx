import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { ShareDialogData } from '@/types/quote-share';

interface QuoteCanvasProps {
  data: ShareDialogData;
}

export interface QuoteCanvasRef {
  generateImage: () => string;
  downloadImage: () => void;
  getImageData: () => string;
}

const WEBSITE_URL = 'portfoblog.com'; // Hardcoded watermark

export const QuoteCanvas = forwardRef<QuoteCanvasRef, QuoteCanvasProps>(({ data }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Only use Sans font
  const fontFamily = 'Inter, Arial, sans-serif';

  // Draw the canvas whenever data changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina quality
    const ratio = window.devicePixelRatio || 2;
    const dimensions = {
      square: { width: 1200, height: 1200 },
      instagram: { width: 1080, height: 1350 },
      twitter: { width: 1200, height: 675 },
      pinterest: { width: 1000, height: 1500 }
    };
    const { width, height } = dimensions[data.aspectRatio];
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Rounded corners
    const radius = 48;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();

    // Soft shadow
    ctx.shadowColor = "rgba(0,0,0,0.10)";
    ctx.shadowBlur = 48;
    ctx.shadowOffsetY = 12;

    // --- Background ---
    if (data.backgroundType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, data.background);
      grad.addColorStop(1, data.gradientColor || data.background);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (data.backgroundType === 'radial') {
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, width / 4,
        width / 2, height / 2, width / 1.2
      );
      grad.addColorStop(0, data.background);
      grad.addColorStop(1, data.gradientColor || data.background);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = data.background;
      ctx.fillRect(0, 0, width, height);
    }

    // --- Pattern overlays ---
    if (data.pattern !== 'none') {
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = data.textColor;
      ctx.fillStyle = data.textColor;
      if (data.pattern === 'dots') {
        for (let x = 32; x < width; x += 64) {
          for (let y = 32; y < height; y += 64) {
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (data.pattern === 'lines') {
        for (let i = 0; i < width + height; i += 48) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(0, i);
          ctx.stroke();
        }
      } else if (data.pattern === 'grid') {
        for (let x = 0; x < width; x += 48) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 48) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // --- Vignette effect ---
    ctx.save();
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, width / 2.2,
      width / 2, height / 2, width / 1.1
    );
    vignette.addColorStop(0.7, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.10)');
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // --- Typography ---
    let padding = Math.round(width * 0.08);
    let maxTextWidth = width - padding * 2;
    let baseFontSize = Math.max(36, Math.min(width, height) / (data.text.length > 120 ? 22 : 16));
    let lineHeight = baseFontSize * 1.35;

    // Layouts
    let textAlign: CanvasTextAlign = 'center';
    let quoteX = width / 2;
    let quoteY = height / 2;
    if (data.layout === 'classic') {
      textAlign = 'left';
      quoteX = padding;
    }

    // --- Word wrap ---
    ctx.font = `600 ${baseFontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'top';
    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      let lines: string[] = [];
      let line = '';
      for (let n = 0; n < words.length; n++) {
        let testLine = line + (line ? ' ' : '') + words[n];
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line) {
          lines.push(line);
          line = words[n];
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      return lines;
    };
    const lines = wrapText(data.text, maxTextWidth);

    // --- Draw quote marks ---
    ctx.save();
    ctx.font = `italic ${baseFontSize * 1.5}px Georgia, serif`;
    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    if (textAlign === 'center') {
      ctx.textAlign = 'center';
      ctx.fillText('“', width / 2, quoteY - lineHeight * (lines.length / 2) - baseFontSize * 1.2);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText('“', padding, quoteY - lineHeight * (lines.length / 2) - baseFontSize * 1.2);
    }
    ctx.restore();

    // --- Draw quote text ---
    ctx.save();
    ctx.font = `600 ${baseFontSize}px ${fontFamily}`;
    ctx.fillStyle = data.textColor;
    ctx.textAlign = textAlign;
    lines.forEach((line, i) => {
      ctx.fillText(
        line,
        quoteX,
        quoteY - (lines.length * lineHeight) / 2 + i * lineHeight
      );
    });
    ctx.restore();

    // --- Closing quote mark ---
    ctx.save();
    ctx.font = `italic ${baseFontSize * 1.5}px Georgia, serif`;
    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    if (textAlign === 'center') {
      ctx.textAlign = 'center';
      ctx.fillText('”', width / 2, quoteY + (lines.length * lineHeight) / 2 + baseFontSize * 0.2);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText('”', width - padding, quoteY + (lines.length * lineHeight) / 2 + baseFontSize * 0.2);
    }
    ctx.restore();

    // --- Author/source ---
    ctx.save();
    ctx.font = `500 ${Math.floor(baseFontSize * 0.6)}px ${fontFamily}`;
    ctx.fillStyle = data.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)';
    ctx.textAlign = textAlign;
    ctx.fillText(
      `— ${data.author}`,
      quoteX,
      quoteY + (lines.length * lineHeight) / 2 + baseFontSize * 1.5
    );
    ctx.font = `400 ${Math.floor(baseFontSize * 0.5)}px ${fontFamily}`;
    ctx.fillStyle = data.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
    ctx.fillText(
      data.source,
      quoteX,
      quoteY + (lines.length * lineHeight) / 2 + baseFontSize * 2.1
    );
    ctx.restore();

    // --- Watermark (always website URL, bottom right) ---
    ctx.save();
    ctx.font = `400 22px Inter, Arial, sans-serif`;
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(WEBSITE_URL, width - padding, height - padding / 2);
    ctx.restore();

    ctx.restore();
    ctx.shadowBlur = 0;
  }, [data]);

  // Export retina PNG
  const generateImage = (): string => {
    const canvas = canvasRef.current;
    if (!canvas) return '';
    return canvas.toDataURL('image/png', data.quality / 100);
  };

  // Export as retina PNG using toBlob for smaller file size
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = `quote-${Date.now()}.png`;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, 'image/png', data.quality / 100);
  };

  const getImageData = () => generateImage();

  useImperativeHandle(ref, () => ({
    generateImage,
    downloadImage,
    getImageData
  }));

  return (
    <canvas
      ref={canvasRef}
      className="hidden"
      style={{ display: 'none' }}
    />
  );
});

QuoteCanvas.displayName = 'QuoteCanvas';