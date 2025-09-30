// app/not-found.tsx
'use client';

import { useEffect, useState } from 'react';
import NotFoundV1 from '@/components/404/shader';
import NotFoundV2 from '@/components/404/prism';

export default function NotFound() {
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    // Randomly select variant on mount
    const variant = Math.random() < 0.5 ? 'A' : 'B';
    setSelectedVariant(variant);
    
    // Optional: Log for analytics
    console.log(`404 Page Variant: ${variant}`);
  }, []);

  // Show nothing while determining variant (prevents flash)
  if (!selectedVariant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Render the selected variant
  return selectedVariant === 'A' ? <NotFoundV1 /> : <NotFoundV2 />;
}
