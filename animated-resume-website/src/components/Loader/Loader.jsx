import React, { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../utils/gsapUtils';
import { personalInfo } from '../../data/personal';

export const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const logoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (onComplete) onComplete();
      return;
    }

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.floor(obj.val);
        setProgress(val);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${val}%`;
        }
      }
    });

    // Exit animation sequence
    tl.to(counterRef.current, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' })
      .to(logoRef.current, { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in' }, '-=0.2')
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut'
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (prefersReducedMotion()) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-8 sm:p-12 pb-24 sm:pb-32 bg-[#06050c] text-white"
    >
      {/* Top Header */}
      <div className="w-full max-w-5xl flex justify-between items-center opacity-60 font-mono text-xs tracking-widest uppercase">
        <span>Portfolio 2026</span>
        <span>{personalInfo.location}</span>
      </div>

      {/* Center Brand */}
      <div ref={logoRef} className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] mb-6 shadow-2xl shadow-indigo-500/40">
          <div className="w-full h-full bg-[#0c0b16] rounded-[14px] flex items-center justify-center font-title font-extrabold text-3xl text-white">
            S<span className="text-gradient">.dev</span>
          </div>
        </div>
        <h1 className="font-title font-extrabold text-4xl sm:text-6xl tracking-tight mb-3">
          Sharad<span className="text-gradient">.dev</span>
        </h1>
        <p className="font-title text-sm sm:text-base text-gray-400 tracking-wide font-medium">
          {personalInfo.title}
        </p>
      </div>

      {/* Raised Bottom Counter & Progress Bar */}
      <div ref={counterRef} className="w-full max-w-md flex flex-col gap-3 mb-10">
        <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-gray-300">
          <span className="tracking-widest uppercase font-semibold text-gray-400">INITIALIZING SYSTEM</span>
          <span className="text-gradient font-extrabold text-base">{progress}%</span>
        </div>
        
        <div className="w-full h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden p-[2px] shadow-inner">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-0 rounded-full transition-all duration-75 shadow-lg shadow-indigo-500/50"
          />
        </div>
      </div>
    </div>
  );
};
