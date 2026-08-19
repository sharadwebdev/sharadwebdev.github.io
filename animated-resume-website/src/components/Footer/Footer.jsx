import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '../Icons/BrandIcons';
import { personalInfo } from '../../data/personal';

export const Footer = () => {
  return (
    <footer>
      <div className="container footer-grid">
        {/* Brand Description */}
        <div className="footer-brand">
          <a href="#home" className="logo">
            Sharad<span className="text-gradient">.dev</span>
          </a>
          <p>
            A Senior Full Stack Developer dedicated to crafting high-quality, high-performance web applications and software architectures.
          </p>
        </div>

        {/* Navigation Links in Sequential Order */}
        <div className="footer-links-col">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Connect & Social Icons */}
        <div className="footer-social-col">
          <h4 className="footer-title">Connect</h4>
          <div className="social-icons-row">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/that.sharad"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="social-icon"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.phone}
              className="social-icon"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sharad Chudasama. All rights reserved.</p>
      </div>
    </footer>
  );
};
