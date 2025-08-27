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
          
//           // Make sure the button stays within the viewport
//           const x = Math.max(50, Math.min(window.innerWidth - 50, rect.left + rect.width / 2));
//           const y = Math.max(50, rect.top - 50);
          
//           setSelectionPosition({ x, y });
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
import { useCallback, useEffect, useRef, useState } from "react";

type Pos = { x: number; y: number };

export const useTextSelection = (minLength = 15) => {
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<Pos>({ x: 0, y: 0 });

  // store last time we detected a selection (ms)
  const lastSelectionTimeRef = useRef<number>(0);
  // prevent repeated processing
  const processingRef = useRef(false);

  const clearSelection = useCallback(() => {
    try {
      const sel = window.getSelection?.();
      if (sel) {
        sel.removeAllRanges();
      }
    } catch (_) {
      /* noop */
    }
    setSelectedText("");
  }, []);

  const computeAndSetSelection = useCallback(() => {
    if (processingRef.current) return;
    processingRef.current = true;

    try {
      const selection = window.getSelection?.();
      const text = selection?.toString().trim() || "";

      if (text.length >= minLength && selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // prefer first client rect (works well for multi-line selections)
        const clientRects = range.getClientRects();
        const rect = clientRects && clientRects.length > 0 ? clientRects[0] : range.getBoundingClientRect();

        // sometimes rect can be all zeros (esp. collapsed ranges) — bail out then
        if (!rect || (rect.width === 0 && rect.height === 0 && rect.left === 0 && rect.top === 0)) {
          // still set text, but position fallback to center of viewport top
          setSelectedText(text);
          setSelectionPosition({ x: Math.max(50, window.innerWidth / 2), y: 80 });
        } else {
          // compute a nice fixed-position button that doesn't overflow viewport
          const x = Math.max(50, Math.min(window.innerWidth - 50, rect.left + rect.width / 2));
          // position above selection; if selection is near top, put below
          const y = rect.top > 120 ? Math.max(50, rect.top - 60) : Math.min(window.innerHeight - 80, rect.bottom + 40);

          setSelectedText(text);
          setSelectionPosition({ x, y });

          lastSelectionTimeRef.current = Date.now();
        }
      } else {
        // if selection shorter than minLength clear
        setSelectedText("");
      }
    } catch (err) {
      // fallback: clear selection
      setSelectedText("");
    } finally {
      // small delay before allowing next processing
      setTimeout(() => {
        processingRef.current = false;
      }, 50);
    }
  }, [minLength]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Selection has changed (best event to catch selection updates)
    const onSelectionChange = () => {
      // selectionchange can be very chatty in some browsers - throttle a little
      setTimeout(computeAndSetSelection, 0);
    };

    // Mobile: after touchend the selection might be applied slightly later -> small delay
    const onTouchEnd = () => {
      setTimeout(computeAndSetSelection, 50); // 50ms is usually enough
    };

    // pointerup for stylus/finger in many modern browsers
    const onPointerUp = () => {
      setTimeout(computeAndSetSelection, 50);
    };

    // Clicking/tapping elsewhere should clear, but avoid clearing right after a selection was detected
    const onPointerDown = (e: PointerEvent | MouseEvent | TouchEvent) => {
      const now = Date.now();
      // if user selected within last 800ms, don't immediately clear (lets click on share button)
      if (now - lastSelectionTimeRef.current < 800) {
        return;
      }
      // else, schedule a short clear (allow selectionchange to run first)
      setTimeout(() => {
        const sel = window.getSelection?.();
        if (!sel || !sel.toString().trim()) {
          setSelectedText("");
        }
      }, 0);
    };

    document.addEventListener("selectionchange", onSelectionChange);
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [computeAndSetSelection]);

  // expose setter too (you already returned that before)
  return { selectedText, selectionPosition, setSelectedText, clearSelection };
};
