import React, { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { educationList } from '../../data/education';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

export const Education = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal Animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%'
          }
        }
      );

      // 2. Timeline Items Reveal
      const itemElements = itemsRef.current.filter(Boolean);

      itemElements.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <span className="section-tag">Education</span>
          <h2 className="section-title">Academic Qualifications</h2>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="timeline-item"
            >
              <div className="timeline-dot">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              </div>

              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-duration">{edu.period}</span>
                  <span className="timeline-institution">{edu.institution}</span>
                </div>

                <h3 className="timeline-title">{edu.degree}</h3>
                <p className="timeline-desc">{edu.location}</p>

                {edu.highlights && (
                  <ul className="timeline-list">
                    {edu.highlights.map((item, hIdx) => (
                      <li key={hIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
