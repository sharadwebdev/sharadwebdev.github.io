import React, { useEffect, useRef, useState } from 'react';
import { Download, Sparkles, Terminal, Code2, Server, Database, Cpu, Zap } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

const roles = [
  "Specializing in Laravel, React & Cloud APIs",
  "Architecting Scalable SaaS & Microservices",
  "Building High-Performance REST & WebSockets",
  "Optimizing Complex MySQL & Database Engines"
];

const floatingBadges = [
  { icon: <Server className="w-3.5 h-3.5 text-red-400" />, label: "Laravel 11", top: "12%", left: "-6%" },
  { icon: <Code2 className="w-3.5 h-3.5 text-sky-400" />, label: "React.js", top: "75%", left: "-8%" },
  { icon: <Database className="w-3.5 h-3.5 text-cyan-400" />, label: "MySQL 8", top: "20%", right: "-6%" },
  { icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />, label: "Node.js", top: "80%", right: "-5%" },
  { icon: <Zap className="w-3.5 h-3.5 text-yellow-400" />, label: "WebSockets", top: "-5%", left: "40%" }
];

const fullProfileJson = `// AI-Generated Developer Profile
{
  "name": "${personalInfo.name}",
  "role": "${personalInfo.title}",
  "experience": "${personalInfo.yearsExperience} Years",
  "location": "${personalInfo.location}",
  "coreTech": [
    "Laravel",
    "React.js",
    "Node.js",
    "MySQL"
  ],
  "motto": "Clean Code & Scalable Solutions"
}`;

