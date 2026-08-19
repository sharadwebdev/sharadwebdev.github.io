import React, { useEffect, useRef } from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

export const Certifications = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%'
          }
        }
      );

      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-20 relative overflow-hidden bg-[#0b0d12]">
      {/* Background Accent */}
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-badge">
            <Award className="w-3.5 h-3.5" />
            <span>Recognitions & Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="gradient-accent-text">Achievements</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Professional industry certifications validating cloud architecture, full-stack frameworks, and web security.
          </p>
        </div>

        {/* Certifications Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 border-white/10 text-decoration-none"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-sky-400/50 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-sky-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-sky-400 transition-colors mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono mb-4">
                  {cert.issuer}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Issued {cert.year}</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
