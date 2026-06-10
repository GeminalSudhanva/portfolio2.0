import React, { useState } from 'react';
import { Cpu, Server, Database, ShieldCheck, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // percentage
  useCase: string;
  details: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>({
    name: 'React',
    level: 92,
    useCase: 'Interactive SPA development',
    details: 'Building performance-optimized virtual DOM hierarchies, custom state hooks, and high-fidelity micro-interactions.'
  });
  const [calibrating, setCalibrating] = useState(false);

  const categories: SkillCategory[] = [
    {
      title: 'FRONTEND MODULES',
      icon: <Cpu size={20} />,
      color: 'var(--accent-primary)',
      skills: [
        { name: 'React', level: 92, useCase: 'Component Architecture', details: 'Expertise in custom hooks, context state management, and reusable interactive component libraries.' },
        { name: 'Next.js', level: 88, useCase: 'Fullstack Client App Routing', details: 'SSR/ISR configuration, SEO-friendly page routing, and modern server actions for rapid data fetching.' },
        { name: 'HTML5 / CSS3', level: 95, useCase: 'Responsive Layouts & Grids', details: 'Clean semantic structure, custom layouts with Flexbox and CSS Grid, and high-performance keyframe animations.' },
        { name: 'Flask UI Integrations', level: 80, useCase: 'Jinja Templating & Server Rendering', details: 'Connecting Python template architectures with client assets for rapid dashboard prototyping.' }
      ]
    },
    {
      title: 'BACKEND SYSTEMS',
      icon: <Server size={20} />,
      color: 'var(--accent-secondary)',
      skills: [
        { name: 'Node.js', level: 90, useCase: 'Scalable Microservices', details: 'Express API routing, asynchronous process handling, and event-driven backend development.' },
        { name: 'FastAPI', level: 89, useCase: 'High-Performance Python REST APIs', details: 'Creating asynchronous endpoints, Pydantic data validation, and auto-generated OpenAPI documentation.' },
        { name: 'WebSockets', level: 85, useCase: 'Real-Time Bi-Directional Comm', details: 'Powering real-time updates in admin telemetry, persistent user channels, and instant data synching.' },
        { name: 'Flask', level: 85, useCase: 'Lightweight Server Orchestration', details: 'Rapid prototyping of database endpoints, REST controllers, and authentication middleware.' },
        { name: 'Uvicorn', level: 82, useCase: 'ASGI Web Server Gateway', details: 'Deploying high-concurrency Python ASGI applications with optimized worker configurations.' }
      ]
    },
    {
      title: 'DATABASE NODES',
      icon: <Database size={20} />,
      color: 'var(--accent-tertiary)',
      skills: [
        { name: 'MongoDB Atlas', level: 87, useCase: 'Unstructured Document Stores', details: 'Configuring cloud database clusters, aggregation pipelines, and highly scalable schema design.' },
        { name: 'PostgreSQL', level: 85, useCase: 'Relational Integrity & Complex Queries', details: 'Optimized schema normalization, relational tables, indexing strategies, and raw SQL queries.' }
      ]
    },
    {
      title: 'SECURITY & ORCHESTRATION',
      icon: <ShieldCheck size={20} />,
      color: 'var(--accent-green)',
      skills: [
        { name: 'RBAC & Authentication', level: 88, useCase: 'Role-Based Access Control', details: 'Designing JWT token verify routines, session validations, and middleware path restrictions for secure logins.' },
        { name: 'Git', level: 90, useCase: 'Version Control & Gitflow', details: 'Managing codebase histories, complex merge conflict resolutions, and CI/CD automated deployment triggers.' }
      ]
    }
  ];

  const handleSkillClick = (skill: Skill) => {
    setCalibrating(true);
    setSelectedSkill(skill);
    setTimeout(() => {
      setCalibrating(false);
    }, 600);
  };

  const handleCategorySelect = (index: number) => {
    setSelectedCategory(index);
    handleSkillClick(categories[index].skills[0]);
  };

  return (
    <section id="skills" style={{ borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '60px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '2px' }}>
            [SYSTEM_CAPABILITIES_RADAR]
          </div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', fontWeight: 800 }}>
            INTERACTIVE SKILLS MATRIX
          </h2>
        </div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          
          {/* Column 1: Categories and Skill Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* Category tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleCategorySelect(idx)}
                    style={{
                      fontFamily: 'var(--font-title)',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 18px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: isActive ? cat.color : 'rgba(var(--bg-secondary), 0.3)',
                      color: isActive ? '#000' : 'var(--text-secondary)',
                      border: `1px solid ${isActive ? cat.color : 'var(--border-color)'}`,
                      fontWeight: 700,
                      letterSpacing: '1px',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? `0 0 15px ${cat.color}` : 'none',
                    }}
                  >
                    {cat.icon}
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Skills Nodes */}
            <div
              className="cyber-panel"
              style={{
                padding: '30px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '15px',
                minHeight: '200px',
              }}
            >
              {categories[selectedCategory].skills.map((skill, idx) => {
                const isSkillActive = selectedSkill?.name === skill.name;
                const activeColor = categories[selectedCategory].color;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSkillClick(skill)}
                    style={{
                      padding: '15px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: `1px solid ${isSkillActive ? activeColor : 'var(--border-color)'}`,
                      background: isSkillActive ? `rgba(${activeColor === 'var(--accent-primary)' ? '0, 240, 255' : activeColor === 'var(--accent-secondary)' ? '255, 0, 127' : activeColor === 'var(--accent-tertiary)' ? '189, 0, 255' : '57, 255, 20'}, 0.1)` : 'rgba(var(--bg-secondary), 0.1)',
                      color: isSkillActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-title)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSkillActive ? `0 0 12px ${activeColor}33` : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSkillActive) {
                        e.currentTarget.style.borderColor = activeColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSkillActive) {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                      }
                    }}
                  >
                    <Zap size={14} style={{ color: activeColor }} />
                    <span style={{ textAlign: 'center' }}>{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Selected Skill Telemetry Calibration Details */}
          {selectedSkill && (
            <div
              className="cyber-panel"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderLeft: `3px solid ${categories[selectedCategory].color}`,
                position: 'relative',
              }}
            >
              {calibrating && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(var(--bg-primary), 0.8)',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: categories[selectedCategory].color,
                    zIndex: 10,
                  }}
                >
                  <Cpu size={24} style={{ animation: 'spin 1s linear infinite', marginBottom: '10px' }} />
                  <span>CALIBRATING NODE... {Math.floor(Math.random() * 20 + 80)}%</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  [MODULE: {categories[selectedCategory].title}]
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: categories[selectedCategory].color,
                    border: `1px solid ${categories[selectedCategory].color}`,
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {selectedSkill.useCase}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: 700 }}>
                {selectedSkill.name}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {selectedSkill.details}
              </p>

              {/* Calibration Gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>CALIBRATION INTEGRITY:</span>
                  <span style={{ color: categories[selectedCategory].color, fontWeight: 'bold' }}>
                    {selectedSkill.level}%
                  </span>
                </div>
                
                {/* Progress bar container */}
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${selectedSkill.level}%`,
                      backgroundColor: categories[selectedCategory].color,
                      boxShadow: `0 0 10px ${categories[selectedCategory].color}`,
                      borderRadius: '6px',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>

              {/* Tech details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px',
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>LOAD STATUS:</div>
                  <div>OPTIMIZED // ACTIVE</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>COMPILER PROTOCOL:</div>
                  <div>ECMASCRIPT_2026 / ASYNC_NODE</div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .skills-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
        }
      `}</style>
    </section>
  );
};
