// // components/quote-share/QuoteShareButton.tsx
// import React from 'react';
// import { Share2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface QuoteShareButtonProps {
//   position: { x: number; y: number };
//   onShare: () => void;
// }

// export const QuoteShareButton: React.FC<QuoteShareButtonProps> = ({ position, onShare }) => {
//   // Detect if on mobile (simple check by window width)
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

//   // Add an offset to avoid native browser controls
//   const yOffset = isMobile ? 40 : -10; 
//   // On mobile → push button below selection
//   // On desktop → keep slightly above

//   return (
//     <div 
//       className="fixed z-50 bg-gradient-to-r from-secondary to-accent text-white px-3 py-2 rounded-lg shadow-lg transform -translate-x-1/2 animate-in fade-in-0 zoom-in-95 duration-200"
//       style={{ left: position.x, top: position.y + yOffset }}
//     >
//       <Button 
//         variant="ghost" 
//         size="sm" 
//         onClick={onShare}
//         className="text-white hover:border-border h-8 px-2"
//       >
//         <Share2 className="h-4 w-4 mr-1" />
//         Share Quote
//       </Button>
//     </div>
//   );
// };

// components/quote-share/QuoteShareButton.tsx
import React, { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuoteShareButtonProps {
  position: { x: number; y: number };
  onShare: () => void;
}

export const QuoteShareButton: React.FC<QuoteShareButtonProps> = ({ position, onShare }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    const buttonHeight = 40; // Approximate height of the share button
    const padding = 12; // Small margin from selection

    // Check available space below the selection
    const spaceBelow = window.innerHeight - position.y;

    if (isMobile) {
      // On mobile → prefer below unless too close to bottom
      if (spaceBelow > buttonHeight + padding) {
        setOffset(buttonHeight + padding); // show below
      } else {
        setOffset(-(buttonHeight + padding)); // fallback above
      }
    } else {
      // On desktop → prefer above unless too close to top
      if (position.y > buttonHeight + padding) {
        setOffset(-(buttonHeight + padding)); // show above
      } else {
        setOffset(buttonHeight + padding); // fallback below
      }
    }
  }, [position]);

  return (
    <div 
      className="fixed z-50 bg-gradient-to-r from-secondary to-accent text-white px-3 py-2 rounded-lg shadow-lg transform -translate-x-1/2 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{ left: position.x, top: position.y + offset }}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onShare}
        className="text-white hover:border-border h-8 px-2"
      >
        <Share2 className="h-4 w-4 mr-1" />
        Share Quote
      </Button>
    </div>
  );
};
