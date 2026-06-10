import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TermIcon, ChevronRight } from 'lucide-react';

interface HistoryItem {
  command?: string;
  output: string | React.ReactNode;
  type: 'input' | 'output' | 'error' | 'success';
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Welcome message on mount
    setHistory([
      {
        output: (
          <div style={{ fontFamily: 'var(--font-mono)' }}>
            <div>============================================================</div>
            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>SUDHANVA-CORE-SHELL v1.0.0 // SSH SECURED CONNECTION</div>
            <div>STATUS: ACTIVE // USER: GUEST_ACCESS</div>
            <div>============================================================</div>
            <div>Type <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>'help'</span> to fetch all system commands, or tap the quick-link chips below.</div>
          </div>
        ),
        type: 'output',
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll terminal to bottom
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Matrix Code Rain (Hack Mode) effect
  useEffect(() => {
    if (!isHackerMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cols = Math.floor(width / 20) + 1;
    const ypos = Array(cols).fill(0);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    const matrixEffect = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });

      animationFrameId = requestAnimationFrame(matrixEffect);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    matrixEffect();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHackerMode]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const args = trimmed.split(' ');
    const primaryCmd = args[0].toLowerCase();
    const subArg = args.slice(1).join(' ');

    let response: string | React.ReactNode = '';
    let responseType: HistoryItem['type'] = 'output';

    switch (primaryCmd) {
      case 'help':
        response = (
          <div style={{ display: 'grid', gap: '6px' }}>
            <div>Available System Commands:</div>
            <div>  <span style={{ color: 'var(--accent-primary)' }}>about</span>     - Outputs biological data matrix & core background details.</div>
            <div>  <span style={{ color: 'var(--accent-primary)' }}>skills</span>    - Outputs a detailed graphical proficiency audit.</div>
            <div>  <span style={{ color: 'var(--accent-primary)' }}>projects</span>  - Lists primary software structures. Usage: 'projects [name]' to inspect details.</div>
            <div>  <span style={{ color: 'var(--accent-primary)' }}>contact</span>   - Prints secure social hooks and direct transceivers.</div>
            <div>  <span style={{ color: 'var(--accent-primary)' }}>hack</span>      - Initiates Matrix override sequence.</div>
            <div>  <span style={{ color: 'var(--accent-primary)' }}>clear</span>     - Erases the screen buffer history.</div>
          </div>
        );
        break;

      case 'about':
        response = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>BIOLOGICAL UNIT PROFILE // SUDHANVA BALLARY</div>
            <div>Role: Fullstack & AI/ML Engineer</div>
            <div>Experience: Scaling concurrent backend structures, design orchestration, multi-agent AI scripts.</div>
            <div>Milestones: Top 4 out of 250+ teams at CodeBharat IIIT, Buildathon Qualifiers Bangalore, Hackathon Devops lead.</div>
            <div>Core Focus: Building highly responsive frontends and mapping them to intelligent microservice pipelines.</div>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>SKILLS PROFICIENCY AUDIT:</div>
            <div>React         [██████████░░] 92% // UI Logic</div>
            <div>Next.js       [█████████░░░] 88% // Client Framework</div>
            <div>FastAPI       [█████████░░░] 89% // REST APIs</div>
            <div>Node.js       [██████████░░] 90% // Backend Node</div>
            <div>WebSockets    [████████░░░░] 85% // Real-time Channels</div>
            <div>MongoDB/Postgres [█████████░░░] 87% // Data storage</div>
            <div>Auth / RBAC   [█████████░░░] 88% // Security Gateways</div>
            <div>Git           [██████████░░] 90% // Version control</div>
          </div>
        );
        break;

      case 'projects':
        if (!subArg) {
          response = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: 'var(--accent-primary)' }}>PROJECT INDEX MATRIX:</div>
              <div>1. <span style={{ color: 'var(--accent-secondary)' }}>trend2stock</span> - Multi-agent Trend scraping & Equity evaluation</div>
              <div>2. <span style={{ color: 'var(--accent-secondary)' }}>hackfusion</span>  - Hackathon organizer platform supporting 500+ users</div>
              <div>3. <span style={{ color: 'var(--accent-secondary)' }}>justpaste</span>   - Minimalist online notepad with unique urls</div>
              <div>4. <span style={{ color: 'var(--accent-secondary)' }}>projflow</span>    - Project management platform (web + mobile)</div>
              <div>5. <span style={{ color: 'var(--accent-secondary)' }}>ecotracker</span>  - Real-time IVR update admin dashboard</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Type 'projects [name]' to output detailed module spec. Example: 'projects trend2stock'</div>
            </div>
          );
        } else {
          const pName = subArg.toLowerCase();
          if (pName === 'trend2stock' || pName === '1') {
            response = (
              <div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[MODULE SPEC: TREND2STOCK]</div>
                <div>Domain: AI & ML // Live: trend2stocks.vercel.app</div>
                <div>Overview: Scrapes emerging market trends from web networks and matches them to public equities. Multi-agent LLMs calculate sentiment and duration. Features AI analysis chatbot.</div>
              </div>
            );
          } else if (pName === 'hackfusion' || pName === '2') {
            response = (
              <div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[MODULE SPEC: HACKFUSION]</div>
                <div>Domain: Fullstack // Live: hack-fusion-lake.vercel.app</div>
                <div>Overview: Event-management server scaling dynamically. Hosted college hackathon. Supported 500+ active registration pipelines, judge scoring systems, and real-time boards.</div>
              </div>
            );
          } else if (pName === 'justpaste' || pName === '3') {
            response = (
              <div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[MODULE SPEC: JUSTPASTE]</div>
                <div>Domain: Utilities // Live: justpaste-psi.vercel.app</div>
                <div>Overview: Ultra-fast clipboard interface that outputs pastes directly into customizable, unique URLs. Uses FastAPI backend for immediate response queries.</div>
              </div>
            );
          } else if (pName === 'projflow' || pName === '4') {
            response = (
              <div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[MODULE SPEC: PROJFLOW]</div>
                <div>Domain: Fullstack // Live: projflow-website.vercel.app</div>
                <div>Overview: Cross-platform web and mobile scheduler utility with interactive Kanban boards, socket notifications, and milestone telemetry charts.</div>
              </div>
            );
          } else if (pName === 'ecotracker' || pName === '5') {
            response = (
              <div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[MODULE SPEC: ECOTRACKER]</div>
                <div>Domain: Fullstack // Live: eco-tracker-admin-tau.vercel.app</div>
                <div>Overview: Live IVR audio gateway calling dashboard. Parses telephonic key input pulses into database indexes in real-time, displaying active campaign analytics.</div>
              </div>
            );
          } else {
            response = `ERR_MODULE_NOT_FOUND: Project '${subArg}' does not exist in active registry.`;
            responseType = 'error';
          }
        }
        break;

