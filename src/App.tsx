import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CyberCanvas } from './components/CyberCanvas';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsMatrix } from './components/SkillsMatrix';
import { Projects } from './components/Projects';
import { Terminal } from './components/Terminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'terminal', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section occupies center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: 2 }}>
      {/* Visual cyber effects */}
      <div className="scanlines" />
      <div className="cyber-grid-overlay" />
      <CyberCanvas />

      {/* Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Main Sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <SkillsMatrix />
        <Projects />
        <Terminal />
        <Contact />
      </main>

      {/* Telemetry Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
