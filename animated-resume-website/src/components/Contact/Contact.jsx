import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon } from '../Icons/BrandIcons';
import { personalInfo } from '../../data/personal';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../utils/gsapUtils';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const infoCardsRef = useRef([]);
  const formCardRef = useRef(null);

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

      // 2. Left Column Contact Cards Staggered Slide-In
      const infoEls = infoCardsRef.current.filter(Boolean);

      gsap.fromTo(
        infoEls,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoEls[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Right Column Form Card Slide-In
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Contact</h2>
        </div>

        <div className="contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info-column">
            {/* Email */}
            <div
              ref={(el) => (infoCardsRef.current[0] = el)}
              className="contact-detail-card"
            >
              <div className="contact-icon-box">
                <Mail className="w-5 h-5" />
              </div>
              <div className="contact-detail-content">
                <h4>Email</h4>
                <p>
                  <a href={personalInfo.socials.email}>{personalInfo.email}</a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div
              ref={(el) => (infoCardsRef.current[1] = el)}
              className="contact-detail-card"
            >
              <div className="contact-icon-box">
                <Phone className="w-5 h-5" />
              </div>
              <div className="contact-detail-content">
                <h4>Phone</h4>
                <p>
                  <a href={personalInfo.socials.phone}>{personalInfo.phone}</a>
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div
              ref={(el) => (infoCardsRef.current[2] = el)}
              className="contact-detail-card"
            >
              <div className="contact-icon-box">
                <LinkedinIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="contact-detail-content">
                <h4>LinkedIn</h4>
                <p>
                  <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer">
                    linkedin.com/in/sharad-chudasama
                  </a>
                </p>
              </div>
            </div>

            {/* Location */}
            <div
              ref={(el) => (infoCardsRef.current[3] = el)}
              className="contact-detail-card"
            >
              <div className="contact-icon-box">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="contact-detail-content">
                <h4>Location</h4>
                <p>{personalInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div ref={formCardRef} className="contact-form-card">
            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="font-title font-bold text-xl text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Thank you! Your message has been sent successfully.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="form-control"
                    required
                    placeholder="Sharad Chudasama"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="form-control"
                    required
                    placeholder="sharad@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    className="form-control"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-control"
                    rows={5}
                    required
                    placeholder="Hello Sharad, I would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  <span>Send Message</span>
                  <Send className="w-4 h-4 ml-2 inline" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
