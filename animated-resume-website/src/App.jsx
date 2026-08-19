import React from 'react';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Education } from './components/Education/Education';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#06050c] text-gray-100 selection:bg-indigo-500 selection:text-white">
      {/* Fluid Custom Cursor Follower */}
      <CustomCursor />

      {/* Glass Navigation Header */}
      <Navbar />

      {/* Natural Flow Page Sections in Sequential Order */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