      case 'contact':
        response = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>SECURE SOCIAL PORTS:</div>
            <div>GitHub   - https://github.com/GeminalSudhanva</div>
            <div>LinkedIn - https://www.linkedin.com/in/sudhanva-ballary-797883270/</div>
            <div>Email    - sudhanvaballary@gmail.com (Send transmission via contact form below!)</div>
          </div>
        );
        break;

      case 'hack':
        setIsHackerMode(true);
        response = (
          <div style={{ color: '#0f0', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
            <div>[!!!] ACCESS OVERRIDE SEQUENCE ENGAGED [!!!]</div>
            <div>CONNECTING TO SUB-SYS PORT 8080... OK</div>
            <div>BYPASSING FIREWALL... OK</div>
            <div>DOWNLOADING GUEST SECURE CREDENTIALS... OK</div>
            <div>HACK COMPLETED. SYSTEM INJECTED. TYPE 'clear' TO EXIT OVERRIDE.</div>
          </div>
        );
        responseType = 'success';
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        response = `Command not recognized: '${primaryCmd}'. Type 'help' for available system commands.`;
        responseType = 'error';
    }

    setHistory((prev) => [
      ...prev,
      { command: cmdText, output: response, type: responseType },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  const runQuickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  const handleExitHackerMode = () => {
    setIsHackerMode(false);
    setHistory(prev => [
      ...prev,
      { output: 'SYSTEM RESTORED: Cybernetic Dark core re-established.', type: 'output' }
    ]);
  };

  return (
    <section id="terminal" style={{ borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      {isHackerMode && (
        <canvas
          ref={canvasRef}
          className="matrix-canvas"
          style={{ zIndex: 1, opacity: 0.35, pointerEvents: 'none' }}
        />
      )}

      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Section Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '2px' }}>
            [CORE_COMMAND_LINE_SHELL]
          </div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', fontWeight: 800 }}>
            INTERACTIVE SHELL TERMINAL
          </h2>
        </div>

        {/* Breach Alert Banner */}
        {isHackerMode && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 0, 127, 0.1)',
              border: '1px solid var(--accent-secondary)',
              boxShadow: 'var(--shadow-glow-pink)',
              padding: '12px 20px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--accent-secondary)',
              zIndex: 20,
              position: 'relative',
            }}
          >
            <span>[WARNING]: SYSTEM CORE ACCESS DETECTED</span>
            <button
              onClick={handleExitHackerMode}
              style={{
                backgroundColor: 'var(--accent-secondary)',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '4px',
                boxShadow: 'var(--shadow-glow-pink)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = 'var(--accent-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-secondary)';
                e.currentTarget.style.color = '#fff';
              }}
            >
              RESTORE_SYSTEM
            </button>
          </div>
        )}

        {/* Terminal Window */}
        <div
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${isHackerMode ? '#0f0' : 'var(--border-color)'}`,
            boxShadow: isHackerMode ? '0 0 30px rgba(0,255,0,0.2)' : 'var(--shadow-glow)',
            backgroundColor: 'var(--terminal-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 15,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: 'var(--terminal-header)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${isHackerMode ? '#0f0' : 'var(--border-color)'}`,
            }}
          >
            {/* macOS styled buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#90a0c0' }}>
              <TermIcon size={12} style={{ color: isHackerMode ? '#0f0' : 'var(--accent-primary)' }} />
              <span>SUDHANVA@SYSTEM-CORE: ~</span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#5a6b8c' }}>
              127.0.0.1
            </div>
          </div>

          {/* Buffer Screen */}
          <div
            style={{
              padding: '24px',
              height: '350px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              color: isHackerMode ? '#0f0' : 'var(--terminal-text)',
            }}
          >
            {history.map((item, idx) => (
              <div key={idx}>
                {item.command && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isHackerMode ? '#0f0' : 'var(--accent-primary)' }}>
                    <span>sudhanva@guest:~$</span>
                    <span>{item.command}</span>
                  </div>
                )}
                <div
                  style={{
                    color: item.type === 'error' ? '#ff3333' : item.type === 'success' ? '#00ff66' : 'inherit',
                    paddingLeft: item.command ? '15px' : '0',
                    marginTop: item.command ? '4px' : '0',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                  }}
                >
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Console Input Bar */}
          <div
            style={{
              borderTop: `1px solid ${isHackerMode ? '#0f0' : 'var(--border-color)'}`,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <ChevronRight size={18} style={{ color: isHackerMode ? '#0f0' : 'var(--accent-primary)' }} />
            <span style={{ color: isHackerMode ? '#0f0' : 'var(--accent-primary)' }}>sudhanva@guest:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. help, skills, hack)..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: isHackerMode ? '#0f0' : 'var(--terminal-text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
              }}
            />
          </div>
        </div>

        {/* Quick chip commands below terminal */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {['help', 'about', 'skills', 'projects', 'contact', 'hack'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runQuickCommand(cmd)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                border: `1px solid ${cmd === 'hack' ? '#ff007f33' : 'var(--border-color)'}`,
                background: 'rgba(var(--bg-secondary), 0.3)',
                color: cmd === 'hack' ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cmd === 'hack' ? 'var(--accent-secondary)' : 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cmd === 'hack' ? '#ff007f33' : 'var(--border-color)';
                e.currentTarget.style.color = cmd === 'hack' ? 'var(--accent-secondary)' : 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              &gt; {cmd}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
