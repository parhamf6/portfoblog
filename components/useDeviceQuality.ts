"use client";

/**
 * useDeviceQuality
 * ------------------------------------------------------------------
 * Suggested path: components/useDeviceQuality.ts
 *
 * Shared adaptive-quality hook for the WebGL background effects
 * (FaultyTerminal, PixelBlast). Combines static heuristics (mobile
 * UA / viewport, CPU core count, device memory, WebGL2 support,
 * prefers-reduced-motion, Save-Data) with a short dynamic FPS sample
 * taken right after mount, so devices that misreport their specs (or
 * are thermally throttled) still get downgraded.
 *
 * The FPS sample is approximate: it measures the page's own
 * requestAnimationFrame cadence while the consuming component's own
 * render loop is competing for the same frame budget. That's exactly
 * the signal we want (a device that's actually struggling right now),
 * but it means the sample isn't a clean isolated benchmark.
 * ------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";

export type QualityLevel = "high" | "medium" | "low";

export interface DeviceQuality {
  /** Overall quality tier consumers should render at. */
  level: QualityLevel;
  /** Recommended devicePixelRatio cap for this tier (already clamped to the real DPR). */
  dpr: number;
  /** Recommended internal render-resolution multiplier (<=1), for downscale-then-CSS-stretch. */
  renderScale: number;
  /** Coarse mobile/touch heuristic. */
  isMobile: boolean;
  /** Whether a WebGL2 context is available at all. */
  hasWebGL2: boolean;
  /** prefers-reduced-motion: reduce */
  reducedMotion: boolean;
  /** navigator.connection.saveData */
  saveData: boolean;
  /**
   * True when the effect should not render (mount) at all - reduced
   * motion or data-saver mode. Consumers should show a cheap static
   * fallback instead (e.g. a CSS gradient using the same tint/color).
   */
  disabled: boolean;
}

/** Shared dpr / render-scale presets, exported so components can reuse them consistently. */
export const QUALITY_PRESETS: Record<QualityLevel, { dpr: number; renderScale: number }> = {
  high: { dpr: 2, renderScale: 1 },
  medium: { dpr: 1.5, renderScale: 0.85 },
  low: { dpr: 1, renderScale: 0.6 },
};

function detectWebGL2(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

function detectStatic() {
  if (typeof window === "undefined") {
    return {
      level: "high" as QualityLevel,
      isMobile: false,
      hasWebGL2: true,
      reducedMotion: false,
      saveData: false,
    };
  }

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const saveData = Boolean((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData);
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile|Silk/i.test(navigator.userAgent) ||
    (window.matchMedia?.("(max-width: 768px)").matches ?? false);
  const hasWebGL2 = detectWebGL2();

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4; // GB, Chrome-only

  let level: QualityLevel;
  if (!hasWebGL2) {
    level = "low";
  } else if (isMobile) {
    level = cores <= 4 || mem <= 4 ? "low" : "medium";
  } else {
    level = cores <= 2 ? "medium" : "high";
  }

  return { level, isMobile, hasWebGL2, reducedMotion, saveData };
}

export function useDeviceQuality(): DeviceQuality {
  const staticInfo = useRef(detectStatic());
  const [level, setLevel] = useState<QualityLevel>(staticInfo.current.level);
  const sampled = useRef(false);

  useEffect(() => {
    const { reducedMotion, saveData } = staticInfo.current;
    // No point burning a frame budget sampling FPS if we're not going
    // to render anyway.
    if (reducedMotion || saveData || sampled.current) return;
    sampled.current = true;

    let frames = 0;
    let start = -1;
    let raf = 0;
    const SAMPLE_MS = 1500;

    const tick = (t: number) => {
      if (start < 0) start = t;
      frames += 1;
      const elapsed = t - start;
      if (elapsed >= SAMPLE_MS) {
        const fps = (frames * 1000) / elapsed;
        setLevel(prev => {
          if (fps < 24) return "low";
          if (fps < 40 && prev === "high") return "medium";
          return prev;
        });
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { isMobile, hasWebGL2, reducedMotion, saveData } = staticInfo.current;
  const preset = QUALITY_PRESETS[level];
  const dpr = typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, preset.dpr);

  return {
    level,
    dpr,
    renderScale: preset.renderScale,
    isMobile,
    hasWebGL2,
    reducedMotion,
    saveData,
    disabled: reducedMotion || saveData,
  };
}