export const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctasRef = useRef(null);
  const visualRef = useRef(null);
  const terminalInnerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const badgeRefs = useRef([]);

  // Typed code slice state driven on scroll
  const [typedCharCount, setTypedCharCount] = useState(0);

  // Auto-typing AI-style state for subtitle
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Subtitle Auto-typing loop
  useEffect(() => {
    const fullRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 35 : 70;

    if (!isDeleting && currentText === fullRole) {
      typingSpeed = 2200;
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) => {
        if (!isDeleting) {
          if (prev === fullRole) {
            setIsDeleting(true);
            return prev;
          }
          return fullRole.substring(0, prev.length + 1);
        } else {
          return fullRole.substring(0, prev.length - 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // GSAP Pinned ScrollTrigger Timeline
  useEffect(() => {
    if (prefersReducedMotion()) {
      setTypedCharCount(fullProfileJson.length);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance Animation on load
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .fromTo(badgeRef.current, { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.7 })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(ctasRef.current?.children || [], { opacity: 0, y: 25 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 }, '-=0.3')
        .fromTo(
          visualRef.current,
          { opacity: 0, y: 80, rotateY: -15, scale: 0.88 },
          { opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.8'
        );

      // Orbiting Badges
      badgeRefs.current.forEach((badge, idx) => {
        if (!badge) return;
        gsap.to(badge, {
          y: idx % 2 === 0 ? '-=14' : '+=14',
          x: idx % 2 === 0 ? '+=8' : '-=8',
          rotation: idx % 2 === 0 ? 5 : -5,
          duration: 3 + idx * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // 2. PIN Home Section Until JSON Typing Completes 100%
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const count = Math.floor(self.progress * fullProfileJson.length);
          setTypedCharCount(count);
        },
        animation: gsap.timeline()
          .to(visualRef.current, {
            rotateY: 10,
            rotateX: -5,
            scale: 1.02,
            boxShadow: '0 25px 60px rgba(99, 102, 241, 0.35)',
            ease: 'none'
          }, 0)
          .to(blob1Ref.current, { y: -120, x: 80, scale: 1.3, ease: 'none' }, 0)
          .to(blob2Ref.current, { y: -100, x: -80, scale: 1.2, ease: 'none' }, 0)
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Syntax Highlighting Helper
  const visibleText = fullProfileJson.substring(0, typedCharCount);
  const lines = visibleText.split('\n');

  return (
    <section id="home" ref={heroRef} className="hero min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorative Parallax Blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-5 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-10 right-5 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container hero-grid relative z-10">
        {/* Left Column Content */}
        <div ref={contentRef} className="hero-content">
          <div ref={badgeRef}>
            <span className="hero-greeting">{personalInfo.greeting}</span>
          </div>
          
          <h1 ref={titleRef} className="hero-title">
            Senior <span className="text-gradient">Full Stack</span> Developer
          </h1>
          
          {/* AI Auto-Typing Subtitle */}
          <div ref={subtitleRef} className="min-h-[2.5rem] flex items-center">
            <h2 className="hero-subtitle flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-5 h-5 text-pink-400 shrink-0 animate-pulse" />
              <span>{currentText}</span>
              <span className="inline-block w-2 h-6 bg-pink-500 animate-ping ml-1" />
            </h2>
          </div>
          
          <p ref={descRef} className="hero-desc">
            {personalInfo.tagline}
          </p>

          <div ref={ctasRef} className="hero-ctas">
            <a
              href={personalInfo.resumeUrl}
              download="Sharad_Chudasama_Resume.pdf"
              className="btn btn-primary"
            >
              <span>Download CV</span>
              <Download className="w-4 h-4" />
            </a>

            <a href="#contact" className="btn btn-secondary">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* Right Column 3D Terminal Visual */}
        <div ref={visualRef} className="hero-visual perspective-1000 relative">
          
          {/* Orbiting Floating Tech Pills */}
          {floatingBadges.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (badgeRefs.current[idx] = el)}
              style={{ top: item.top, left: item.left, right: item.right }}
              className="hidden lg:flex absolute z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0b16]/90 border border-white/15 text-xs font-mono text-gray-200 shadow-xl backdrop-blur-md"
            >
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </div>
          ))}

          {/* Mac Terminal Card */}
          <div ref={terminalInnerRef} className="terminal-card min-h-[350px] transition-all duration-300 flex flex-col">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn red" />
                <span className="terminal-btn yellow" />
                <span className="terminal-btn green" />
              </div>
              <div className="terminal-title flex items-center gap-1.5 font-mono text-xs text-gray-300 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>sharad_profile.json — zsh</span>
              </div>
              <div className="mono-font text-[10px] text-pink-400 font-bold uppercase">
                {typedCharCount < fullProfileJson.length ? "Scroll to Type" : "100% Complete"}
              </div>
            </div>
            
            <div className="terminal-body font-mono text-xs leading-relaxed flex-1 flex flex-col gap-1">
              {/* Mac Terminal Prompt */}
              <div className="flex items-center gap-2 mb-1 pb-1 border-b border-white/5">
                <span className="text-emerald-400 font-bold">sharad-user &gt;</span>
                <span className="text-gray-300">cat sharad_profile.json</span>
              </div>

              {/* Render Typed Code Lines */}
              {lines.map((line, lIdx) => {
                const isLastLine = lIdx === lines.length - 1;
                const isComment = line.trim().startsWith('//');

                return (
                  <div key={lIdx} className="terminal-line flex items-center flex-wrap">
                    {isComment ? (
                      <span className="terminal-comment">{line}</span>
                    ) : (
                      line.split(/("(?:[^"\\]|\\.)*")/g).map((part, pIdx) => {
                        if (part.startsWith('"') && part.endsWith('"')) {
                          const isKey = line.indexOf(part) < line.indexOf(':') && line.includes(':');
                          return (
                            <span
                              key={pIdx}
                              className={isKey ? 'terminal-property' : 'terminal-string'}
                            >
                              {part}
                            </span>
                          );
                        }
                        return (
                          <span key={pIdx} className="text-purple-300">
                            {part}
                          </span>
                        );
                      })
                    )}

                    {/* Single Mac Terminal Blinking Block Cursor attached to typing head */}
                    {isLastLine && (
                      <span className="inline-block w-2 h-4 bg-pink-500 animate-pulse ml-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
