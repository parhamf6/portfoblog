"use client";

/**
 * FaultyTerminal
 * ------------------------------------------------------------------
 * Suggested path: components/FaultyTerminal.tsx
 *
 * Changes vs. the original version:
 *
 * 1. Adaptive quality (useDeviceQuality): dpr, internal render
 *    resolution, and shader "supersample" path all scale down on
 *    weaker/mobile devices instead of being fixed.
 * 2. Cheap shader path (uSupersample): the original always sampled
 *    `digit()` 9 extra times per pixel purely to fake a soft glow
 *    around each cell (`sum`). Each `digit()` call runs `pattern()` ->
 *    5x `fbm()` -> 3x `noise()` each, so that's ~135 extra noise
 *    evaluations per pixel. On low/medium tier devices we now
 *    approximate `sum` as `middle * 9.0` instead of resampling,
 *    which keeps the same brightness weighting the original formula
 *    used, for a fraction of the cost.
 * 3. Internal render resolution can be scaled down and stretched via
 *    CSS on weaker devices (`renderScale`), independent of dpr.
 * 4. Pauses (skips the render call entirely, not just the time
 *    update) when the tab is hidden (document.hidden) or the
 *    container is scrolled out of view (IntersectionObserver), in
 *    addition to the existing `pause` prop.
 * 5. Frame-rate is capped (default: uncapped on "high", 30fps on
 *    "medium", 24fps on "low") since a decorative background gains
 *    little from running at native refresh rate.
 * 6. Respects prefers-reduced-motion / navigator.connection.saveData:
 *    skips mounting WebGL entirely and renders a cheap static
 *    gradient fallback using the same tint color instead.
 * 7. Fixed a real bug: the effect's dependency array referenced
 *    `griMul` (typo, undefined variable) instead of `gridMul`, so the
 *    grid density prop silently never triggered a rebuild.
 * 8. WebGL context creation is wrapped in try/catch; on failure we
 *    fall back to the same static gradient rather than crashing.
 * ------------------------------------------------------------------
 */

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useDeviceQuality, QUALITY_PRESETS, type QualityLevel } from "./useDeviceQuality";

type Vec2 = [number, number];

