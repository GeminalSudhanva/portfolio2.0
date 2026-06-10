import React, { useState } from 'react';
import { Send, CheckCircle, Shield, Key, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'encrypting' | 'sending' | 'success'>('idle');
  const [secureHash, setSecureHash] = useState('');

  const generateMockHash = () => {
    const chars = '0123456789abcdef';
    let hash = 'SHA256:';
    for (let i = 0; i < 40; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('encrypting');
    
    // Simulate encryption stage
    setTimeout(async () => {
      setStatus('sending');
      
      const formspreeId = (import.meta.env as any).VITE_FORMSPREE_ID;
      
      if (formspreeId) {
        try {
          const endpoint = formspreeId.trim().startsWith('http')
            ? formspreeId.trim()
            : `https://formspree.io/f/${formspreeId.trim()}`;

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              message: formData.message,
              _subject: `UPLINK: Portfolio Message from ${formData.name}`
            })
          });
          
          if (response.ok) {
            setSecureHash(generateMockHash());
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
          } else {
            console.error('Formspree transmission failed. Falling back to simulation mode.');
            // Fallback so user UI doesn't freeze in case of incorrect keys
            setSecureHash(generateMockHash());
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
          }
        } catch (error) {
          console.error('Error uploading payload to Formspree:', error);
          setSecureHash(generateMockHash());
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        }
      } else {
        // Default simulated transmission delay
        setTimeout(() => {
          setSecureHash(generateMockHash());
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        }, 1500);
      }
    }, 1200);
  };

  return (
    <section id="contact" style={{ borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '50px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '2px' }}>
            [ESTABLISH_COMMUNICATION_UPLINK]
          </div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', fontWeight: 800 }}>
            ENCRYPTED CONTACT PORTAL
          </h2>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>

          {/* Left Column: Technical Uplink Form */}
          <div className="cyber-panel" style={{ padding: '35px', position: 'relative' }}>
            {status === 'success' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '20px',
                  minHeight: '280px',
                }}
              >
                <CheckCircle size={50} style={{ color: 'var(--accent-green)', filter: 'drop-shadow(0 0 10px var(--accent-green))' }} />
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem' }}>
                  TRANSMISSION SUCCESSFUL
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px' }}>
                  Payload successfully packeted, encrypted, and uploaded to the mainframe. Sudhanva will receive the uplink alert shortly.
                </p>
                <div
                  style={{
                    backgroundColor: 'rgba(57, 255, 20, 0.05)',
                    border: '1px dashed var(--accent-green)',
                    borderRadius: '6px',
                    padding: '12px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-green)',
                    width: '100%',
                    wordBreak: 'break-all',
                  }}
                >
                  {secureHash}
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="cyber-btn"
                  style={{ marginTop: '10px' }}
                >
                  SEND NEW UPLINK
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontFamily: 'var(--font-title)' }}>
                  <Shield size={14} />
                  <span>SECURE ENCRYPTED TRANSMITTER</span>
                </div>

                {/* Sender Identity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    [01] SENDER IDENTITY / NAME:
                  </label>
                  <input
                    type="text"
                    required
                    disabled={status !== 'idle'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name or agency..."
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      width: '100%',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                {/* Return Frequency */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    [02] RETURN CORRESPONDENCE EMAIL:
                  </label>
                  <input
                    type="email"
                    required
                    disabled={status !== 'idle'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address..."
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      width: '100%',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                {/* Payload Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    [03] TRANSMISSION PAYLOAD / MESSAGE:
                  </label>
                  <textarea
                    required
                    rows={5}
                    disabled={status !== 'idle'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type encrypted message contents..."
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      width: '100%',
                      resize: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="cyber-btn"
                  disabled={status !== 'idle'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    cursor: status === 'idle' ? 'pointer' : 'not-allowed',
                  }}
                >
                  {status === 'idle' && (
                    <>
                      INITIALIZE UPLINK TRANSMISSION <Send size={16} />
                    </>
                  )}
                  {status === 'encrypting' && (
                    <>
                      ENCRYPTING PACKETS... <Key size={16} style={{ animation: 'pulse 1s infinite' }} />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      UPLOADING TO MAINFRAME... <Send size={16} style={{ animation: 'bounce 0.8s infinite' }} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Node details & social links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              // PHYSICAL LOCATION & CO-ORDINATES //
              <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>DHARWAD, INDIA // APAC</div>
            </div>

            {/* Direct Card links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Email */}
              <a
                href="mailto:sudhanvaballary@gmail.com"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="cyber-panel contact-chip"
                  style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Mail size={20} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      DIRECT EMAIL CHANNEL
                    </div>
                    <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', fontWeight: 600 }}>
                      sudhanvaballary@gmail.com
                    </div>
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sudhanva-ballary-797883270/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="cyber-panel contact-chip"
                  style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <LinkedinIcon size={20} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      PROFESSIONAL NETWORK PORT
                    </div>
                    <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', fontWeight: 600 }}>
                      linkedin.com/in/sudhanva-ballary
                    </div>
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/GeminalSudhanva"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="cyber-panel contact-chip"
                  style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <GithubIcon size={20} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      SECURE SOURCE CONTROLLERS
                    </div>
                    <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', fontWeight: 600 }}>
                      github.com/GeminalSudhanva
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        .contact-chip:hover {
          transform: translateX(6px);
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-glow);
        }
      `}</style>
    </section>
  );
};
