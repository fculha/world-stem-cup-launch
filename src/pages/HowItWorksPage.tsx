import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 26, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white', marginRight: '2rem' }}>
            <img src="/wsc-logo-full.png" alt="World STEM Cup" style={{ height: '128px', objectFit: 'contain', marginTop: '-32px', marginBottom: '-32px' }} />
          </Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flex: 1 }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>About</Link>
            <Link to="/how-it-works" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>How It Works</Link>
            <Link to="/parents-schools" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Parents & Schools</Link>
            <Link to="/education-fund" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Education Fund</Link>
            <Link to="/#sponsors" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Sponsors</Link>
            {/* Competition Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowCompetitionDropdown(true)}
              onMouseLeave={() => setShowCompetitionDropdown(false)}
            >
              <button style={{ 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '0.875rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                Competition
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showCompetitionDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showCompetitionDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  width: '12rem',
                  background: '#16213e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  padding: '0.5rem 0',
                  zIndex: 50
                }}>
                  <Link to="/world" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Overview</Link>
                  <Link to="/states" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>All States</Link>
                  <Link to="/state/MD" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Maryland Pilot</Link>
                  <Link to="/dodea" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>DoDEA Schools</Link>
                  <Link to="/bracket/current" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Playoff Bracket</Link>
                  <Link to="/leaderboard" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Leaderboard</Link>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.25rem 0' }}></div>
                  <Link to="/find-schools" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Find Schools</Link>
                </div>
              )}
            </div>
            <Link to="/watch" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ color: '#f72585' }}>●</span> Watch Live
            </Link>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Login
            </Link>
            <Link to="/register/school-admin" style={{ 
              background: '#f72585', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '9999px', 
              textDecoration: 'none', 
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Register Now
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Spacer for fixed nav */}
      <div style={{ height: '72px' }} />

      {/* Hero Section */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.1) 0%, transparent 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(67, 97, 238, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(67, 97, 238, 0.2)',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          marginBottom: '1.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span style={{ color: '#4361ee', fontWeight: '500' }}>Competition Flow</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          How It Works
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.8
        }}>
          From your school to the world stage. Follow the journey of a World STEM Cup competitor.
        </p>
      </section>

      {/* Competition Flow - Visual Steps */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          The Path to Glory
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}>
          {[
            {
              step: 1,
              title: 'School Level',
              icon: '🏫',
              description: 'Teams form at your school. Compete against classmates to qualify for city-level competition.',
              color: '#4361ee'
            },
            {
              step: 2,
              title: 'City Level',
              icon: '🏙️',
              description: 'Top school teams compete against other schools in your city. Winners advance to state.',
              color: '#7c3aed'
            },
            {
              step: 3,
              title: 'State / National',
              icon: '🗺️',
              description: 'Represent your city at the state or national level. The best teams earn a spot at the World Finals.',
              color: '#f72585'
            },
            {
              step: 4,
              title: 'World Finals',
              icon: '🌍',
              description: 'Compete against the brightest minds from around the globe. Champions are crowned!',
              color: '#ffd700'
            }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.5rem',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: item.color,
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                {item.step}
              </div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', marginTop: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: item.color }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Arrow indicators for desktop */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {[1, 2, 3].map((_, i) => (
            <svg key={i} width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ opacity: 0.5 }}>
              <path d="M0 12h35M28 5l7 7-7 7" stroke="#4361ee" strokeWidth="2" />
            </svg>
          ))}
        </div>
      </section>

      {/* Grade-Based Fairness */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #4361ee, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Grade-Based Fairness</h2>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            We believe in fair competition. Students compete within their grade bands, ensuring everyone faces 
            age-appropriate challenges and has an equal opportunity to succeed.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { grade: 'Grades 9-10', desc: 'Foundation level challenges', color: '#4361ee' },
              { grade: 'Grades 11-12', desc: 'Advanced level challenges', color: '#7c3aed' }
            ].map((item, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${item.color}20, transparent)`,
                border: `1px solid ${item.color}40`,
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <h3 style={{ color: item.color, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.grade}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(67, 97, 238, 0.1)',
            border: '1px solid rgba(67, 97, 238, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>
              Questions are carefully calibrated for each grade band, ensuring fair and meaningful competition for all participants.
            </p>
          </div>
        </div>
      </section>

      {/* Integrity & Fairness */}
      <section style={{
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #f72585, #ffd700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Integrity & Fairness</h2>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            World STEM Cup is built on a foundation of trust and fair play. Our advanced integrity systems 
            ensure every competition is honest and every achievement is earned.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: 'Proctored Environment',
                desc: 'All competitions are monitored to ensure fair play and prevent unauthorized assistance.',
                icon: '👁️'
              },
              {
                title: 'Randomized Questions',
                desc: 'Each team receives a unique set of questions, preventing answer sharing.',
                icon: '🔀'
              },
              {
                title: 'Time-Locked Rounds',
                desc: 'Strict time limits ensure all teams compete under the same conditions.',
                icon: '⏱️'
              },
              {
                title: 'Verified Results',
                desc: 'All scores are verified before advancement to the next level.',
                icon: '✓'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '1.5rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffd700' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Education Fund */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(247, 37, 133, 0.2))'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Making STEM Accessible Worldwide
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            A portion of every competition goes to our Education Fund, helping students around the world 
            access quality STEM education regardless of their background.
          </p>
          <Link 
            to="/education-fund"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #4361ee, #f72585)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            Learn About the Education Fund
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        background: 'rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>About</Link>
          <Link to="/parents-schools" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Parents & Schools</Link>
          <Link to="/education-fund" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Education Fund</Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          World STEM Cup 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
