// components/quote-share/ShareDialog.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Copy, Facebook, Twitter, Linkedin, Instagram, CheckCircle, Palette, Type, Layout, Image, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTabs, DialogTab } from '@/components/ui/dialog-v2';
import { QuoteCanvas, QuoteCanvasRef } from './QuoteCanvas';
import { ShareDialogData } from '@/types/quote-share';
import { ScrollArea } from '@/components/ui/scroll-area'; // If using shadcn/ui

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  initialData: ShareDialogData;
}

// Simplified color themes with good contrast
const colorThemes = [
  { 
    id: 'solar-flare', 
    name: 'Solar Flare', 
    background: '#F8DF0B', // Primary Yellow
    textColor: '#1B1B23',  // Very dark foreground
    gradient: '#22C7E8'    // Cyan accent
  },
  { 
    id: 'ember-glow', 
    name: 'Ember Glow', 
    background: '#F82E0B', // Secondary Red-Orange
    textColor: '#1B1B23',  // Very dark foreground
    gradient: '#9C4DFF'    // Purple accent
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    background: '#FFFFFF', 
    textColor: '#000000',
    gradient: '#F8F9FA'
  }
];

const aspectRatios = [
  { id: 'square' as const, label: 'Square', icon: '⬜', description: '1:1' },
  { id: 'instagram' as const, label: 'Instagram', icon: '📱', description: '4:5' },
  { id: 'twitter' as const, label: 'Twitter', icon: '🐦', description: '16:9' },
  { id: 'pinterest' as const, label: 'Pinterest', icon: '📌', description: '2:3' },
];

// const fontFamilies = [
//   { id: 'var(--font-sans)', label: 'Sans' },
//   { id: 'var(--font-serif)', label: 'Serif' },
//   { id: 'var(--font-mono', label: 'Mono' },
// ];
const fontFamilies = [
  { id: 'var(--font-sans)', label: 'Sans' },
  { id: 'var(--font-serif)', label: 'Serif' },
  { id: 'var(--font-mono)', label: 'Mono' }, // Fixed the missing closing parenthesis
];

const layouts = [
  { id: 'classic' as const, label: 'Classic', icon: '📜' },
  { id: 'minimal' as const, label: 'Minimal', icon: '✨' },
  { id: 'centered' as const, label: 'Centered', icon: '🎯' }
];

const patterns = [
  { id: 'none' as const, label: 'None' },
  { id: 'dots' as const, label: 'Dots' },
  { id: 'lines' as const, label: 'Lines' },
  { id: 'grid' as const, label: 'Grid' }
];

const MAX_QUOTE_LENGTH = 420; // You can adjust this

