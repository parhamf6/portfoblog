"use client";

import FaultyTerminal from "@/components/FaultyTerminal";
import FaultyTerminalLite from "@/components/FaultyTerminalLite";

export default function HomeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <FaultyTerminalLite
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
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

// "use client";

// import CRTBackground from "@/components/CRTBackground";

// export default function HomeBackground() {
//   return (
//     <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
//       <CRTBackground
//         tint="#f5a524"
//         brightness={0.55}
//         staticOpacity={0.07}
//         glitchAmount={1.2}
//         chromaticAberration={0.55}
//         scanlineIntensity={0.5}
//         vignetteIntensity={0.65}
//         pixelSize={9}
//         showSprite
//       />
//       <div className="absolute inset-0 bg-background/55" />
//     </div>
//   );
// }
