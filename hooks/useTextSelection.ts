// // hooks/useTextSelection.ts
// import { useState, useEffect } from 'react';

// export const useTextSelection = () => {
//   const [selectedText, setSelectedText] = useState('');
//   const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleTextSelection = () => {
//       const selection = window.getSelection();
//       const text = selection?.toString().trim() || '';
      
//       if (text.length > 15) { // Minimum text length for sharing
//         setSelectedText(text);
        
//         if (selection && selection.rangeCount > 0) {
//           const range = selection.getRangeAt(0);
//           const rect = range.getBoundingClientRect();
//           setSelectionPosition({
//             x: rect.left + rect.width / 2,
//             y: rect.top - 50
//           });
//         }
//       } else {
//         setSelectedText('');
//       }
//     };

//     const handleClickOutside = () => {
//       const selection = window.getSelection();
//       if (!selection?.toString().trim()) {
//         setSelectedText('');
//       }
//     };

//     document.addEventListener('mouseup', handleTextSelection);
//     document.addEventListener('touchend', handleTextSelection);
//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('mouseup', handleTextSelection);
//       document.removeEventListener('touchend', handleTextSelection);
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return { selectedText, selectionPosition, setSelectedText };
// };


// hooks/useTextSelection.ts
import { useState, useEffect } from 'react';

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim() || '';
      
      if (text.length > 15) { // Minimum text length for sharing
        setSelectedText(text);
        
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          // Make sure the button stays within the viewport
          const x = Math.max(50, Math.min(window.innerWidth - 50, rect.left + rect.width / 2));
          const y = Math.max(50, rect.top - 50);
          
          setSelectionPosition({ x, y });
        }
      } else {
        setSelectedText('');
      }
    };

    const handleClickOutside = () => {
      const selection = window.getSelection();
      if (!selection?.toString().trim()) {
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { selectedText, selectionPosition, setSelectedText };
};



// hooks/useTextSelection.ts
// import { useState, useEffect } from 'react';

// export const useTextSelection = () => {
//   const [selectedText, setSelectedText] = useState('');
//   const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleTextSelection = () => {
//       // Add delay for mobile selection to complete
//       setTimeout(() => {
//         const selection = window.getSelection();
//         const text = selection?.toString().trim() || '';
        
//         console.log('Selected text:', text, 'Length:', text.length); // Debug
        
//         if (text.length > 15) {
//           setSelectedText(text);
          
//           if (selection && selection.rangeCount > 0) {
//             const range = selection.getRangeAt(0);
//             const rect = range.getBoundingClientRect();
            
//             // CRITICAL: Add scroll offset for mobile
//             const scrollY = window.scrollY || window.pageYOffset;
//             const scrollX = window.scrollX || window.pageXOffset;
            
//             // Calculate position with scroll offset
//             let x = rect.left + rect.width / 2 + scrollX;
//             let y = rect.top + scrollY - 60; // Move button above selection
            
//             // Keep button within viewport bounds
//             x = Math.max(60, Math.min(window.innerWidth - 60, x));
//             y = Math.max(10, y); // Allow button at top of screen
            
//             console.log('Button position:', { x, y, scrollY }); // Debug
            
//             setSelectionPosition({ x, y });
//           }
//         } else {
//           setSelectedText('');
//         }
//       }, 150); // Longer delay for mobile
//     };

//     const handleClickOutside = (e: Event) => {
//       // Don't clear if clicking share button or dialog
//       const target = e.target as Element;
//       if (target.closest('[data-quote-share-button]') || 
//           target.closest('[data-quote-share-dialog]')) {
//         return;
//       }
      
//       setTimeout(() => {
//         const selection = window.getSelection();
//         if (!selection?.toString().trim()) {
//           setSelectedText('');
//         }
//       }, 100);
//     };

//     // Add both mouse and touch events
//     document.addEventListener('mouseup', handleTextSelection);
//     document.addEventListener('touchend', handleTextSelection);
//     document.addEventListener('selectionchange', handleTextSelection); // Important for mobile
//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('mouseup', handleTextSelection);
//       document.removeEventListener('touchend', handleTextSelection);
//       document.removeEventListener('selectionchange', handleTextSelection);
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return { selectedText, selectionPosition, setSelectedText };
// };