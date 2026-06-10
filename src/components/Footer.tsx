import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  const [latency, setLatency] = useState(12);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate slight network jitter
    const interval = setInterval(() => {
      setLatency(prev => {
        const diff = Math.floor(Math.random() * 5) - 2;
        const next = prev + diff;
        return next > 3 ? (next < 30 ? next : 20) : 8;
      });
    }, 3000);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'rgba(var(--bg-secondary), 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '30px 40px',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Left: Telemetry Panel */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ color: 'var(--accent-primary)' }}>[PING]:</span>
            <span style={{ color: 'var(--text-secondary)' }}>{latency}ms</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ color: 'var(--accent-primary)' }}>[SECURE]:</span>
            <span style={{ color: 'var(--accent-green)' }}>AES-256</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ color: 'var(--accent-primary)' }}>[CURSOR]:</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              X:{coords.x} Y:{coords.y}
            </span>
          </div>
        </div>

        {/* Center: Socials */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <a
            href="https://github.com/GeminalSudhanva"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            title="GitHub Profile"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sudhanva-ballary-797883270/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <div>
          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '10px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(var(--border-color), 0.3)',
          paddingTop: '15px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>© {new Date().getFullYear()} SUDHANVA BALLARY. ALL RIGHTS RESERVED.</span>
        <span>SYS.STATUS // STABLE</span>
      </div>
    </footer>
  );
};
