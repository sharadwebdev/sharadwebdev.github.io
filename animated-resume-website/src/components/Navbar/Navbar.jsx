import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/personal';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileActive(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="logo">
          Sharad<span className="text-gradient">.dev</span>
        </a>

        <button
          className={`hamburger md:hidden ${mobileActive ? 'active' : ''}`}
          onClick={() => setMobileActive(!mobileActive)}
          aria-label="Toggle Navigation Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${mobileActive ? 'active' : ''}`}>
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            return (
              <li key={link.name} className={activeSection === sectionId ? 'active' : ''}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.name}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={personalInfo.resumeUrl}
              download="Sharad_Chudasama_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="nav-cta"
            >
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
