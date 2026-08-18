"use client";

/**
 * PixelBlastLite
 * ------------------------------------------------------------------
 * Suggested path: components/PixelBlastLite.tsx
 *
 * A Canvas 2D re-imagining of PixelBlast, no WebGL/three.js/
 * postprocessing at all. Instead of an fbm-noise fragment shader
 * evaluated per pixel plus a full EffectComposer pass, this draws a
 * grid of shapes (square/circle/triangle/diamond) whose alpha is
 * driven by a cheap sine-based noise field + a real 8x8 Bayer
 * dither matrix (same ordered-dithering trick the original shader
 * used - it's just a small lookup table, effectively free), with
 * click-triggered ripples layered on top the same way the original
 * combined `feed` (noise) and ripple rings before thresholding.
 *
 * Deliberately dropped vs. the WebGL version: the `liquid` UV-warp
 * postprocessing pass and the `noiseAmount` film-grain pass. Both
 * are per-pixel operations that need a second full-screen render
 * pass (EffectComposer) to be cheap on a GPU; faking them on
 * Canvas2D would mean per-pixel getImageData/putImageData work,
 * which is exactly the cost this "lite" version exists to avoid.
 *
 * Shares useDeviceQuality with the other two components for dpr,
 * grid-density scaling, and pause-when-hidden/offscreen behaviour.
 * ------------------------------------------------------------------
 */

import React, { useEffect, useMemo, useRef } from "react";
import { useDeviceQuality, type QualityLevel } from "./useDeviceQuality";

type PixelBlastLiteVariant = "square" | "circle" | "triangle" | "diamond";

interface RippleClick {
  x: number;
  y: number;
  time: number;
}

export interface PixelBlastLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PixelBlastLiteVariant;
  /** Base size of a grid cell in CSS px (grid density scales down further on weaker devices). */
  pixelSize?: number;
  color?: string;
  patternDensity?: number;
  /** Small per-cell size jitter, 0 - 1. */
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  speed?: number;
  transparent?: boolean;
  /** 0 - 1, how far in from the edges the fade starts. */
  edgeFade?: number;
  pause?: boolean;
  autoPauseOffscreen?: boolean;
  /** Overrides the auto-detected quality tier. */
  quality?: QualityLevel;
  /** Caps the render loop's frame rate. Defaults based on quality tier. */
  targetFps?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3)
    h = h
      .split("")
      .map(c => c + c)
      .join("");
  const num = parseInt(h.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function hash2(i: number, j: number): number {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// Standard 8x8 ordered (Bayer) dither matrix, normalized to 0..1 and
// centered around 0 - same trick the original shader used
// (Bayer8(fragCoord) - 0.5) to avoid hard, banded on/off edges.
const BAYER_8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21]
].map(row => row.map(v => v / 64 - 0.5));

const MAX_RIPPLES = 6;