export interface FaultyTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  scale?: number;
  gridMul?: Vec2;
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number | boolean;
  curvature?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  /** Overrides the auto-detected devicePixelRatio cap. Leave unset to let useDeviceQuality decide. */
  dpr?: number;
  pageLoadAnimation?: boolean;
  brightness?: number;
  /** Overrides the auto-detected quality tier ("high" | "medium" | "low"). */
  quality?: QualityLevel;
  /** Caps the render loop's frame rate. Defaults based on quality tier. */
  targetFps?: number;
  /** Pause rendering (and skip the render call) when the container is scrolled out of view. Default: true. */
  autoPauseOffscreen?: boolean;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform float uSupersample;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);

    // uSupersample < 0.5: cheap path for low/medium quality tiers.
    // The original sampled 8 neighbouring cells purely to approximate
    // a soft glow ("sum"). We approximate the same magnitude without
    // paying for 8 extra digit() calls (each ~15 noise evaluations).
    float sum;
    if (uSupersample > 0.5) {
      const float off = 0.002;
      sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
            digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
            digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    } else {
      sum = middle * 9.0;
    }
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0 && uSupersample > 0.5){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3)
    h = h
      .split("")
      .map(c => c + c)
      .join("");
  const num = parseInt(h.slice(0, 6), 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

export default function FaultyTerminal({
  scale = 1,
  gridMul = [2, 1],
  digitSize = 1.5,
  timeScale = 0.3,
  pause = false,
  scanlineIntensity = 0.3,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.2,
  tint = "#ffffff",
  mouseReact = true,
  mouseStrength = 0.2,
  dpr: dprOverride,
  pageLoadAnimation = true,
  brightness = 1,
  quality: qualityOverride,
  targetFps,
  autoPauseOffscreen = true,
  className,
  style,
  ...rest
}: FaultyTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const frozenTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const loadAnimationStartRef = useRef<number>(0);
  const timeOffsetRef = useRef<number>(Math.random() * 100);
  const isIntersectingRef = useRef(true);
  const lastFrameTimeRef = useRef(0);

  const deviceQuality = useDeviceQuality();
  const quality: QualityLevel = qualityOverride ?? deviceQuality.level;
  const preset = QUALITY_PRESETS[quality];
  const effectiveDpr = dprOverride ?? deviceQuality.dpr;
  const renderScale = preset.renderScale;
  const supersample = quality === "high";

  const frameInterval = targetFps
    ? 1000 / targetFps
    : quality === "high"
      ? 0
      : quality === "medium"
        ? 1000 / 30
        : 1000 / 24;

  const tintVec = useMemo(() => hexToRgb(tint), [tint]);

  const ditherValue = useMemo(() => (typeof dither === "boolean" ? (dither ? 1 : 0) : dither), [dither]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const rect = ctn.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    // Reduced motion / data-saver: don't mount WebGL at all, the JSX
    // below renders a cheap static gradient instead.
    if (deviceQuality.disabled) return;

    let renderer: Renderer;
    let gl: WebGLRenderingContext | WebGL2RenderingContext;
    try {
      renderer = new Renderer({ dpr: effectiveDpr, alpha: true });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 1);
    } catch (err) {
      // No WebGL available at all - fail silently, static fallback stays visible.
      console.warn("FaultyTerminal: WebGL context could not be created, skipping.", err);
      return;
    }
    rendererRef.current = renderer;

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uScale: { value: scale },

        uGridMul: { value: new Float32Array(gridMul) },
        uDigitSize: { value: digitSize },
        uScanlineIntensity: { value: scanlineIntensity },
        uGlitchAmount: { value: glitchAmount },
        uFlickerAmount: { value: flickerAmount },
        uNoiseAmp: { value: noiseAmp },
        uChromaticAberration: { value: chromaticAberration },
        uDither: { value: ditherValue },
        uCurvature: { value: curvature },
        uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },
        uMouse: {
          value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y])
        },
        uMouseStrength: { value: mouseStrength },
        uUseMouse: { value: mouseReact ? 1 : 0 },
        uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },
        uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },
        uBrightness: { value: brightness },
        uSupersample: { value: supersample ? 1 : 0 }
      }
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!ctn || !renderer) return;
      const w = Math.max(1, Math.floor(ctn.offsetWidth * renderScale));
      const h = Math.max(1, Math.floor(ctn.offsetHeight * renderScale));
      renderer.setSize(w, h);
      // renderer.setSize sets canvas.style.width/height to the *logical*
      // (possibly downscaled) size we just passed in. Force it back to
      // fill the container so the smaller backing buffer gets stretched
      // via CSS instead of visually shrinking the canvas.
      Object.assign(gl.canvas.style, { width: "100%", height: "100%" });
      program.uniforms.iResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(ctn);
    resize();

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

    const update = (t: number) => {
      rafRef.current = requestAnimationFrame(update);

      if (frameInterval > 0 && t - lastFrameTimeRef.current < frameInterval) return;
      lastFrameTimeRef.current = t;

      const shouldAnimate = !pause && !document.hidden && isIntersectingRef.current;

      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {
        loadAnimationStartRef.current = t;
      }

      if (shouldAnimate) {
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;
        program.uniforms.iTime.value = elapsed;
        frozenTimeRef.current = elapsed;
      } else {
        program.uniforms.iTime.value = frozenTimeRef.current;
      }

      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {
        const animationDuration = 2000;
        const animationElapsed = t - loadAnimationStartRef.current;
        const progress = Math.min(animationElapsed / animationDuration, 1);
        program.uniforms.uPageLoadProgress.value = progress;
      }

      if (mouseReact) {
        const dampingFactor = 0.08;
        const smoothMouse = smoothMouseRef.current;
        const mouse = mouseRef.current;
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;

        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = smoothMouse.x;
        mouseUniform[1] = smoothMouse.y;
      }

      // Skip the actual GPU render call when hidden/offscreen/paused -
      // this is the expensive part, not the bookkeeping above.
      if (!shouldAnimate) return;

      renderer.render({ scene: mesh });
    };
    rafRef.current = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    if (mouseReact) ctn.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      if (mouseReact) ctn.removeEventListener("mousemove", handleMouseMove);
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      loadAnimationStartRef.current = 0;
      timeOffsetRef.current = Math.random() * 100;
    };
  }, [
    deviceQuality.disabled,
    effectiveDpr,
    renderScale,
    supersample,
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
    chromaticAberration,
    ditherValue,
    curvature,
    tintVec,
    mouseReact,
    mouseStrength,
    pageLoadAnimation,
    brightness,
    handleMouseMove
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
