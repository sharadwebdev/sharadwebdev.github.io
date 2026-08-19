import React, { useEffect, useRef } from 'react';
import { Lightbulb, Globe, Database, Layers } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

export const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bioRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef(null);

  // Counter Refs for GSAP number interpolation
  const expNumRef = useRef(null);
  const projNumRef = useRef(null);
  const hoursNumRef = useRef(null);
  const satNumRef = useRef(null);

  const serviceCards = [
    {
      icon: <Lightbulb className="w-6 h-6 text-indigo-400" />,
      title: "Software Developer"
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      title: "Full Stack Developer"
    },
    {
      icon: <Database className="w-6 h-6 text-sky-400" />,
      title: "Backend Architect"
    },
    {
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      title: "Database Engineer"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 35, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%'
          }
        }
      );

      // 2. Bio Paragraphs Staggered Slide-In
      gsap.fromTo(
        bioRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 85%'
          }
        }
      );

      // 3. Service Role Cards Staggered 3D Holographic Flip
      const cardEls = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 50, rotateY: -45, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          transformPerspective: 1000,
          scrollTrigger: {
            trigger: cardEls[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Interactive 3D Mouse Tilt on Role Cards
      cardEls.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            rotateY: (x / rect.width) * 8,
            rotateX: -(y / rect.height) * 8,
            scale: 1.04,
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

      // 4. Stats Section Counter Number Count Up
      const counterObj = { exp: 0, proj: 0, hours: 0, sat: 0 };

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(counterObj, {
            exp: 3,
            proj: 10,
            hours: 1000,
            sat: 100,
            duration: 2.0,
            ease: 'power2.out',
            onUpdate: () => {
              if (expNumRef.current) expNumRef.current.innerText = `${Math.floor(counterObj.exp)}+`;
              if (projNumRef.current) projNumRef.current.innerText = `${Math.floor(counterObj.proj)}+`;
              if (hoursNumRef.current) hoursNumRef.current.innerText = `${Math.floor(counterObj.hours)}+`;
              if (satNumRef.current) satNumRef.current.innerText = `${Math.floor(counterObj.sat)}%`;
            }
          });

          gsap.fromTo(
            statsRef.current?.querySelectorAll('.stat-item') || [],
            { opacity: 0, y: 35, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.5)' }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="about" ref={sectionRef}>
        <div className="container">
          {/* Section Header */}
          <div ref={headerRef} className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Who Am I?</h2>
          </div>

          <div className="about-grid">
            <div className="about-info">
              <div ref={bioRef} className="flex flex-col gap-4">
                {personalInfo.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Service Cards Grid */}
              <div className="about-services-grid">
                {serviceCards.map((service, idx) => (
                  <div
                    key={idx}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className="service-card cursor-pointer"
                  >
                    <div className="service-icon-box">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section with GSAP Count Up */}
      <section ref={statsRef} className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <div ref={expNumRef} className="stat-number">
              {personalInfo.yearsExperience}
            </div>
            <div className="stat-label">Years Experience</div>
          </div>

          <div className="stat-item">
            <div ref={projNumRef} className="stat-number">
              {personalInfo.projectsCompleted}
            </div>
            <div className="stat-label">Projects Completed</div>
          </div>

          <div className="stat-item">
            <div ref={hoursNumRef} className="stat-number">
              {personalInfo.hoursCoded}
            </div>
            <div className="stat-label">Hours Coded</div>
          </div>

          <div className="stat-item">
            <div ref={satNumRef} className="stat-number">
              {personalInfo.satisfactionRate}
            </div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </section>
    </>
  );
};
