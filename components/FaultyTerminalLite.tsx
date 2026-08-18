"use client";

/**
 * FaultyTerminalLite
 * ------------------------------------------------------------------
 * Suggested path: components/FaultyTerminalLite.tsx
 *
 * A Canvas 2D re-imagining of FaultyTerminal, with no WebGL at all.
 * Instead of evaluating an fbm-noise shader for every screen pixel,
 * this draws a grid of a few hundred small rectangles per frame and
 * animates their brightness with a couple of cheap sine waves. The
 * visual language (flickering digital grid, sweeping scanline,
 * mouse-reactive glow, occasional horizontal glitch, page-load
 * fade-in) is the same; the implementation is orders of magnitude
 * cheaper, so it should be comfortably smooth even on weak/old phones.
 *
 * Deliberately dropped vs. the WebGL version (see explanation in
 * chat): curvature (barrel distortion), chromatic aberration, and
 * dithering - all three are per-pixel operations that are nearly
 * free in a fragment shader but require getImageData/putImageData on
 * Canvas2D, which would undo the whole point of this "lite" version.
 *
 * Shares the same useDeviceQuality hook as FaultyTerminal/PixelBlast
 * for dpr + grid-density scaling and pause-when-hidden/offscreen
 * behaviour, so all three stay consistent.
 * ------------------------------------------------------------------
 */

import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { useDeviceQuality, type QualityLevel } from "./useDeviceQuality";

type Vec2 = [number, number];

export interface FaultyTerminalLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Overall zoom of the grid - higher = more, smaller cells. */
  scale?: number;
  /** Grid density multiplier per axis, same idea as the WebGL version. */
  gridMul?: Vec2;
  /** Fill ratio of each lit cell's square (0.3 - ~1.6). */
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  /** Strength of the continuous horizontal CRT-style wobble + occasional glitch pulses. */
  glitchAmount?: number;
  flickerAmount?: number;
  /** Roughly maps to how much of the grid is "on" at once. */
  noiseAmp?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  /** Overrides the auto-detected devicePixelRatio cap. */
  dpr?: number;
  pageLoadAnimation?: boolean;
  brightness?: number;
  /** Overrides the auto-detected quality tier. */
  quality?: QualityLevel;
  /** Caps the render loop's frame rate. Defaults based on quality tier. */
  targetFps?: number;
  /** Pause when the container is scrolled out of view. Default: true. */
  autoPauseOffscreen?: boolean;
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