export default function PixelBlastLite({
  variant = "square",
  pixelSize = 3,
  color = "#B497CF",
  patternDensity = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.12,
  rippleSpeed = 0.3,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  pause = false,
  autoPauseOffscreen = true,
  quality: qualityOverride,
  targetFps,
  className,
  style,
  ...rest
}: PixelBlastLiteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isIntersectingRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const timeOffsetRef = useRef(Math.random() * 1000);
  const clicksRef = useRef<RippleClick[]>([]);
  const clickIxRef = useRef(0);
  const gridRef = useRef({ cols: 0, rows: 0, cellSize: 0, width: 0, height: 0 });

  const deviceQuality = useDeviceQuality();
  const quality: QualityLevel = qualityOverride ?? deviceQuality.level;
  const effectiveDpr = deviceQuality.dpr;

  const densityMul = quality === "high" ? 1 : quality === "medium" ? 0.75 : 0.5;
  const effectiveRipples = enableRipples && quality !== "low";

  const frameInterval = targetFps
    ? 1000 / targetFps
    : quality === "high"
      ? 0
      : quality === "medium"
        ? 1000 / 30
        : 1000 / 24;

  const colorRgb = useMemo(() => hexToRgb(color), [color]);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    // Reduced motion / data-saver: skip entirely, JSX below renders a
    // static fallback instead.
    if (deviceQuality.disabled) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: transparent });
    if (!ctx) return;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    ctn.appendChild(canvas);

    const [r, g, b] = colorRgb;
    const effectiveCellSize = Math.max(2, pixelSize * 8) / densityMul;

    function computeGrid() {
      const cssW = ctn.offsetWidth || 1;
      const cssH = ctn.offsetHeight || 1;
      canvas.width = Math.max(1, Math.floor(cssW * effectiveDpr));
      canvas.height = Math.max(1, Math.floor(cssH * effectiveDpr));
      ctx!.setTransform(effectiveDpr, 0, 0, effectiveDpr, 0, 0);

      gridRef.current = {
        cols: Math.max(4, Math.ceil(cssW / effectiveCellSize)),
        rows: Math.max(4, Math.ceil(cssH / effectiveCellSize)),
        cellSize: effectiveCellSize,
        width: cssW,
        height: cssH
      };
    }

    computeGrid();
    const resizeObserver = new ResizeObserver(computeGrid);
    resizeObserver.observe(ctn);

    let intersectionObserver: IntersectionObserver | undefined;
    if (autoPauseOffscreen) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isIntersectingRef.current = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(ctn);
    } else {
      isIntersectingRef.current = true;
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!effectiveRipples) return;
      const rect = canvas.getBoundingClientRect();
      const arr = clicksRef.current;
      const ix = clickIxRef.current % MAX_RIPPLES;
      arr[ix] = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: performance.now()
      };
      clickIxRef.current += 1;
    };
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);

      if (frameInterval > 0 && now - lastFrameTimeRef.current < frameInterval) return;
      lastFrameTimeRef.current = now;

      const shouldAnimate = !pause && !document.hidden && isIntersectingRef.current;
      if (!shouldAnimate) return;

      const t = (now * 0.001 + timeOffsetRef.current) * speed;
      const { cols, rows, cellSize, width, height } = gridRef.current;

      if (transparent) ctx!.clearRect(0, 0, width, height);
      else {
        ctx!.fillStyle = "black";
        ctx!.fillRect(0, 0, width, height);
      }

      const clicks = effectiveRipples ? clicksRef.current : [];

      for (let row = 0; row < rows; row++) {
        const cy = row * cellSize + cellSize / 2;
        for (let col = 0; col < cols; col++) {
          const cx = col * cellSize + cellSize / 2;
          const h = hash2(col, row);

          const n1 = Math.sin(col * 0.28 + t * 0.6 + h * 6.283);
          const n2 = Math.sin(row * 0.31 - t * 0.45 + h * 4.71);
          let feed = (n1 * n2) * 0.5 + 0.5;
          feed += (patternDensity - 0.5) * 0.6;

          for (let i = 0; i < clicks.length; i++) {
            const click = clicks[i];
            if (!click) continue;
            const age = (now - click.time) * 0.001;
            if (age < 0 || age > 3.5) continue;
            const distCells = Math.hypot(cx - click.x, cy - click.y) / cellSize;
            const waveR = rippleSpeed * age * 22;
            const ring = Math.exp(-Math.pow((distCells - waveR) / (rippleThickness * 22), 2));
            const atten = Math.exp(-1.1 * age) * Math.exp(-0.12 * distCells);
            feed = Math.max(feed, ring * atten * rippleIntensityScale);
          }

          const bayer = BAYER_8[row & 7][col & 7];
          if (feed + bayer <= 0.5) continue;

          let coverage = 1;
          if (pixelSizeJitter > 0) {
            coverage *= 1 - Math.abs(h - 0.5) * pixelSizeJitter * 0.3;
          }

          if (edgeFade > 0) {
            const nx = cx / width;
            const ny = cy / height;
            const edge = Math.min(nx, ny, 1 - nx, 1 - ny);
            const fade = Math.max(0, Math.min(1, edge / edgeFade));
            coverage *= fade * fade * (3 - 2 * fade);
          }

          if (coverage <= 0.03) continue;
          const alpha = Math.min(1, coverage);
          const size = cellSize * 0.86;

          ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;

          switch (variant) {
            case "circle":
              ctx!.beginPath();
              ctx!.arc(cx, cy, size / 2, 0, Math.PI * 2);
              ctx!.fill();
              break;
            case "diamond":
              ctx!.beginPath();
              ctx!.moveTo(cx, cy - size / 2);
              ctx!.lineTo(cx + size / 2, cy);
              ctx!.lineTo(cx, cy + size / 2);
              ctx!.lineTo(cx - size / 2, cy);
              ctx!.closePath();
              ctx!.fill();
              break;
            case "triangle": {
              const flip = (col + row) % 2 === 0;
              ctx!.beginPath();
              if (flip) {
                ctx!.moveTo(cx - size / 2, cy + size / 2);
                ctx!.lineTo(cx + size / 2, cy + size / 2);
                ctx!.lineTo(cx - size / 2, cy - size / 2);
              } else {
                ctx!.moveTo(cx - size / 2, cy - size / 2);
                ctx!.lineTo(cx + size / 2, cy - size / 2);
                ctx!.lineTo(cx + size / 2, cy + size / 2);
              }
              ctx!.closePath();
              ctx!.fill();
              break;
            }
            default:
              ctx!.fillRect(cx - size / 2, cy - size / 2, size, size);
          }
        }
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      if (canvas.parentElement === ctn) ctn.removeChild(canvas);
      clicksRef.current = [];
      clickIxRef.current = 0;
      timeOffsetRef.current = Math.random() * 1000;
    };
  }, [
    deviceQuality.disabled,
    effectiveDpr,
    densityMul,
    effectiveRipples,
    frameInterval,
    autoPauseOffscreen,
    pause,
    variant,
    pixelSize,
    colorRgb,
    patternDensity,
    pixelSizeJitter,
    rippleIntensityScale,
    rippleThickness,
    rippleSpeed,
    speed,
    transparent,
    edgeFade
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className ?? ""}`}
      style={
        deviceQuality.disabled
          ? { backgroundColor: color, opacity: 0.12, ...style }
          : style
      }
      aria-label="PixelBlastLite interactive background"
      {...rest}
    />
  );
}
