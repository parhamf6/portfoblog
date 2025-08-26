// components/quote-share/QuoteShareButton.tsx
import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuoteShareButtonProps {
  position: { x: number; y: number };
  onShare: () => void;
}

export const QuoteShareButton: React.FC<QuoteShareButtonProps> = ({ position, onShare }) => {
  return (
    <div 
      className="fixed z-50 bg-gradient-to-r from-secondary to-accent text-white px-3 py-2 rounded-lg shadow-lg transform -translate-x-1/2 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{ left: position.x, top: position.y }}
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
