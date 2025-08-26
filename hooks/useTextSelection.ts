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