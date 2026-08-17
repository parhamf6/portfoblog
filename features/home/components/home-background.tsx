"use client";

import FaultyTerminal from "@/components/FaultyTerminal";

export default function HomeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <FaultyTerminal
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#f5a524"
        mouseReact
        mouseStrength={0.5}
        pageLoadAnimation
        brightness={0.3}
      />
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}