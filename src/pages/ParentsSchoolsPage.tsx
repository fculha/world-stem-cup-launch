import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ParentsSchoolsPage() {
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
            <img src="/wsc-logo-full.png" alt="World STEM Cup" style={{ height: '128px', objectFit: 'contain', marginTop: '-32px', marginBottom: '-32px' }} />
          </Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>About</Link>
            <Link to="/how-it-works" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>How It Works</Link>
            <Link to="/parents-schools" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Parents & Schools</Link>
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

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          For Parents & Schools
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.8
        }}>
          Everything you need to know about World STEM Cup. Safe, fair, and focused on learning.
        </p>
      </section>

      {/* Split Layout: Parents vs Schools */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem'
        }}>
          {/* Parents Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(67, 97, 238, 0.05))',
            border: '1px solid rgba(67, 97, 238, 0.3)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(67, 97, 238, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #4361ee, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                👨‍👩‍👧‍👦
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#4361ee' }}>For Parents</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Safe Environment
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  All competitions are supervised by teachers. No personal information is shared publicly.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Academic Focus
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Questions are designed by educators. Your child learns while competing.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Fair Competition
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Students compete within their grade level. Everyone has an equal chance.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  No Cost to Participate
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  World STEM Cup is free for students. No hidden fees or purchases required.
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(67, 97, 238, 0.1)',
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                Questions? Contact your child's teacher or school administrator.
              </p>
            </div>
          </div>

          {/* Schools Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(247, 37, 133, 0.1), rgba(247, 37, 133, 0.05))',
            border: '1px solid rgba(247, 37, 133, 0.3)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(247, 37, 133, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #f72585, #ff6b6b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🏫
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f72585' }}>For Schools</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Easy Setup
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Register your school in minutes. We provide all the tools you need.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Curriculum Aligned
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Questions align with standard STEM curricula. Supports classroom learning.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Teacher Dashboard
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Manage teams, track progress, and view results all in one place.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffd700' }}>
                  Recognition
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Participating schools receive certificates and recognition for their students.
                </p>
              </div>
            </div>

            <Link 
              to="/"
              style={{
                display: 'block',
                marginTop: '2rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #f72585, #ff6b6b)',
                borderRadius: '0.75rem',
                textAlign: 'center',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600'
              }}
            >
              Register Your School
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
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
            Why World STEM Cup?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: '🎓', title: 'Educational', desc: 'Builds real STEM skills' },
              { icon: '🌍', title: 'Global', desc: 'Connect with students worldwide' },
              { icon: '🤝', title: 'Teamwork', desc: 'Learn to collaborate' },
              { icon: '🏆', title: 'Achievement', desc: 'Earn recognition and rewards' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffd700' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Common Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: 'Is it safe for my child?',
                a: 'Yes. All competitions are supervised by teachers. We never share personal information publicly.'
              },
              {
                q: 'Does it cost anything?',
                a: 'No. World STEM Cup is completely free for students and schools.'
              },
              {
                q: 'What grades can participate?',
                a: 'Currently, we support high school students in grades 9-12.'
              },
              {
                q: 'How much time does it take?',
                a: 'Each competition round takes about 30-45 minutes. Students can participate during school hours.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#4361ee' }}>{item.q}</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{item.a}</p>
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
          <Link to="/education-fund" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Education Fund</Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          World STEM Cup 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
