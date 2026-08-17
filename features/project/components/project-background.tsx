"use client";

import PixelBlast from "@/components/PixelBlast";

export default function ProjectBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-label="Projects page background">
      <PixelBlast
        variant="square"
        pixelSize={5}
        color="#f5a524"
        patternScale={2}
        patternDensity={0.5}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.5}
        edgeFade={0.25}
        transparent
      />
      <div className="pointer-events-none absolute inset-0 bg-background/80" />
    </div>
  );
}