// // types/quote-share.ts
// export interface ShareDialogData {
//     text: string;
//     author: string;
//     source: string;
//     background: string;
//     aspectRatio: 'square' | 'instagram' | 'twitter';
// }

// export interface QuoteShareProps {
//     author?: string;
//     source?: string;
//     blogTitle?: string;
// }



// types/quote-share.ts
// export interface ShareDialogData {
//     text: string;
//     author: string;
//     source: string;
//     background: string;
//     backgroundType: 'solid' | 'gradient';
//     gradientColor?: string;
//     pattern: 'none' | 'dots' | 'lines' | 'grid';
//     textColor: 'auto' | string;
//     fontFamily: string;
//     layout: 'classic' | 'minimal' | 'centered';
//     aspectRatio: 'square' | 'instagram' | 'twitter' | 'pinterest' | 'facebook';
//     quality: number;
//     showWatermark: boolean;
//     watermark?: string;
// }

// export interface QuoteShareProps {
//     author?: string;
//     source?: string;
//     blogTitle?: string;
//     watermark?: string;
// }



// types/quote-share.ts
export interface ShareDialogData {
    text: string;
    author: string;
    source: string;
    background: string;
    backgroundType: 'solid' | 'gradient';
    gradientColor?: string;
    pattern: 'none' | 'dots' | 'lines' | 'grid';
    textColor: string;
    fontFamily: string;
    layout: 'classic' | 'minimal' | 'centered';
    aspectRatio: 'square' | 'instagram' | 'twitter' | 'pinterest';
    quality: number;
    showWatermark: boolean;
    watermark?: string;
}

export interface QuoteShareProps {
    author?: string;
    source?: string;
    blogTitle?: string;
    watermark?: string;
}