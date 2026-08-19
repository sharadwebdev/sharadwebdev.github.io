import React, { useEffect, useRef } from 'react';
import { Server, Code2, Cpu, Network, Sparkles, Layout, Zap, Database, GitBranch, Terminal } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

const iconMap = {
  Server: <Server className="w-6 h-6 text-indigo-400" />,
  Code2: <Code2 className="w-6 h-6 text-purple-400" />,
  FileCode: <Terminal className="w-6 h-6 text-pink-400" />,
  Cpu: <Cpu className="w-6 h-6 text-yellow-400" />,
  Network: <Network className="w-6 h-6 text-emerald-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-sky-400" />,
  Layout: <Layout className="w-6 h-6 text-cyan-400" />,
  Zap: <Zap className="w-6 h-6 text-amber-400" />,
  Database: <Database className="w-6 h-6 text-blue-400" />,
  GitBranch: <GitBranch className="w-6 h-6 text-rose-400" />
};

export const Skills = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const fillsRef = useRef([]);
  const percentTextRefs = useRef([]);

  const skillsList = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      name: skill.name,
      badge: skill.badge,
      level: skill.level,
      iconName: skill.icon
    }))
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current.filter(Boolean);
      const fillEls = fillsRef.current.filter(Boolean);
      const track = trackRef.current;
      if (!track || cardEls.length === 0) return;

      // 1. Calculate total horizontal distance for train track
      const totalWidth = track.scrollWidth - window.innerWidth + 200;

      // Reset initial progress fills
      fillEls.forEach((fill) => gsap.set(fill, { width: '0%' }));

      // Set initial active card 0 (Laravel) highlighted big box immediately
      if (cardEls[0]) {
        gsap.set(cardEls[0], {
          scale: 1.18,
          opacity: 1,
          borderColor: 'rgba(99, 102, 241, 0.9)',
          boxShadow: '0 25px 60px rgba(99, 102, 241, 0.45)'
        });
        if (fillEls[0]) fillEls[0].style.width = `${skillsList[0].level}%`;
        if (percentTextRefs.current[0]) percentTextRefs.current[0].innerText = `${skillsList[0].level}%`;
      }

      // 2. PIN Skills Section & Drive Horizontal Conveyor with Fast Initial Pause & Quick Active Scale
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${Math.max(1800, totalWidth)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3, // Faster responsive scroll scrub
        onUpdate: () => {
          const viewportCenter = window.innerWidth / 2;

          // Find STRICTLY 1 active card closest to exact screen center
          let minDist = Infinity;
          let activeIdx = 0;

          cardEls.forEach((card, idx) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(viewportCenter - cardCenter);
            if (dist < minDist) {
              minDist = dist;
              activeIdx = idx;
            }
          });

          // Apply styles: QUICK INSTANT BIG ACTIVE SPOTLIGHT BOX
          cardEls.forEach((card, idx) => {
            if (!card) return;
            const fill = fillEls[idx];
            const textEl = percentTextRefs.current[idx];
            const targetLevel = skillsList[idx]?.level || 0;
            const isSingleActive = idx === activeIdx;

            if (isSingleActive) {
              // QUICK INSTANT BIG ACTIVE BOX
              gsap.to(card, {
                scale: 1.18,
                opacity: 1,
                borderColor: 'rgba(99, 102, 241, 0.9)',
                boxShadow: '0 25px 60px rgba(99, 102, 241, 0.45)',
                duration: 0.1, // Quick instant active transition
                overwrite: 'auto'
              });

              if (fill) fill.style.width = `${targetLevel}%`;
              if (textEl) textEl.innerText = `${targetLevel}%`;
            } else {
              // ALL OTHER CARDS ARE COMPACT
              gsap.to(card, {
                scale: 0.84,
                opacity: 0.45,
                borderColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: 'none',
                duration: 0.1, // Quick instant exit transition
                overwrite: 'auto'
              });
            }
          });
        },
        animation: gsap.timeline()
          // Fast Initial Pause (Card 0 stays centered from 0 to 0.05 scroll progress)
          .to(track, {
            x: 0,
            duration: 0.05,
            ease: 'none'
          }, 0)
          // Track moves Left from 0.05 to 1.0 scroll progress
          .to(track, {
            x: -totalWidth,
            duration: 0.95,
            ease: 'none'
          }, 0.05)
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [skillsList]);

  return (
    <section id="skills" ref={sectionRef} className="hero min-h-screen flex flex-col justify-center overflow-hidden py-10 relative">
      {/* Title Always Visible at Top Center */}
      <div className="container z-20 relative mb-8">
        <div className="section-header mb-2 text-center opacity-100">
          <span className="section-tag">My Specialty</span>
          <h2 className="section-title">My Skills</h2>
        </div>
      </div>

      {/* Horizontal Train Conveyor Track - Card 0 (Laravel) Aligned at Screen Center First */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-8 items-center min-w-max will-change-transform py-10"
          style={{ paddingLeft: 'calc(50vw - 180px)', paddingRight: 'calc(50vw - 180px)' }}
        >
          {skillsList.map((skill, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="skill-card w-[360px] shrink-0 transition-all duration-150 cursor-pointer"
            >
              <div className="skill-header">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    {iconMap[skill.iconName] || <Code2 className="w-6 h-6 text-indigo-400" />}
                  </div>
                  <div>
                    <span className="skill-name font-title font-bold text-white text-lg block">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Expertise Rating</span>
                  </div>
                </div>
                <span className="skill-badge">{skill.badge}</span>
              </div>

              <div className="skill-progress-container mt-6">
                <div className="skill-progress-label flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400 font-medium uppercase tracking-wider">Proficiency Level</span>
                  <span
                    ref={(el) => (percentTextRefs.current[idx] = el)}
                    className="font-mono font-bold text-indigo-400 text-base"
                  >
                    0%
                  </span>
                </div>
                <div className="skill-progress-bar h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden p-[1px]">
                  <div
                    ref={(el) => (fillsRef.current[idx] = el)}
                    className="skill-progress-fill h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
