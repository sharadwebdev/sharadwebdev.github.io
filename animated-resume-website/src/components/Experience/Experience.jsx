import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

export const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineLineRef = useRef(null);
  const itemsRef = useRef([]);
  const dotsRef = useRef([]);

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

      // 2. Vertical Timeline Line Scroll Progress Draw
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: 0.5
            }
          }
        );
      }

      // 3. Staggered 3D Perspective Slide-In for Timeline Cards & Pulsing Dots
      const itemElements = itemsRef.current.filter(Boolean);

      itemElements.forEach((item, idx) => {
        const isEven = idx % 2 === 0;
        const initialX = isEven ? -70 : 70;
        const initialRotateY = isEven ? -8 : 8;
        const dot = dotsRef.current[idx];

        // Timeline item entrance
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: initialX,
            rotateY: initialRotateY,
            scale: 0.94
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Timeline dot scale & glow animation
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%'
              }
            }
          );
        }

        // Interactive 3D Mouse Tilt
        const handleMouseMove = (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(item, {
            rotateY: (x / rect.width) * 5,
            rotateX: -(y / rect.height) * 5,
            scale: 1.01,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
          });
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        };

        item.addEventListener('mousemove', handleMouseMove);
        item.addEventListener('mouseleave', handleMouseLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="section-header mb-16 text-center">
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        {/* Timeline Container with Dynamic Animated Gradient Line */}
        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Animated Glowing Connector Line */}
          <div
            ref={timelineLineRef}
            className="hidden sm:block absolute left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top shadow-[0_0_12px_rgba(99,102,241,0.5)] z-0"
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="timeline-item flex gap-6 relative z-10">
                {/* Timeline Dot */}
                <div
                  ref={(el) => (dotsRef.current[idx] = el)}
                  className="timeline-dot w-16 h-16 rounded-2xl bg-[#0c0b16] border border-indigo-500/40 flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/10 z-10 group-hover:border-indigo-400 transition-colors"
                >
                  <Briefcase className="w-6 h-6 text-indigo-400" />
                </div>

                {/* Timeline Card */}
                <div
                  ref={(el) => (itemsRef.current[idx] = el)}
                  style={{
                    backgroundColor: '#0c0b16',
                    backgroundImage: 'linear-gradient(135deg, #0e0d1e 0%, #080712 100%)'
                  }}
                  className="timeline-content flex-1 border border-white/12 hover:border-indigo-500/40 rounded-2xl p-8 shadow-2xl relative group transition-all duration-300 hover:shadow-indigo-500/15"
                >
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent group-hover:via-indigo-400 transition-all duration-500" />

                  {/* Header Meta */}
                  <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider uppercase block mb-1">
                        {exp.company}
                      </span>
                      <h3 className="timeline-title font-title font-extrabold text-2xl text-white group-hover:text-indigo-200 transition-colors">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="timeline-desc text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Responsibilities Bullet List */}
                  <ul className="timeline-list space-y-2.5 mb-6">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Badges */}
                  {exp.technologies && (
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-indigo-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
