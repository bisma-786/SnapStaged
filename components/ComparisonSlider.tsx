
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ComparisonSliderProps {
  before: string;
  after: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const boundedX = Math.min(Math.max(x, 0), 100);
    setSliderPosition(boundedX);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden cursor-ew-resize select-none border-4 border-white shadow-2xl bg-slate-900 group"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* "Before" Image (Base Layer - Original) */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={before} 
          alt="Original Property Plate" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* "After" Image (Top Layer - Revealed Staged Version) */}
      <div 
        className="absolute inset-0 w-full h-full z-10 pointer-events-none transition-all duration-75 ease-out"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img 
          src={after} 
          alt="Professionally Staged Result" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Slider Line Overlay */}
      <div 
        className="absolute inset-y-0 w-1 bg-white/80 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none transition-all duration-75 ease-out"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Center Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-snap-navy group-hover:scale-110 transition-transform">
          <div className="flex gap-1">
            <div className="w-1 h-5 bg-snap-navy rounded-full opacity-30"></div>
            <div className="w-1 h-5 bg-snap-navy rounded-full"></div>
            <div className="w-1 h-5 bg-snap-navy rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Positioning Responsive Badges */}
      <div className="absolute top-6 left-6 z-30 pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition < 90 ? 1 : 0 }}>
        <div className="px-5 py-2.5 bg-snap-gold backdrop-blur-xl text-white text-[9px] lg:text-[11px] font-black rounded-full uppercase tracking-[0.2em] border border-white/20 shadow-2xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Staged Result
        </div>
      </div>
      <div className="absolute top-6 right-6 z-30 pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition > 10 ? 1 : 0 }}>
        <div className="px-5 py-2.5 bg-snap-navy/90 backdrop-blur-xl text-white text-[9px] lg:text-[11px] font-black rounded-full uppercase tracking-[0.2em] border border-white/20 shadow-2xl">
          Original Plate
        </div>
      </div>

      {/* Signature Watermark */}
      <div className="absolute bottom-6 right-8 z-30 opacity-30 pointer-events-none font-serif italic text-white text-lg select-none">
        SnapStaged
      </div>
    </div>
  );
};

export default ComparisonSlider;
