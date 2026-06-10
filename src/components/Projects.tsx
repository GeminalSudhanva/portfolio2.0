import React, { useState, useEffect } from 'react';
import { ExternalLink, Filter, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & ML' | 'Fullstack' | 'Utilities';
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  milestone?: string;
  frontendSpec?: string[];
  backendSpec?: string[];
  databaseSpec?: string[];
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI & ML' | 'Fullstack' | 'Utilities'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projectsData: Project[] = [
    {
      id: 'trend2stock',
      title: 'Trend2Stock',
      subtitle: 'Multi-Agent Equity Trend & Sentiment Analyzer',
      category: 'AI & ML',
      shortDesc: 'LangGraph multi-agent AI system scanning RSS/news feeds, evaluating sentiments via LLMs, and mapping trending topics to public stock tickers.',
      fullDesc: 'A real-time multi-agent AI system orchestrating LangGraph workflows. Discovery agents scan news/RSS feeds, Sentiment agents evaluate market tone via Groq Llama-3.3, and Mapping agents link topics to stock symbols. Features historical trend charts, Twilio/FastAPI notifications, and a conversational equity assistant.',
      tech: ['Next.js', 'React 19', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Groq Llama'],
      liveUrl: 'https://trend2stocks.vercel.app',
      githubUrl: 'https://github.com/GeminalSudhanva',
      milestone: 'Coordinates LangGraph workflows across news APIs and Groq LLM clusters.',
      frontendSpec: ['Next.js (React 19)', 'TypeScript', 'Tailwind CSS v4.0', 'Firebase Client SDK', 'Day.js'],
      backendSpec: ['FastAPI (Python)', 'LangGraph / LangChain', 'Discovery & Sentiment Agents', 'Groq Llama-3.3 & OpenAI', 'yfinance API', 'APScheduler Task Scheduler'],
      databaseSpec: ['PostgreSQL (Neon Cloud)', 'SQLAlchemy ORM', 'SQLite (Local Dev)']
    },
    {
      id: 'agriscan',
      title: 'AgriScan',
      subtitle: 'Soil-Based Crop Recommendation Engine // Agreescan',
      category: 'AI & ML',
      shortDesc: 'Predictive intelligence dashboard recommending optimal crops based on NPK soil properties and environmental sensors.',
      fullDesc: 'An intelligent agricultural decision assistant recommending optimal crops based on Nitrogen, Phosphorus, Potassium (NPK) values, temperature, humidity, pH, and rainfall. Trained a Random Forest classifier in Jupyter Notebooks using Kaggle crop recommendation datasets, and deployed a React + TypeScript frontend dashboard for soil property visualization and real-time inference.',
      tech: ['React', 'TypeScript', 'Python', 'Jupyter Notebook', 'Scikit-Learn', 'Pandas'],
      liveUrl: 'https://github.com/GeminalSudhanva/agriscan-ai',
      githubUrl: 'https://github.com/GeminalSudhanva',
      milestone: 'Achieved 99.2% classification accuracy on Kaggle agronomic datasets using Random Forest models.',
      frontendSpec: ['React v18', 'TypeScript', 'Vite Dev Server', 'Tailwind CSS', 'Recharts (NPK Visualizers)'],
      backendSpec: ['Python 3.10', 'Scikit-Learn (Model Training)', 'Flask / FastAPI (Inference Server)', 'Jupyter Notebooks (Data Wrangling)'],
      databaseSpec: ['Kaggle Agronomic Datasets', 'Local Storage Fallback']
    },
    {
      id: 'hackfusion',
      title: 'HackFusion',
      subtitle: 'High-Concurrency Event Registration Portal',
      category: 'Fullstack',
      shortDesc: 'High-performance hackathon management platform successfully facilitating registrations, judging, and leaderboards for 500+ users.',
      fullDesc: 'A secure, high-concurrency event registration and evaluation gateway deployed for major college hackathons. The infrastructure processes team setups, judges scoring metrics, and live leaderboards. Implements rate-limiting, CORS validation, and secure authentication to shield pipelines.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM'],
      liveUrl: 'https://hack-fusion-lake.vercel.app',
      githubUrl: 'https://github.com/GeminalSudhanva',
      milestone: 'Orchestrated registrations and judging submissions for 500+ concurrent users with zero downtime.',
      frontendSpec: ['React (v18.3.1)', 'TypeScript', 'Vite Dev Server', 'Tailwind CSS v3', 'Shadcn UI (Radix)', 'Framer Motion (Animations)', 'React Query', 'React Hook Form + Zod', 'Recharts'],
      backendSpec: ['Node.js', 'Express Web Server', 'Helmet HTTP Headers', 'Express Rate Limit (Auth routes)', 'JWT Session Tokens', 'bcryptjs Hashing', 'Vercel Serverless Functions'],
      databaseSpec: ['PostgreSQL', 'Neon Serverless', 'Supabase Migrations', 'Prisma ORM Client']
    },
    {
      id: 'justpaste',
      title: 'JustPaste',
      subtitle: 'Real-Time Shared Notepad & Clipboard',
      category: 'Utilities',
      shortDesc: 'Minimalist online copy-paste sharing application with live Socket.io multiplayer editing and bcrypt PIN protection.',
      fullDesc: 'A minimalist, real-time shared clipboard that allows users to instantly paste code snippets, logs, or formatted text, generating unique url sub-addresses. Leverages Socket.io to sync edits across active clients in real-time, and integrates bcrypt hash locks for PIN-protected directories.',
      tech: ['React 19', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'Prisma ORM'],
      liveUrl: 'https://justpaste-psi.vercel.app',
      githubUrl: 'https://github.com/GeminalSudhanva',
      frontendSpec: ['React 19', 'TypeScript', 'Vite v8', 'React Router v7', 'Tailwind CSS v3', '@hello-pangea/dnd (Drag-and-Drop)', 'Socket.io Client', 'date-fns', 'uuid'],
      backendSpec: ['Node.js', 'Express v5 APIs', 'Socket.io v4 (Real-time Sync)', 'bcrypt (PIN Verification)', 'cors / dotenv'],
      databaseSpec: ['PostgreSQL', 'Prisma Client ORM']
    },
    {
      id: 'projflow',
      title: 'ProjFlow',
      subtitle: 'Cross-Platform Collaborative Team Workspace',
      category: 'Fullstack',
      shortDesc: 'Project management workspace combining responsive web and React Native mobile clients with real-time socket updates.',
      fullDesc: 'A modern project coordination platform supporting web and mobile workspaces. Features interactive Kanban boards, Gantt chart scheduling, and push updates. Uses WebSockets to sync board movement, assignment changes, and ticket statuses instantly across connected team members.',
      tech: ['React', 'React Native', 'Node.js', 'WebSockets', 'PostgreSQL', 'Prisma ORM'],
      liveUrl: 'https://projflow-website.vercel.app',
      githubUrl: 'https://github.com/GeminalSudhanva',
      frontendSpec: ['React (Web Client)', 'React Native (Mobile client)', 'TypeScript', 'Tailwind CSS v3', 'Recharts'],
      backendSpec: ['Node.js', 'Express', 'Socket.io (WebSockets)', 'REST Controllers', 'Git Version Control'],
      databaseSpec: ['PostgreSQL', 'Prisma ORM']
    },
    {
      id: 'eduplay',
      title: 'EduPlay Adventures',
      subtitle: 'Gamified K-12 Interactive Learning Platform',
      category: 'Fullstack',
      shortDesc: 'Web application designed for primary school students (grades 4-6) to learn core curriculum concepts through gamified play.',
      fullDesc: 'A gamified K-12 educational portal engineered for primary students (standards 4 to 6). Through interactive web-based mini-games, students learn mathematics, science, and grammar concepts. Built using HTML5 Canvas games, progress tracking maps, and visual reward milestones to drive motivation and retention.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'HTML5 Canvas', 'MongoDB'],
      liveUrl: 'https://github.com/GeminalSudhanva/eduplay-adventures',
      githubUrl: 'https://github.com/GeminalSudhanva/eduplay-adventures',
      milestone: 'Constructed custom curriculum-aligned mini-games played by 100+ local students.',
      frontendSpec: ['React (v18)', 'TypeScript', 'HTML5 Canvas API', 'Tailwind CSS', 'Web Audio API'],
      backendSpec: ['Node.js', 'Express Web Server', 'REST Controllers', 'JWT Auth'],
      databaseSpec: ['MongoDB Atlas', 'Mongoose ODM']
    },
    {
      id: 'smartcity',
      title: 'SmartCity Monitor',
      subtitle: 'AI-Powered Traffic & Environmental Dashboard',
      category: 'AI & ML',
      shortDesc: 'Intelligent urban dashboard combining scikit-learn traffic forecasts, NASA satellite environmental analytics, and a Three.js 3D city simulator.',
      fullDesc: 'An AI-powered Smart City monitoring platform. Features a scikit-learn classifier to forecast vehicular count at urban junctions, live AQI monitoring via OpenWeather APIs, NASA POWER satellite meteorological analysis, and an interactive 3D Three.js city scene that changes road colors dynamically based on forecasted congestion levels.',
      tech: ['React', 'Three.js', 'FastAPI', 'scikit-learn', 'Recharts', 'Python'],
      liveUrl: 'https://github.com/GeminalSudhanva/SmartCityMonitor',
      githubUrl: 'https://github.com/GeminalSudhanva/SmartCityMonitor',
      milestone: 'Integrated Three.js rendering loops bound dynamically to scikit-learn regression congestion forecasts.',
      frontendSpec: ['React 18', 'Three.js (@react-three/fiber)', 'Vite v7', 'Recharts (Analytics)', 'Framer Motion'],
      backendSpec: ['Python (FastAPI)', 'scikit-learn (Random Forest)', 'joblib Serialization', 'pandas & NumPy'],
      databaseSpec: ['NASA POWER API Satellite Data', 'OpenWeather Air Pollution API', 'Browser LocalStorage']
    }
  ];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      <div className="container">

        {/* Title & Filter Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
            marginBottom: '50px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '2px' }}>
              [SECURE_DEPLOYMENT_REPOSITORIES]
            </div>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', fontWeight: 800 }}>
              PROJECT SHOWCASE
            </h2>
          </div>

          {/* Filtering buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-title)',
              fontSize: '0.75rem',
            }}
          >
            <Filter size={14} style={{ color: 'var(--accent-primary)' }} />
            {['All', 'AI & ML', 'Fullstack', 'Utilities'].map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  style={{
                    background: isActive ? 'var(--accent-primary)' : 'rgba(var(--bg-secondary), 0.3)',
                    color: isActive ? '#000' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    padding: '8px 14px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Deck Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '25px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="cyber-panel project-card"
              onClick={() => setSelectedProject(project)}
              style={{
                padding: '25px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Top header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {project.category}
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Layers size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: 700 }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {project.shortDesc}
                </p>
              </div>

              {/* Badges footer */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px' }}>
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                    }}
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-primary)' }}>
                    +{project.tech.length - 3} MORE
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Overlay */}
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(6, 6, 12, 0.8)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()} // Prevent click-out inside panel
              className="cyber-panel project-modal-panel"
              style={{
                borderLeft: '5px solid var(--accent-primary)',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              {/* Sci-Fi HUD Corner Brackets */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderRight: '2px solid var(--accent-primary)', borderTop: '2px solid var(--accent-primary)', borderTopRightRadius: '8px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderLeft: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)', borderBottomLeftRadius: '8px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderRight: '2px solid var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)', borderBottomRightRadius: '8px', pointerEvents: 'none' }} />

              {/* Close button indicator */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  zIndex: 25,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                [ESC_CLOSE]
              </button>

              {/* Telemetry Status Bar - STATIC */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>[SYSTEM_SPEC_SHEET // {selectedProject.id.toUpperCase()}]</span>
                <span style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', animation: 'pulse 1.5s infinite' }} />
                  STATUS: DEPLOYED
                </span>
              </div>

              {/* Project Main Titles - STATIC */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                  {selectedProject.title}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                  &gt; {selectedProject.subtitle}
                </span>
              </div>

              {/* Scrollable Content Container */}
              <div className="modal-scroll-container">
                {/* Left Column: Analysis & Milestones */}
                <div className="modal-col-left">
                  {/* Technical Data Log Summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-title)', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '1px' }}>
                      <Cpu size={14} />
                      <span>OVERVIEW SYSTEM ANALYSIS</span>
                    </div>
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '16px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.08) 50%)', backgroundSize: '100% 4px', zIndex: 1, pointerEvents: 'none', opacity: 0.1 }} />
                      <span style={{ position: 'relative', zIndex: 2 }}>{selectedProject.fullDesc}</span>
                    </div>
                  </div>

                  {/* Milestones Alert Banner */}
                  {selectedProject.milestone && (
                    <div
                      style={{
                        backgroundColor: 'rgba(57, 255, 20, 0.03)',
                        border: '1px dashed var(--accent-green)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.8rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: 'bold', letterSpacing: '1px' }}>
                        [SYSTEM_INTEGRATION_MILESTONE]
                      </span>
                      <p style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{selectedProject.milestone}</p>
                    </div>
                  )}
                </div>

                {/* Right Column: Specs & Subsystem Breakdown */}
                <div className="modal-col-right">
                  {/* Technical Specifications Grid Matrix */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      border: '1px solid var(--border-color)',
                      padding: '14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(var(--bg-secondary), 0.2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>MODULE_TYPE: </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedProject.category.toUpperCase()}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>HOSTING_GATE: </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>VERCEL_CLOUD</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>ENCRYPT_STD: </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>TLS_1.3 // SSL</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>COMPILATION: </span>
                      <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>SUCCESSFUL</span>
                    </div>
                  </div>

                  {/* Detailed Tech Spec Modules */}
                  {selectedProject.frontendSpec || selectedProject.backendSpec || selectedProject.databaseSpec ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderTop: '1px dashed var(--border-color)', paddingTop: '15px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        INTEGRATED SYSTEM SPECIFICATIONS:
                      </span>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Frontend Spec */}
                        {selectedProject.frontendSpec && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                              [FRONTEND_MODULES]
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {selectedProject.frontendSpec.map((t) => (
                                <span
                                  key={t}
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(var(--bg-secondary), 0.3)',
                                  }}
                                >
                                  &lt;{t} /&gt;
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Backend Spec */}
                        {selectedProject.backendSpec && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>
                              [BACKEND_ENGINES]
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {selectedProject.backendSpec.map((t) => (
                                <span
                                  key={t}
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(var(--bg-secondary), 0.3)',
                                  }}
                                >
                                  ::{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Database Spec */}
                        {selectedProject.databaseSpec && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: 'bold' }}>
                              [DATABASE_NODES]
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {selectedProject.databaseSpec.map((t) => (
                                <span
                                  key={t}
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(var(--bg-secondary), 0.3)',
                                  }}
                                >
                                  @{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Fallback to default tech list */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        INTEGRATED COMPONENT INTERFACES:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.7rem',
                              color: 'var(--accent-primary)',
                              border: '1px solid var(--border-color)',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(var(--bg-secondary), 0.3)',
                              boxShadow: 'inset 0 0 5px rgba(0, 240, 255, 0.05)',
                            }}
                          >
                            &lt;{t} /&gt;
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Panel - STATIC */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '5px' }}>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn"
                  style={{ textDecoration: 'none', flex: 1, justifyContent: 'center', padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  VISIT DEPLOYMENT <ExternalLink size={14} />
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn-pink"
                  style={{ textDecoration: 'none', flex: 1, justifyContent: 'center', padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  SOURCE ARCHIVE <GithubIcon size={14} />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .project-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-glow);
        }
        
        .project-modal-panel {
          width: 95%;
          max-width: 900px;
          max-height: 85vh;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .modal-scroll-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          gap: 25px;
          padding-right: 8px;
        }

        .modal-col-left {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-col-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-scroll-container::-webkit-scrollbar {
          width: 4px;
        }
        .modal-scroll-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .modal-scroll-container::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 2px;
        }
        .modal-scroll-container::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .project-modal-panel {
            padding: 20px;
            max-height: 90vh;
            gap: 15px;
          }
          .modal-scroll-container {
            flex-direction: column;
            gap: 20px;
          }
          .modal-col-left, .modal-col-right {
            flex: none;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
