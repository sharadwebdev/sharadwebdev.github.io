import React, { useEffect, useRef } from 'react';
import { Briefcase, ExternalLink, Sparkles, Layers, ArrowUpRight, Code2 } from 'lucide-react';
import { GithubIcon } from '../Icons/BrandIcons';
import { projects } from '../../data/projects';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

const techTagClassMap = {
  'Laravel': 'tag-laravel',
  'React.js': 'tag-react',
  'Tailwind CSS': 'tag-tailwind',
  'WebSockets': 'tag-api',
  'REST APIs': 'tag-api',
  'API Integration': 'tag-api',
  'Python': 'tag-python',
  'AI Integration': 'tag-ai',
  'Bootstrap': 'tag-bootstrap',
  'MySQL': 'tag-mysql'
};

export const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

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

      // 2. Alternating 3D Parallax Perspective Slide-In GSAP Animation
      const cardElements = cardsRef.current.filter(Boolean);

      cardElements.forEach((card, idx) => {
        const isEven = idx % 2 === 0;
        const initialX = isEven ? -90 : 90;
        const initialRotateY = isEven ? -10 : 10;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: initialX,
            rotateY: initialRotateY,
            scale: 0.93
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 3. Interactive 3D Mouse Hover Tilt
      cardElements.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            rotateY: (x / rect.width) * 6,
            rotateX: -(y / rect.height) * 6,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Clean Standard Section Header */}
        <div ref={headerRef} className="section-header mb-16 text-center">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">Projects</h2>
        </div>

        {/* 3D Alternating Perspective Parallax Cards Showcase */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              style={{
                backgroundColor: '#0c0b16',
                backgroundImage: 'linear-gradient(135deg, #0e0d1e 0%, #080712 100%)'
              }}
              className="project-card w-full border border-white/12 hover:border-indigo-500/40 rounded-2xl p-8 sm:p-10 shadow-2xl relative mx-auto group transition-all duration-300 hover:shadow-indigo-500/15"
            >
              {/* Top Gradient Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent group-hover:via-indigo-400 transition-all duration-500" />

              {/* Card Header & Category Badge */}
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:border-indigo-500/50 transition-colors">
                    <Briefcase className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="project-title font-title font-extrabold text-2xl sm:text-3xl text-white group-hover:text-indigo-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-300 font-mono mt-1">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {project.metrics && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {project.metrics}
                    </span>
                  )}
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="project-description text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tech Stack Tags & Action Buttons */}
              <div className="flex justify-between items-center flex-wrap gap-6 pt-6 border-t border-white/10">
                <div className="project-tech-stack flex flex-wrap gap-2.5">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className={`tech-tag ${techTagClassMap[tech] || ''}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* External Action Buttons */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all"
                      aria-label="View Source Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-title text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
