import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EducationFundPage() {
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
            <img src="/wsc-trophy.png" alt="World STEM Cup" style={{ width: '240px', height: '240px', objectFit: 'contain', marginTop: '-64px', marginBottom: '-64px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>World STEM Cup</span>
          </Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>About</Link>
            <Link to="/how-it-works" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>How It Works</Link>
            <Link to="/parents-schools" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Parents & Schools</Link>
            <Link to="/education-fund" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Education Fund</Link>
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
        background: 'linear-gradient(180deg, rgba(247, 37, 133, 0.15) 0%, transparent 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(247, 37, 133, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(247, 37, 133, 0.2)',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          marginBottom: '1.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f72585" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span style={{ color: '#f72585', fontWeight: '500' }}>Global Impact</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          World STEM Cup<br />
          <span style={{ color: '#ffd700' }}>Education Fund</span>
        </h1>
        
        <p style={{
          fontSize: '1.35rem',
          color: 'rgba(255,255,255,0.85)',
          maxWidth: '750px',
          margin: '0 auto 2rem',
          lineHeight: 1.8
        }}>
          Every competition creates opportunity. A portion of our revenue goes directly to expanding 
          STEM education access for students around the world.
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
            "Education is the most powerful weapon which you can use to change the world."
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>— Nelson Mandela</p>
        </div>
      </section>

      {/* Our Mission */}
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Our Mission</h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8
          }}>
            The World STEM Cup Education Fund exists to ensure that every student, regardless of where they live 
            or their family's financial situation, has access to quality STEM education. We believe that the next 
            great scientist, engineer, or innovator could come from anywhere — and we're committed to making sure 
            they have the opportunity to shine.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            How the Fund Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                step: '1',
                title: 'Revenue Allocation',
                desc: 'A dedicated percentage of all World STEM Cup revenue is set aside for the Education Fund.',
                icon: '💰',
                color: '#4361ee'
              },
              {
                step: '2',
                title: 'Partner Schools',
                desc: 'We identify schools in underserved communities that need support for STEM programs.',
                icon: '🏫',
                color: '#7c3aed'
              },
              {
                step: '3',
                title: 'Direct Impact',
                desc: 'Funds go directly to equipment, training, and resources that help students learn.',
                icon: '🎯',
                color: '#f72585'
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
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: item.color }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section style={{
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Where Your Support Goes
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Every dollar in the Education Fund is carefully allocated to maximize impact.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: '💻', title: 'Technology', desc: 'Computers, tablets, and lab equipment', pct: '35%' },
              { icon: '📚', title: 'Materials', desc: 'Textbooks, supplies, and learning resources', pct: '25%' },
              { icon: '👩‍🏫', title: 'Training', desc: 'Teacher professional development', pct: '25%' },
              { icon: '🏆', title: 'Scholarships', desc: 'Student competition support', pct: '15%' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#ffd700' }}>{item.title}</h3>
                <p style={{ color: '#4361ee', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.pct}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Global Reach
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { value: '50+', label: 'Countries' },
              { value: '500+', label: 'Schools Supported' },
              { value: '10,000+', label: 'Students Reached' },
              { value: '$100K+', label: 'Distributed' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(247, 37, 133, 0.1))',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700', marginBottom: '0.25rem' }}>{item.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{item.label}</div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            lineHeight: 1.8
          }}>
            From rural schools in Africa to underserved communities in Asia and Latin America, 
            the Education Fund is making a difference where it matters most.
          </p>
        </div>
      </section>

      {/* Partner With Us */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(247, 37, 133, 0.2))'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Partner With Us
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            Are you a company, foundation, or individual who believes in the power of STEM education? 
            Join us in our mission to make quality education accessible to every student on the planet.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <a 
              href="mailto:partners@worldstemcup.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #4361ee, #f72585)',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}
            >
              Become a Partner
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              Contact us at partners@worldstemcup.com
            </p>
          </div>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section style={{
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Sponsorship Opportunities
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { tier: 'Platinum', amount: '$50,000+', color: '#a855f7', benefits: ['Global brand visibility', 'Named scholarship program', 'VIP event access'] },
              { tier: 'Gold', amount: '$25,000+', color: '#ffd700', benefits: ['Regional recognition', 'Co-branded materials', 'Event sponsorship'] },
              { tier: 'Silver', amount: '$10,000+', color: '#94a3b8', benefits: ['Website recognition', 'Social media features', 'Certificate of partnership'] }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: `2px solid ${item.color}40`,
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: item.color, marginBottom: '0.5rem' }}>{item.tier}</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{item.amount}</p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                  {item.benefits.map((benefit, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'rgba(255,255,255,0.8)',
                      marginBottom: '0.5rem',
                      fontSize: '0.95rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
          <Link to="/how-it-works" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>How It Works</Link>
          <Link to="/parents-schools" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Parents & Schools</Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          World STEM Cup 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