export const ShareDialog: React.FC<ShareDialogProps> = ({ open, onClose, initialData }) => {
  const [data, setData] = useState<ShareDialogData>(initialData);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [customBgColor, setCustomBgColor] = useState('#FFFFFF');
  const [customTextColor, setCustomTextColor] = useState('#000000');
  const canvasRef = useRef<QuoteCanvasRef>(null);

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData);
    // Check if current background is a custom color
    const isCustom = !colorThemes.some(theme => theme.background === initialData.background);
    setIsCustomColor(isCustom);
    if (isCustom) {
      setCustomBgColor(initialData.background);
      setCustomTextColor(initialData.textColor);
    }
  }, [initialData]);

  // Update preview when data changes
  useEffect(() => {
    // This effect ensures the preview updates when data changes
  }, [data]);

  const updateData = (updates: Partial<ShareDialogData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${data.text}" - ${data.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(`"${data.text}" - ${data.author}`);
    const url = encodeURIComponent(window.location.href);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`
    };
    
    if (platform === 'instagram') {
      alert('Instagram doesn\'t support direct sharing. Please download the image and share it manually.');
      return;
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  // Apply a theme
  const applyTheme = (theme: typeof colorThemes[0]) => {
    const newData = {
      ...data,
      background: theme.background,
      textColor: theme.textColor,
      gradientColor: theme.gradient,
      backgroundType: 'gradient' as const
    };
    setData(newData);
    setIsCustomColor(false);
  };

  // Apply custom colors
  const applyCustomColors = () => {
    const newData = {
      ...data,
      background: customBgColor,
      textColor: customTextColor,
      backgroundType: 'solid' as const
    };
    setData(newData);
  };

  // Update custom colors
  useEffect(() => {
    if (isCustomColor) {
      applyCustomColors();
    }
  }, [customBgColor, customTextColor, isCustomColor]);

  // Function to render pattern overlay
  const renderPattern = () => {
    if (data.pattern === 'none') return null;
    
    const patternStyle = {
      backgroundImage: '',
      opacity: 0.1
    };
    
    switch (data.pattern) {
      case 'dots':
        patternStyle.backgroundImage = `radial-gradient(${data.textColor} 1px, transparent 1px)`;
        patternStyle.backgroundSize = '20px 20px';
        break;
      case 'lines':
        patternStyle.backgroundImage = `repeating-linear-gradient(45deg, transparent, transparent 10px, ${data.textColor} 10px, ${data.textColor} 11px)`;
        break;
      case 'grid':
        patternStyle.backgroundImage = `linear-gradient(${data.textColor} 1px, transparent 1px), linear-gradient(90deg, ${data.textColor} 1px, transparent 1px)`;
        patternStyle.backgroundSize = '20px 20px';
        break;
    }
    
    return (
      <div 
        className="absolute inset-0"
        style={patternStyle}
      />
    );
  };

  // Get background style for preview
  const getBackgroundStyle = () => {
    if (data.backgroundType === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${data.background}, ${data.gradientColor || data.background})`
      };
    } else {
      return {
        backgroundColor: data.background
      };
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-row justify-between items-center">
              <DialogTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Create & Share Quote
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <DialogTabs value={activeTab} onValueChange={setActiveTab}>
            <DialogTab value="preview" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Preview
            </DialogTab>
            <DialogTab value="customize" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Customize
            </DialogTab>
            <DialogTab value="text" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Text
            </DialogTab>
          </DialogTabs>
          
          <div className="space-y-6 mt-2">
            {activeTab === 'preview' && (
              <div className="space-y-6">
                {/* Warning outside preview */}
                {data.text.length > MAX_QUOTE_LENGTH && (
                  <div className="mb-2 p-3 rounded bg-yellow-100 text-yellow-800 font-semibold text-center border border-yellow-300">
                    ⚠️ This quote is very long. The image may not render perfectly.<br />
                    Consider shortening your quote for best results.
                  </div>
                )}
                <ScrollArea className="relative p-1 rounded-lg min-h-[250px] max-h-[400px] flex flex-col justify-center overflow-auto">
                  <div className="relative w-full h-full" style={getBackgroundStyle()}>
                    {renderPattern()}
                    <div className="relative z-10 p-1">
                      {data.text ? (
                        <>
                          <p 
                            className="text-xl font-bold leading-relaxed mb-4"
                            style={{ 
                              color: data.textColor,
                              fontFamily: data.fontFamily,
                              textAlign: data.layout === 'minimal' ? 'center' : 'left'
                            }}
                          >
                            {data.text}
                          </p>
                          
                          <div 
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                            style={{ 
                              color: data.textColor,
                              fontFamily: data.fontFamily
                            }}
                          >
                            <div className="font-medium">— {data.author}</div>
                            <div className="text-sm opacity-75">{data.source}</div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center opacity-60" style={{ color: data.textColor }}>
                          <p className="text-lg">Select text from the article to create a quote</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Watermark */}
                    {data.showWatermark && data.watermark && (
                      <div className="absolute bottom-3 right-3 text-xs opacity-50" style={{ color: data.textColor }}>
                        {data.watermark}
                      </div>
                    )}
                  </div>
                </ScrollArea>
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button 
                    onClick={() => canvasRef.current?.downloadImage()}
                    disabled={!data.text.trim()} // Only disable if there's no text at all
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Image
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={copyToClipboard}
                    disabled={!data.text.trim()}
                    className="flex items-center gap-2"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </Button>
                </div>
                
                {/* Social Sharing */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Share to Social Media</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => shareToSocial('twitter')}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => shareToSocial('facebook')}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => shareToSocial('linkedin')}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => shareToSocial('pinterest')}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      <span className="text-lg">📌</span>
                      Pinterest
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => shareToSocial('instagram')}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'customize' && (
              <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Color Theme</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {colorThemes.map(theme => (
                      <button
                        key={theme.id}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          !isCustomColor && data.background === theme.background 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => applyTheme(theme)}
                      >
                        <div 
                          className="w-full h-16 rounded mb-2"
                          style={{ 
                            background: `linear-gradient(135deg, ${theme.background}, ${theme.gradient})` 
                          }}
                        />
                        <div className="text-sm font-medium">{theme.name}</div>
                      </button>
                    ))}
                    <button
                      className={`p-3 rounded-lg border text-center transition-all ${
                        isCustomColor 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setIsCustomColor(true)}
                    >
                      <div className="w-full h-16 rounded mb-2 bg-gradient-to-r from-red-400 via-purple-500 to-blue-500" />
                      <div className="text-sm font-medium">Custom</div>
                    </button>
                  </div>
                  {isCustomColor && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background rounded-lg mt-3 border">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            className="w-10 h-10 border rounded cursor-pointer"
                            style={{ background: 'none', borderColor: '#ccc' }}
                          />
                          <Input
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            placeholder="#FFFFFF"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Text Color</Label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="w-10 h-10 border rounded cursor-pointer"
                            style={{ background: 'none', borderColor: '#ccc' }}
                          />
                          <Input
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Custom Color Picker */}
                {/* {isCustomColor && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customBgColor}
                          onChange={(e) => setCustomBgColor(e.target.value)}
                          className="w-10 h-10 border-0 rounded cursor-pointer"
                        />
                        <Input
                          value={customBgColor}
                          onChange={(e) => setCustomBgColor(e.target.value)}
                          placeholder="#FFFFFF"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Text Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customTextColor}
                          onChange={(e) => setCustomTextColor(e.target.value)}
                          className="w-10 h-10 border-0 rounded cursor-pointer"
                        />
                        <Input
                          value={customTextColor}
                          onChange={(e) => setCustomTextColor(e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )} */}
                
                {/* Pattern Selection */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Pattern Overlay</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {patterns.map(pattern => (
                      <button
                        key={pattern.id}
                        className={`p-3 rounded-lg border text-center ${
                          data.pattern === pattern.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:bg-gray-50'
                        } transition-colors`}
                        onClick={() => updateData({ pattern: pattern.id })}
                      >
                        <div className="text-sm">{pattern.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Layout Style */}
                <div>
                  <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Layout Style
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {layouts.map(layout => (
                      <button
                        key={layout.id}
                        className={`p-3 rounded-lg border text-center ${
                          data.layout === layout.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:bg-gray-50'
                        } transition-colors`}
                        onClick={() => updateData({ layout: layout.id })}
                      >
                        <div className="text-xl mb-1">{layout.icon}</div>
                        <div className="text-xs font-medium">{layout.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Font Family */}
                {/* <div>
                  <Label className="text-sm font-medium mb-3 block">Font Family</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {fontFamilies.map(font => (
                      <button
                        key={font.id}
                        className={`p-3 rounded-lg border text-center ${
                          data.fontFamily === font.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:bg-gray-50'
                        } transition-colors`}
                        style={{ fontFamily: font.id }}
                        onClick={() => updateData({ fontFamily: font.id })}
                      >
                        <div className="font-medium">{font.label}</div>
                        <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: font.id }}>Aa</div>
                      </button>
                    ))}
                  </div>
                </div> */}
                
                {/* Aspect Ratio */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Aspect Ratio</Label>
                  <div className="grid grid-cols-2  gap-2">
                    {aspectRatios.map(ratio => (
                      <button
                        key={ratio.id}
                        className={`p-3 rounded-lg border text-left flex items-center gap-3 ${
                          data.aspectRatio === ratio.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:bg-gray-50'
                        } transition-colors`}
                        onClick={() => updateData({ aspectRatio: ratio.id })}
                      >
                        <span className="text-lg">{ratio.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{ratio.label}</div>
                          <div className="text-xs text-gray-500">{ratio.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Watermark */}
                {/* <div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="watermark"
                      checked={data.showWatermark}
                      onChange={(e) => updateData({ showWatermark: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="watermark" className="text-sm font-medium">Add Watermark</Label>
                  </div>
                  {data.showWatermark && (
                    <Input
                      value={data.watermark || ''}
                      onChange={(e) => updateData({ watermark: e.target.value })}
                      placeholder="Enter watermark text"
                    />
                  )}
                </div> */}
              </div>
            )}
            
            {activeTab === 'text' && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="quote-text" className="text-sm font-medium mb-2 block">Quote Text</Label>
                  <textarea
                    id="quote-text"
                    value={data.text}
                    onChange={(e) => updateData({ text: e.target.value })}
                    placeholder="Enter or edit your quote text here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-card-foreground"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {data.text.length} characters
                  </div>
                </div>
                
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author" className="text-sm font-medium">Author</Label>
                    <Input
                      id="author"
                      value={data.author}
                      onChange={(e) => updateData({ author: e.target.value })}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="source" className="text-sm font-medium">Source</Label>
                    <Input
                      id="source"
                      value={data.source}
                      onChange={(e) => updateData({ source: e.target.value })}
                      placeholder="Source/Website"
                    />
                  </div>
                </div> */}
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => canvasRef.current?.downloadImage()}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Image
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={copyToClipboard}
                      disabled={!data.text.trim()}
                      className="flex items-center gap-2"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy Text'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Hidden Canvas for Image Generation */}
      <QuoteCanvas ref={canvasRef} data={data} />
    </>
  );
};