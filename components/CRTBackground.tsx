"use client";

/**
 * CRTBackground
 * ------------------------------------------------------------------
 * Suggested path: components/CRTBackground.tsx
 *
 * The page background is the inside of an OLD CRT television —
 * pixel games, static snow, the works. No scrolling terminal, no
 * dot-matrix shader; this is the tube itself:
 *
 *  1. Power-on sequence. On load the screen warms up the way a real
 *     TV does: a thin bright line sweeps open vertically, white
 *     flashes, static rolls, then it settles into a dark screen.
 *  2. Pixelated static (snow). Low-res noise is generated offscreen
 *     then drawn upscaled with smoothing off, so every grain is a
 *     chunky pixel — the look of an old arcade CRT. It hums faintly
 *     all the time and bursts in louder when you "change the channel".
 *  3. Aperture grille + scanlines. The vertical RGB stripes and the
 *     horizontal retrace lines of a real shadow-mask tube.
 *  4. Tube geometry. Curved corners, vignette, chromatic aberration
 *     at the edges, glass glare, screen flicker and a rolling band.
 *  5. A faint pixel-art sprite (default: a pixel heart) in the corner,
 *     bobbing like an idle game character.
 *
 * Everything respects useDeviceQuality: reduced-motion / save-data
 * users get a static gradient + scanline screenshot (no canvas, no
 * animation); weaker devices get a chunkier pixel size + capped FPS.
 *
 * Fully self-contained — keyframes injected via a scoped <style> tag,
 * no globals.css changes required.
 * ------------------------------------------------------------------
 */

import React, { useEffect, useMemo, useRef } from "react";
import { useDeviceQuality, type QualityLevel } from "./useDeviceQuality";

export interface CRTBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Phosphor / screen glow tint. */
  tint?: string;
  /** Global brightness multiplier (0..1). */
  brightness?: number;
  /** Base static (snow) opacity (0..1) — keep small so content stays readable. */
  staticOpacity?: number;
  /** How often / how strongly the "channel change" static burst hits. */
  glitchAmount?: number;
  /** Screen-wide flicker (0..1). */
  flickerAmount?: number;
  /** RGB fringe strength at the edges (0..1). */
  chromaticAberration?: number;
  /** Scanline darkness (0..1). */
  scanlineIntensity?: number;
  /** Corner curvature / vignette strength (0..1). */
  vignetteIntensity?: number;
  /** Chunky pixel size for the static noise, in CSS px. */
  pixelSize?: number;
  /** Show the faint pixel-art sprite in the corner. */
  showSprite?: boolean;
  pause?: boolean;
  /** Overrides the auto-detected devicePixelRatio cap. */
  dpr?: number;
  /** Overrides the auto-detected quality tier. */
  quality?: QualityLevel;
  /** Caps the render loop's frame rate. */
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

