import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Cpu } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: '// HOME' },
    { id: 'skills', label: '// SKILLS' },
    { id: 'projects', label: '// PROJECTS' },
    { id: 'terminal', label: '// TERMINAL' },
    { id: 'contact', label: '// CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 100 + '%',
        height: scrolled ? '70px' : '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 1000,
        backgroundColor: scrolled
          ? 'rgba(var(--bg-secondary), 0.75)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--border-color)'
          : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Logo */}
      <div
        onClick={() => handleNavClick('hero')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontFamily: 'var(--font-title)',
          fontSize: '1.25rem',
          fontWeight: 800,
          letterSpacing: '2px',
        }}
      >
        <Cpu
          size={20}
          style={{
            color: 'var(--accent-primary)',
            filter: 'drop-shadow(0 0 5px var(--accent-primary))',
            animation: 'pulse 2s infinite',
          }}
        />
        <span>
          SUDHANVA<span style={{ color: 'var(--accent-primary)' }}>.SYS</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '30px',
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-title)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: 'pointer',
                padding: '8px 12px',
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '12px',
                    width: 'calc(100% - 24px)',
                    height: '2px',
                    backgroundColor: 'var(--accent-primary)',
                    boxShadow: 'var(--shadow-glow)',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status and Toggles */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '20px',
        }}
        className="desktop-actions"
      >
        {/* Status indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(var(--bg-secondary), 0.4)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-green)',
              boxShadow: 'var(--shadow-glow-green)',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>SYS: ONLINE</span>
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title={theme === 'cyber-dark' ? 'Activate Lab Light Theme' : 'Activate Cyber Dark Theme'}
        >
          {theme === 'cyber-dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Mobile Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
        className="mobile-actions"
      >
        {/* Theme switcher for mobile */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '6px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          {theme === 'cyber-dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '6px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
          }}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-100%',
          width: '280px',
          height: '100vh',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
          padding: '100px 30px 40px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 999,
          transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-title)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '8px 0',
                  borderBottom: `1px solid ${isActive ? 'var(--border-color)' : 'transparent'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              border: '1px solid var(--border-color)',
              padding: '6px 12px',
              borderRadius: '20px',
              width: 'fit-content',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)',
                boxShadow: 'var(--shadow-glow-green)',
              }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>SYS: ONLINE</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            v1.0.0 // TS-REACT
          </span>
        </div>
      </div>

      {/* Styled Tag CSS Inject */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-actions { display: none !important; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </header>
  );
};
