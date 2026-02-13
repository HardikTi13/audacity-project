"use client";

import { useState, useCallback } from "react";

/* ── Types ── */
type BoxState = {
  value: number;
  locked: boolean;
};

/* ── Config ── */
const GRID_SIZE = 9;
const COLS = 3;
const LOCK_THRESHOLD = 15;

export default function Home() {
  const [grid, setGrid] = useState<BoxState[]>(
    Array.from({ length: GRID_SIZE }, () => ({ value: 0, locked: false }))
  );

  /* Track animations */
  const [animatingCells, setAnimatingCells] = useState<Map<number, string>>(new Map());

  // Helper to trigger transient animation class
  const triggerAnimation = (index: number, type: 'pop' | 'flash') => {
    setAnimatingCells(prev => {
      const next = new Map(prev);
      next.set(index, type);
      return next;
    });
    
    setTimeout(() => {
      setAnimatingCells(prev => {
        const next = new Map(prev);
        if (next.get(index) === type) next.delete(index);
        return next;
      });
    }, 400);
  };

  const handleBoxClick = useCallback((initialIndex: number) => {
    if (grid[initialIndex].locked) return;

    setGrid((prev) => {
      const next = prev.map((b) => ({ ...b }));
      
      // Queue for BFS propagation: [index, increment_amount]
      // We'll queue the initial click as a +1 update
      const queue: { index: number; change: number }[] = [{ index: initialIndex, change: 1 }];
      
      // To prevent infinite loops (though DAG guarantees termination, safety first),
      // we could track processed events if needed, but for now simple propagation should suffice
      // given the constraints (Right and Down only).
      
      let processedCount = 0;
      const MAX_PROPAGATIONS = 100; // Safety break

      while (queue.length > 0 && processedCount < MAX_PROPAGATIONS) {
        const { index, change } = queue.shift()!;
        processedCount++;

        // Apply change
        if (next[index].locked) continue; // Skip if locked during propagation? 
        // Logic: Should a locked box accept changes? 
        // Requirement says "Locked boxes cannot be changed". 
        // So we check locked state before applying.
        
        next[index].value += change;
        
        // Trigger animation for this box
        // Use 'pop' for user click (initial), 'flash' for ripples
        triggerAnimation(index, index === initialIndex ? 'pop' : 'flash');

        // Check locking
        if (next[index].value >= LOCK_THRESHOLD) {
          next[index].locked = true;
        }

        const newVal = next[index].value;

        // Rule A (Divisible by 3 -> Right -1)
        if (newVal !== 0 && newVal % 3 === 0) {
          const col = index % COLS;
          if (col < COLS - 1) {
            const rightIdx = index + 1;
            if (!next[rightIdx].locked) {
              queue.push({ index: rightIdx, change: -1 });
            }
          }
        }

        // Rule B (Divisible by 5 -> Below +2)
        if (newVal !== 0 && newVal % 5 === 0) {
          const row = Math.floor(index / COLS);
          if (row < COLS - 1) {
            const belowIdx = index + COLS;
            if (!next[belowIdx].locked) {
              queue.push({ index: belowIdx, change: 2 });
            }
          }
        }
      }

      return next;
    });
  }, [grid]);

  const handleReset = () => {
    setGrid(Array.from({ length: GRID_SIZE }, () => ({ value: 0, locked: false })));
    setAnimatingCells(new Map());
  };


  /* ── Styles Helper ── */
  const getBoxClass = (box: BoxState, idx: number) => {
    const base = "grid-box";
    const animType = animatingCells.get(idx);
    const animClass = animType === 'pop' ? 'number-pop' : animType === 'flash' ? 'ripple-flash' : '';
    
    // We only use classes for text color and cursor now, background is dynamic
    if (box.locked) return `${base} box-locked ${animClass}`;
    if (box.value % 2 === 0) return `${base} box-even ${animClass}`;
    return `${base} box-odd ${animClass}`;
  };

  const getBoxStyle = (box: BoxState) => {
    if (box.locked) return { backgroundColor: '#ef5350', color: 'white' }; // Locked Red

    const val = box.value;
    if (val % 2 === 0) {
      // Even: Start at Light Gray (#e0e0e0 -> 88% Lightness) and darken
      // 0 -> 88%, 14 -> darker
      const lightness = Math.max(50, 88 - (val * 2)); 
      return { backgroundColor: `hsl(0, 0%, ${lightness}%)`, color: 'black' };
    } else {
      // Odd: Start at Navy Blue (#1a237e -> ~30% Lightness) and lighten
      // 1 -> 30%, 13 -> lighter
      const lightness = Math.min(70, 30 + ((val - 1) * 3));
      return { backgroundColor: `hsl(235, 66%, ${lightness}%)`, color: 'white' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">


      {/* Main Glass Panel */}
      <main className="glass-panel p-8 md:p-12 w-full max-w-2xl flex flex-col items-center animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="title-gradient">Recursive Grid</span>
          </h1>
          <p className="text-slate-500 instruction-text max-w-md mx-auto leading-relaxed">
            A strategic ripple game. Watch the numbers cascade.
          </p>
        </div>

        {/* Rules Indicators (Desktop) */}
        <div className="hidden md:flex gap-4 mb-8 text-xs font-mono text-slate-500">
          <span className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            ÷3 ➔ Right -1
          </span>
          <span className="px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            ÷5 ➔ Below +2
          </span>
        </div>

        {/* The Grid */}
        <div className="game-grid mb-10">
          {grid.map((box, i) => (
            <button
              key={i}
              onClick={() => handleBoxClick(i)}
              disabled={box.locked}
              className={getBoxClass(box, i)}
              style={getBoxStyle(box)}
              aria-label={`Box ${i}, Value ${box.value}`}
            >
              {/* Value with key for re-triggering simplistic animations if needed */}
              <span key={`val-${box.value}`}>{box.value}</span>
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mb-8">
           <button
             onClick={handleReset}
             className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-full transition-all active:scale-95 text-sm"
           >
             Reset Grid
           </button>
        </div>


        {/* Legend / Footer */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-500">
          <div className="legend-item">
            <div className="legend-dot bg-[#e0e0e0] border border-black"></div>
            <span>Even</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot bg-[#1a237e]"></div>
            <span>Odd</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot bg-[#ef5350]"></div>
            <span>Locked (≥15)</span>
          </div>
        </div>

        {/* Mobile Rules (Only visible on small screens) */}
        <div className="mt-8 md:hidden text-center text-xs text-slate-500 font-mono space-y-1">
          <p>Rule A: ÷3 → Right Box -1</p>
          <p>Rule B: ÷5 → Below Box +2</p>
        </div>
      </main>
      
      <footer className="mt-8 text-slate-500 text-xs font-mono">
        Designed for Audacity • Next.js + Tailwind
      </footer>
    </div>
  );
}
