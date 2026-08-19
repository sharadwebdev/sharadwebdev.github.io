import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsapUtils';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const xOutline = gsap.quickTo(outline, 'x', { duration: 0.3, ease: 'power3.out' });
    const yOutline = gsap.quickTo(outline, 'y', { duration: 0.3, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .btn, .nav-cta, .service-card, .project-card, .skill-card, .social-icon');
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={outlineRef}
        className={`custom-cursor-outline ${isHovered ? 'hovered' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
};
