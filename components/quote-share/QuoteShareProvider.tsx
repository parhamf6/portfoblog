// components/quote-share/QuoteShareProvider.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ShareDialog } from './ShareDialog';
import { QuoteShareButton } from './QuoteShareButton';
import { useTextSelection } from '@/hooks/useTextSelection';
import { ShareDialogData, QuoteShareProps } from '@/types/quote-share';

interface QuoteShareContextType {
  openShareDialog: (text: string) => void;
}

const QuoteShareContext = createContext<QuoteShareContextType | null>(null);

export const useQuoteShare = () => {
  const context = useContext(QuoteShareContext);
  if (!context) {
    throw new Error('useQuoteShare must be used within QuoteShareProvider');
  }
  return context;
};

export const QuoteShareProvider: React.FC<QuoteShareProps & { children: React.ReactNode }> = ({ 
  children, 
  author = "Your Name", 
  source = "Your Blog",
  blogTitle,
  watermark
}) => {
  const { selectedText, selectionPosition, setSelectedText } = useTextSelection();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareData, setShareData] = useState<ShareDialogData>({
    text: '',
    author,
    source,
    background: '#FFFFFF', // Minimal theme background
    backgroundType: 'solid',
    gradientColor: '#F8F9FA',
    pattern: 'none',
    textColor: '#000000',
    fontFamily: 'var(--font-sans)',
    layout: 'classic',
    aspectRatio: 'square',
    quality: 95,
    showWatermark: false,
    watermark: watermark || ''
  });

  const openShareDialog = useCallback((text: string) => {
    setShareData({
      text,
      author,
      source: blogTitle || source,
      background: '#FFFFFF', // Minimal theme background
      backgroundType: 'solid',
      gradientColor: '#F8F9FA',
      pattern: 'none',
      textColor: '#000000',
      fontFamily: 'var(--font-sans)',
      layout: 'classic',
      aspectRatio: 'square',
      quality: 95,
      showWatermark: !!watermark,
      watermark: watermark || ''
    });
    setShowShareDialog(true);
    setSelectedText('');
  }, [author, source, blogTitle, watermark, setSelectedText]);

  const handleShareClick = () => {
    if (selectedText) {
      openShareDialog(selectedText);
    }
  };

  return (
    <QuoteShareContext.Provider value={{ openShareDialog }}>
      {children}
      
      {selectedText && (
        <QuoteShareButton 
          position={selectionPosition}
          onShare={handleShareClick}
        />
      )}
      
      <ShareDialog
        open={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        initialData={shareData}
      />
    </QuoteShareContext.Provider>
  );
};