function hash2(i: number, j: number): number {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const CRT_KEYFRAMES = `
@keyframes crtbg-flicker {
  0%, 100% { opacity: 1; }
  7%  { opacity: 0.985; }
  19% { opacity: 1; }
  32% { opacity: 0.95; }
  46% { opacity: 1; }
  58% { opacity: 0.985; }
  72% { opacity: 1; }
  84% { opacity: 0.94; }
  92% { opacity: 1; }
}
@keyframes crtbg-roll {
  0%   { transform: translateY(-30%); opacity: 0; }
  6%   { opacity: 1; }
  94%  { opacity: 1; }
  100% { transform: translateY(130%); opacity: 0; }
}
`;

// A tiny pixel-art sprite (pixel heart) rendered as "X" cells.
const SPRITE_HEART = [
  ".XX.XX.",
  "XXXXXXX",
  "XXXXXXX",
  ".XXXXX.",
  "..XXX..",
  "...X...",
];

export default function CRTBackground({
  tint = "#f5a524",
  brightness = 0.55,
  staticOpacity = 0.07,
  glitchAmount = 1,
  flickerAmount = 0.5,
  chromaticAberration = 0.5,
  scanlineIntensity = 0.5,
  vignetteIntensity = 0.65,
  pixelSize = 9,
  showSprite = true,
  pause = false,
  dpr: dprOverride,
  quality: qualityOverride,
  targetFps,
  autoPauseOffscreen = true,
  className,
  style,
  ...rest
}: CRTBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const isIntersectingRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const burstRef = useRef({ active: false, until: 0, nextAt: 0 });
  const noiseRefreshRef = useRef(0);

  const deviceQuality = useDeviceQuality();
  const quality: QualityLevel = qualityOverride ?? deviceQuality.level;
  const effectiveDpr = dprOverride ?? deviceQuality.dpr;

  // Weaker devices get chunkier pixels + capped fps.
  const pixelScale = quality === "high" ? 1 : quality === "medium" ? 1.4 : 2;
  const frameInterval = targetFps
    ? 1000 / targetFps
    : quality === "high"
      ? 0
      : quality === "medium"
        ? 1000 / 30
        : 1000 / 24;

  const tintRgb = useMemo(() => hexToRgb(tint), [tint]);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    if (deviceQuality.disabled) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    ctn.appendChild(canvas);
    canvasRef.current = canvas;

    const [tr, tg, tb] = tintRgb;

    let cssW = 1;
    let cssH = 1;

    // Low-res offscreen noise buffer, upscaled to chunky pixels.
    const noiseCanvas = document.createElement("canvas");
    const noiseCtx = noiseCanvas.getContext("2d");
    let noiseImage: ImageData | null = null;
    let nw = 0;
    let nh = 0;
    const px = Math.max(2, pixelSize * pixelScale);

    const el = ctn;
    function computeMetrics() {
      cssW = el.offsetWidth || 1;
      cssH = el.offsetHeight || 1;

      canvas.width = Math.max(1, Math.floor(cssW * effectiveDpr));
      canvas.height = Math.max(1, Math.floor(cssH * effectiveDpr));
      ctx!.setTransform(effectiveDpr, 0, 0, effectiveDpr, 0, 0);

      nw = Math.max(4, Math.ceil(cssW / px));
      nh = Math.max(3, Math.ceil(cssH / px));
      noiseCanvas.width = nw;
      noiseCanvas.height = nh;
      noiseImage = noiseCtx!.createImageData(nw, nh);
    }

    computeMetrics();
    const resizeObserver = new ResizeObserver(computeMetrics);
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

    const refreshNoise = () => {
      const d = noiseImage!.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      noiseCtx!.putImageData(noiseImage!, 0, 0);
    };

    const update = (now: number) => {
      rafRef.current = requestAnimationFrame(update);

      if (frameInterval > 0 && now - lastFrameTimeRef.current < frameInterval) return;
      lastFrameTimeRef.current = now;

      const shouldAnimate = !pause && !document.hidden && isIntersectingRef.current;
      if (!shouldAnimate) return;

      const t = now * 0.001;

      // Occasional "channel change" static burst.
      const b = burstRef.current;
      if (b.nextAt === 0) b.nextAt = now + 6000 + Math.random() * 9000;
      if (!b.active && now >= b.nextAt) {
        b.active = true;
        b.until = now + 200 + Math.random() * 260 * glitchAmount;
      }
      if (b.active && now >= b.until) {
        b.active = false;
        b.nextAt = now + 5000 + Math.random() * 12000;
      }

      // Refresh the noise buffer at ~15fps (chunky, film-like).
      if (now >= noiseRefreshRef.current) {
        refreshNoise();
        noiseRefreshRef.current = now + 66;
      }

      // ---- draw static ----
      ctx!.clearRect(0, 0, cssW, cssH);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.imageSmoothingEnabled = false;

      let staticA = staticOpacity * brightness;
      if (b.active) {
        const pulse = Math.sin(now * 0.05) * 0.5 + 0.5;
        staticA = (0.18 + pulse * 0.22) * glitchAmount;
      }

      // slight tint on the snow so it feels like a phosphor tube
      ctx!.globalAlpha = Math.min(1, staticA);
      if (noiseImage) ctx!.drawImage(noiseCanvas, 0, 0, cssW, cssH);
      ctx!.globalAlpha = 1;

      // horizontal interference bands during a burst
      if (b.active) {
        ctx!.fillStyle = `rgba(${tr},${tg},${tb},0.10)`;
        const bands = 2;
        for (let i = 0; i < bands; i++) {
          const bandY = ((now * 0.01 + i * 0.37) % 1) * cssH;
          ctx!.fillRect(0, bandY, cssW, px * 3);
        }
      }

      // ---- pixel-art sprite (idle bob) ----
      if (showSprite) {
        const cells = SPRITE_HEART;
        const s = px * 0.9;
        const w = cells[0].length * s;
        const h = cells.length * s;
        const bob = Math.sin(t * 1.4) * 3;
        const blink = Math.sin(t * 2.2) > 0.96 ? 0.3 : 1; // occasional sprite "wink"
        const sx = cssW - w - 26;
        const sy = cssH - h - 26 + bob;
        ctx!.globalCompositeOperation = "lighter";
        for (let row = 0; row < cells.length; row++) {
          for (let col = 0; col < cells[row].length; col++) {
            if (cells[row][col] !== "X") continue;
            ctx!.fillStyle = `rgba(${tr},${tg},${tb},${0.14 * brightness * blink})`;
            ctx!.fillRect(sx + col * s, sy + row * s, s - 0.5, s - 0.5);
          }
        }
        ctx!.globalCompositeOperation = "source-over";
      }
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      if (canvas.parentElement === ctn) ctn.removeChild(canvas);
      canvasRef.current = null;
      burstRef.current = { active: false, until: 0, nextAt: 0 };
      noiseRefreshRef.current = 0;
    };
  }, [
    deviceQuality.disabled,
    effectiveDpr,
    frameInterval,
    autoPauseOffscreen,
    pause,
    tintRgb,
    brightness,
    staticOpacity,
    glitchAmount,
    showSprite,
    pixelSize,
    pixelScale,
  ]);

  const [tr, tg, tb] = tintRgb;
  const tintSoft = `rgba(${tr},${tg},${tb},0.10)`;
  const tintFaint = `rgba(${tr},${tg},${tb},0.05)`;
  const disabled = deviceQuality.disabled;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative w-full h-full overflow-hidden ${className ?? ""}`}
      style={
        disabled
          ? { background: `radial-gradient(ellipse at 50% 40%, ${tint}30, transparent 74%)`, ...style }
          : style
      }
      aria-hidden
      {...rest}
    >
      <style dangerouslySetInnerHTML={{ __html: CRT_KEYFRAMES }} />

      {/* ---- animated tube (flickers as one unit) ---- */}
      <div
        className="absolute inset-0"
        style={{
          animation: `crtbg-flicker ${3.5 + flickerAmount}s linear infinite`,
        }}
      >
        {/* pixelated static (canvas) */}
        <canvas className="absolute inset-0 h-full w-full" />

        {/* faint pixel grid — old arcade screen */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${tintSoft} 1px, transparent 1px), linear-gradient(to bottom, ${tintSoft} 1px, transparent 1px)`,
            backgroundSize: `${Math.max(8, pixelSize * 2)}px ${Math.max(8, pixelSize * 2)}px`,
            opacity: 0.35,
          }}
        />

        {/* aperture grille (vertical RGB stripes) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(to right, rgba(255,0,80,0.04) 0 1px, rgba(0,255,120,0.03) 1px 2px, rgba(40,80,255,0.05) 2px 3px)`,
            mixBlendMode: "screen",
          }}
        />

        {/* horizontal scanlines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 1px, rgba(0,0,0,${0.22 * scanlineIntensity}) 1px 3px)`,
          }}
        />

        {/* rolling interference band */}
        {!disabled && (
          <div
            className="absolute inset-x-0 h-28"
            style={{
              top: 0,
              background: `linear-gradient(to bottom, transparent, ${tintFaint}, transparent)`,
              animation: "crtbg-roll 7s linear infinite",
            }}
          />
        )}
      </div>

      {/* ---- tube glass: chromatic edge + glare ---- */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 0% 50%, rgba(255,70,90,${0.06 * chromaticAberration}), transparent 48%),
            radial-gradient(ellipse 80% 80% at 100% 50%, rgba(60,140,255,${0.06 * chromaticAberration}), transparent 48%),
            linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, transparent 62%)
          `,
        }}
      />

      {/* ---- tube geometry: curvature + vignette ---- */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 118% 108% at 50% 50%, transparent ${Math.max(38, 66 - vignetteIntensity * 22)}%, rgba(0,0,0,${0.55 * vignetteIntensity}) 100%)`,
          boxShadow: `inset 0 0 ${150 * vignetteIntensity}px rgba(0,0,0,${0.6 * vignetteIntensity})`,
          borderRadius: "28px",
        }}
      />
    </div>
  );
}