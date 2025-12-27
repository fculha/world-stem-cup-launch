import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
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
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
            <img src="/wsc-trophy.png" alt="World STEM Cup" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>World STEM Cup</span>
          </Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>About</Link>
            <Link to="/how-it-works" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>How It Works</Link>
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
        padding: '6rem 2rem',
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span style={{ color: '#4361ee', fontWeight: '500' }}>One World, One Future</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          Who We Are
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          lineHeight: 1.8
        }}>
          We are a global community bringing students from every corner of the world to the same table of ideas.
          Our languages, cultures, and countries may be different — but our curiosity, intelligence, and future are shared.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(247, 37, 133, 0.2), rgba(67, 97, 238, 0.2))',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            fontStyle: 'italic',
            color: '#ffd700'
          }}>
            "All students of the world are brothers and sisters."
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1.5rem',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8
          }}>
            World STEM Cup is not just a competition. It is a platform designed to prepare the next generation 
            not only to solve problems, but to <span style={{ color: '#4361ee', fontWeight: '600' }}>solve them together</span>.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
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
              background: 'linear-gradient(135deg, #f72585, #4361ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Why We Exist</h2>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            The students of today will become tomorrow's scientists, engineers, explorers, and leaders.
            The challenges of the future will not stop at borders:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {['Climate & Energy', 'Artificial Intelligence', 'Space Exploration', 'Planetary Defense', 'Global Security'].map((challenge, i) => (
              <div key={i} style={{
                background: 'rgba(67, 97, 238, 0.1)',
                border: '1px solid rgba(67, 97, 238, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <span style={{ color: '#4361ee', fontWeight: '500' }}>{challenge}</span>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            As humanity moves deeper into the Space Age, new questions will emerge — not just scientific ones, 
            but ethical and cooperative ones: How do we protect Earth? How do we share space responsibly? 
            How do we prevent future conflicts beyond our planet?
          </p>

          <div style={{
            background: 'linear-gradient(135deg, rgba(247, 37, 133, 0.1), rgba(67, 97, 238, 0.1))',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '2rem'
          }}>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.8,
              marginBottom: '1rem'
            }}>
              These challenges cannot be solved by one nation alone. They require a generation that already knows how to:
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '0.75rem'
            }}>
              {[
                'Collaborate across cultures',
                'Trust one another',
                'Think critically under pressure',
                'Act as one human civilization'
              ].map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'rgba(255,255,255,0.9)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Preparing for Space Age */}
      <section style={{
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(247, 37, 133, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #ffd700, #f72585)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 22V12" />
                <path d="M20 12l-8 4-8-4" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Preparing for the Space Age</h2>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            World STEM Cup is a training ground for the future. Here, students challenge their minds, 
            sharpen their problem-solving skills, and learn how to work as international teams.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { title: 'Today', desc: 'Solving math & physics problems', icon: '📐' },
              { title: 'Tomorrow', desc: 'Deep space missions', icon: '🚀' },
              { title: 'Future', desc: 'Planetary protection', icon: '🌍' },
              { title: 'Beyond', desc: 'Technologies not yet imagined', icon: '✨' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(247, 37, 133, 0.2))',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.8
            }}>
              If humanity ever faces major challenges in space — whether competition, conflict, or survival itself — 
              the answer will not be fear. The answer will be <span style={{ color: '#ffd700', fontWeight: '600' }}>unity, intelligence, and cooperation</span>. 
              And those values must be learned early.
            </p>
          </div>
        </div>
      </section>

      {/* Competition With Purpose */}
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
              background: 'linear-gradient(135deg, #4361ee, #00d4ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Competition With a Greater Purpose</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              padding: '2rem'
            }}>
              <h3 style={{ color: '#4361ee', marginBottom: '1rem', fontSize: '1.25rem' }}>Yes, we compete.</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                But we compete to grow — not to divide. Students here do not see each other as enemies. 
                They see each other as <span style={{ color: '#ffd700' }}>future teammates</span>.
              </p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              padding: '2rem'
            }}>
              <h3 style={{ color: '#f72585', marginBottom: '1rem', fontSize: '1.25rem' }}>Tomorrow's Partners</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                A teammate you solve problems with today may one day stand beside you on an international research team, 
                in a global mission control room, or even beyond Earth itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section style={{
        padding: '4rem 2rem',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #00d4ff, #4361ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Our Vision</h2>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            We are building more than winners. We are building:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { title: 'Thinkers', color: '#4361ee', icon: '🧠' },
              { title: 'Innovators', color: '#f72585', icon: '💡' },
              { title: 'Collaborators', color: '#ffd700', icon: '🤝' },
              { title: 'Future Guardians', color: '#00d4ff', icon: '🛡️' }
            ].map((item, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${item.color}20, transparent)`,
                border: `1px solid ${item.color}40`,
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ color: item.color, fontSize: '1.1rem' }}>{item.title}</h3>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(67, 97, 238, 0.1))',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.8
            }}>
              World STEM Cup is where young minds begin learning the most important lesson of all:
              <br />
              <span style={{ color: '#ffd700', fontWeight: '600', fontSize: '1.5rem' }}>
                The future belongs to those who can think together.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Our Invitation */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.1) 0%, rgba(247, 37, 133, 0.1) 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffd700, #f72585)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>

          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Our Invitation</h2>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.5rem',
            padding: '3rem',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 2,
              marginBottom: '1.5rem'
            }}>
              If you are <span style={{ color: '#4361ee', fontWeight: '600' }}>curious</span>,<br />
              if you <span style={{ color: '#f72585', fontWeight: '600' }}>love learning</span>,<br />
              if you believe that <span style={{ color: '#ffd700', fontWeight: '600' }}>intelligence is strongest when it is shared</span>,<br />
              then you belong here.
            </p>

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.8
            }}>
              Because the future of Earth — and the future beyond it — will be written by those who learn today 
              how to stand together tomorrow.
            </p>
          </div>

          <Link to="/register/school-admin" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #f72585, #4361ee)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'transform 0.2s'
          }}>
            Join the Movement
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.5)'
      }}>
        <p>&copy; 2025 World STEM Cup. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
          {' | '}
          <Link to="/world" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Competition</Link>
          {' | '}
          <Link to="/schools" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Find Schools</Link>
        </p>
      </footer>
    </div>
  );
}
