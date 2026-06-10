import React, { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, Cpu, ArrowDownRight, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Multi-Agent AI Developer',
    'Fullstack Engineer',
    'Real-time WebSocket Architect',
    'Hackathon Competitor',
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 1500;

  useEffect(() => {
    let timer: number;
    const currentFullText = roles[textIndex];

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentFullText) {
      timer = window.setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px', alignItems: 'center' }}>
        <div className="hero-grid" style={{ display: 'grid', gap: '40px' }}>
          
          {/* Left Column: Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-primary)',
                letterSpacing: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="pulsing-dash">//</span> SYSTEM INITIATED // SUDHANVA_BALLARY.LOG
            </div>

            <h1
              className="glitch-text"
              data-text="SUDHANVA BALLARY"
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-1px',
              }}
            >
              SUDHANVA BALLARY
            </h1>

            <div
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: 'var(--text-secondary)',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>{`> `}</span>
              <span style={{ color: 'var(--text-primary)', borderRight: '2px solid var(--accent-primary)', paddingRight: '4px', animation: 'blink 0.8s infinite' }}>
                {displayText}
              </span>
            </div>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              Fullstack & AI/ML Engineer building intelligent digital interfaces. I design and scale multi-agent LLM scrapers, high-traffic hackathon management systems, and real-time IVR dashboard web architectures.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
              <button
                onClick={() => scrollToSection('projects')}
                className="cyber-btn"
                style={{ cursor: 'pointer' }}
              >
                INSPECT PROJECTS <ArrowDownRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection('terminal')}
                className="cyber-btn cyber-btn-pink"
                style={{ cursor: 'pointer' }}
              >
                BOOT TERMINAL <Terminal size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Dashboard */}
          <div
            className="hero-dashboard cyber-panel"
            style={{
              padding: '30px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Hologram scan line inside panel */}
            <div className="panel-scanline" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-title)', fontSize: '0.85rem' }}>
                <Cpu size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>CORE METRICS & MILESTONES</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)' }}>
                [NODE_STABLE]
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              {/* Milestone 1 */}
              <div
                style={{
                  border: '1px solid rgba(var(--accent-primary), 0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: 'rgba(var(--bg-primary), 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'all 0.3s ease',
                }}
                className="metric-card"
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
                    CODEBHARAT HACKATHON
                  </div>
                  <div style={{ fontSize: '1rem', fontFamily: 'var(--font-title)', fontWeight: 600 }}>
                    TOP 4 FINALIST (IIIT)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Out of 250+ teams nationwide
                  </div>
                </div>
              </div>

              {/* Milestone 2 */}
              <div
                style={{
                  border: '1px solid rgba(var(--accent-secondary), 0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: 'rgba(var(--bg-primary), 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'all 0.3s ease',
                }}
                className="metric-card"
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 0, 127, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-secondary)',
                  }}
                >
                  <Cpu size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>
                    CHATGPT X NEXTWAVE X BHARATAI
                  </div>
                  <div style={{ fontSize: '1rem', fontFamily: 'var(--font-title)', fontWeight: 600 }}>
                    BUILDATHON QUALIFIER
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Selected for Bangalore on-site build session
                  </div>
                </div>
              </div>

              {/* Milestone 3 */}
              <div
                style={{
                  border: '1px solid rgba(var(--accent-green), 0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: 'rgba(var(--bg-primary), 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'all 0.3s ease',
                }}
                className="metric-card"
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(57, 255, 20, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-green)',
                  }}
                >
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
                    HACKATHONS ATTENDED
                  </div>
                  <div style={{ fontSize: '1rem', fontFamily: 'var(--font-title)', fontWeight: 600 }}>
                    500+ ACTIVE USER MANAGEMENT
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Successfully scaled apps like HackFusion
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .pulsing-dash {
          animation: pulse 1.5s infinite;
        }
        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: var(--accent-primary) }
        }
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
            gap: 40px;
          }
        }
        .metric-card:hover {
          transform: translateX(8px);
          background-color: rgba(var(--bg-tertiary), 0.4) !important;
          border-color: var(--accent-primary) !important;
        }
        .panel-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            0deg,
            rgba(0, 240, 255, 0) 0%,
            rgba(0, 240, 255, 0.05) 10%,
            rgba(0, 240, 255, 0) 20%
          );
          background-size: 100% 200%;
          animation: scan 6s linear infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0% { background-position: 0 -200% }
          100% { background-position: 0 200% }
        }
      `}</style>
    </section>
  );
};