/** Deterministic cheap pseudo-random hash for a grid cell, stable across frames. */
function hash2(i: number, j: number): number {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export default function FaultyTerminalLite({
  scale = 1,
  gridMul = [2, 1],
  digitSize = 1.2,
  timeScale = 0.5,
  pause = false,
  scanlineIntensity = 0.5,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  tint = "#f5a524",
  mouseReact = true,
  mouseStrength = 0.5,
  dpr: dprOverride,
  pageLoadAnimation = true,
  brightness = 0.3,
  quality: qualityOverride,
  targetFps,
  autoPauseOffscreen = true,
  className,
  style,
  ...rest
}: FaultyTerminalLiteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const isIntersectingRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const loadStartRef = useRef(0);
  const timeOffsetRef = useRef(Math.random() * 100);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const glitchRef = useRef({ nextAt: 0, until: 0, active: false, seed: 0 });
  const gridRef = useRef({ cols: 0, rows: 0, cellW: 0, cellH: 0 });

  const deviceQuality = useDeviceQuality();
  const quality: QualityLevel = qualityOverride ?? deviceQuality.level;
  const effectiveDpr = dprOverride ?? deviceQuality.dpr;

  // Grid density scales down a tier at a time on weaker devices -
  // this is the main lever here, since fillRect count dominates cost.
  const densityMul = quality === "high" ? 1 : quality === "medium" ? 0.75 : 0.5;

  const frameInterval = targetFps
    ? 1000 / targetFps
    : quality === "high"
      ? 0
      : quality === "medium"
        ? 1000 / 30
        : 1000 / 24;

  const tintRgb = useMemo(() => hexToRgb(tint), [tint]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const rect = ctn.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    // Reduced motion / data-saver: skip entirely, JSX below renders a
    // static gradient fallback instead.
    if (deviceQuality.disabled) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    ctn.appendChild(canvas);
    canvasRef.current = canvas;

    const [r, g, b] = tintRgb;

    function computeGrid() {
      const cssW = ctn.offsetWidth || 1;
      const cssH = ctn.offsetHeight || 1;

      canvas.width = Math.max(1, Math.floor(cssW * effectiveDpr));
      canvas.height = Math.max(1, Math.floor(cssH * effectiveDpr));
      ctx!.setTransform(effectiveDpr, 0, 0, effectiveDpr, 0, 0);

      const baseColsPerUnit = gridMul[0] * 15;
      const baseRowsPerUnit = gridMul[1] * 15;
      const cols = Math.max(6, Math.round(baseColsPerUnit * scale * densityMul));
      const rows = Math.max(4, Math.round(baseRowsPerUnit * scale * densityMul));

      gridRef.current = {
        cols,
        rows,
        cellW: cssW / cols,
        cellH: cssH / rows
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

    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove, { passive: true });
      ctn.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    const threshold = Math.min(0.8, Math.max(0.25, 0.62 - (noiseAmp - 1) * 0.12));
    const squareRatio = Math.min(0.95, Math.max(0.3, digitSize / 1.8));

    const update = (now: number) => {
      rafRef.current = requestAnimationFrame(update);

      if (frameInterval > 0 && now - lastFrameTimeRef.current < frameInterval) return;
      lastFrameTimeRef.current = now;

      const shouldAnimate = !pause && !document.hidden && isIntersectingRef.current;
      if (!shouldAnimate) return;

      if (pageLoadAnimation && loadStartRef.current === 0) loadStartRef.current = now;

      const t = (now * 0.001 + timeOffsetRef.current) * timeScale;
      const { cols, rows, cellW, cellH } = gridRef.current;
      const cssW = cols * cellW;
      const cssH = rows * cellH;

      // Smoothed mouse position, in grid units.
      if (mouseReact) {
        const damp = 0.08;
        smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * damp;
        smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * damp;
      }
      const mouseCol = smoothMouseRef.current.x * cols;
      const mouseRow = smoothMouseRef.current.y * rows;

      // Occasional stronger glitch pulse, on top of a continuous subtle wobble.
      const gs = glitchRef.current;
      if (gs.nextAt === 0) gs.nextAt = now + 1500 + Math.random() * 3000;
      if (!gs.active && now >= gs.nextAt) {
        gs.active = true;
        gs.until = now + 90 + Math.random() * 160;
        gs.seed = Math.random() * 100;
      }
      if (gs.active && now >= gs.until) {
        gs.active = false;
        gs.nextAt = now + 1800 + Math.random() * 3500;
      }
      const pulseMul = gs.active ? 3.2 : 1;

      ctx!.clearRect(0, 0, cssW, cssH);

      // Page-load progress (0..1).
      const loadElapsed = pageLoadAnimation ? now - loadStartRef.current : 100000;

      for (let row = 0; row < rows; row++) {
        // Continuous CRT-style horizontal wobble, cheap: one sin() per row.
        const wobble = Math.sin(t * 3 + row * 0.7 + (gs.active ? gs.seed : 0)) * glitchAmount * pulseMul * 1.4;
        const rowY = row * cellH;

        for (let col = 0; col < cols; col++) {
          const h = hash2(col, row);
          const n1 = Math.sin(col * 0.35 + t * 0.9 + h * 6.283);
          const n2 = Math.sin(row * 0.5 - t * 0.6 + h * 4.71);
          const intensity = (n1 * n2) * 0.5 + 0.5;

          if (intensity < threshold) continue;

          let alpha = 0.32 + 0.68 * intensity;

          // Mouse glow.
          if (mouseReact && mouseRef.current.active) {
            const dx = col - mouseCol;
            const dy = row - mouseRow;
            const dist = Math.sqrt(dx * dx + dy * dy);
            alpha += mouseStrength * Math.exp(-dist * 0.35);
          }

          // Cheap flicker jitter.
          if (flickerAmount > 0 && hash2(col + 91.3, row - 47.1 + Math.floor(now / 90)) > 0.985) {
            alpha *= 1 - flickerAmount * 0.5;
          }

          // Page-load stagger fade-in.
          if (pageLoadAnimation) {
            const delay = h * 900;
            const progress = Math.min(1, Math.max(0, (loadElapsed - delay) / 500));
            alpha *= progress * progress * (3 - 2 * progress);
          }

          alpha = Math.min(1, Math.max(0, alpha * brightness));
          if (alpha <= 0.01) continue;

          const size = Math.min(cellW, cellH) * squareRatio;
          const cx = col * cellW + (cellW - size) / 2 + wobble;
          const cy = rowY + (cellH - size) / 2;

          ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx!.fillRect(cx, cy, size, size);
        }
      }

      // Sweeping scanline band.
      if (scanlineIntensity > 0) {
        const bandH = cssH * 0.18;
        const bandY = ((t * 0.22) % 1) * (cssH + bandH) - bandH;
        const grad = ctx!.createLinearGradient(0, bandY, 0, bandY + bandH);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.12 * scanlineIntensity * brightness})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, bandY, cssW, bandH);
      }
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
        ctn.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (canvas.parentElement === ctn) ctn.removeChild(canvas);
      canvasRef.current = null;
      loadStartRef.current = 0;
      timeOffsetRef.current = Math.random() * 100;
      glitchRef.current = { nextAt: 0, until: 0, active: false, seed: 0 };
    };
  }, [
    deviceQuality.disabled,
    effectiveDpr,
    densityMul,
    frameInterval,
    autoPauseOffscreen,
    pause,
    timeScale,
    scale,
    gridMul,
    digitSize,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    tintRgb,
    mouseReact,
    mouseStrength,
    pageLoadAnimation,
    brightness,
    handleMouseMove,
    handleMouseLeave
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className ?? ""}`}
      style={
        deviceQuality.disabled
          ? {
              background: `radial-gradient(circle at 50% 30%, ${tint}22, transparent 70%)`,
              ...style
            }
          : style
      }
      {...rest}
    />
  );
}
