"use client";

import PixelSnow from "@/components/PixelSnow";

export default function BlogBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-label="Blog background">
      <PixelSnow
        color="#f5a524"
        flakeSize={0.01}
        minFlakeSize={1.25}
        pixelResolution={200}
        speed={1.25}
        density={0.3}
        direction={125}
        brightness={1}
        depthFade={8}
        farPlane={20}
        gamma={0.4545}
        variant="square"
      />
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}