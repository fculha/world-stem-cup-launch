import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrganizationalStructurePage() {
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showGovernanceDropdown, setShowGovernanceDropdown] = useState(false);

  const DownloadButton = () => (
    <a 
      href="/docs/WSC_Organizational_Structure_Governance.pdf" 
      download
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(56, 161, 105, 0.2)',
        border: '1px solid rgba(56, 161, 105, 0.5)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'all 0.2s'
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download Organizational Structure & Governance (PDF)
    </a>
  );

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
            <Link to="/how-it-works" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>How It Works</Link>
            <Link to="/parents-schools" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Parents & Schools</Link>
            <Link to="/education-fund" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Education Fund</Link>
            <Link to="/sponsors" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>Sponsors</Link>
            {/* Governance Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowGovernanceDropdown(true)}
              onMouseLeave={() => setShowGovernanceDropdown(false)}
            >
              <button style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                fontSize: '0.875rem', 
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Governance
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showGovernanceDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showGovernanceDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.5rem',
                  width: '14rem',
                  background: '#16213e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  padding: '0.5rem 0',
                  zIndex: 50
                }}>
                  <Link to="/governance" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Overview</Link>
                  <Link to="/governance/academic-independence" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Academic Independence</Link>
                  <Link to="/governance/conflict-of-interest" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Conflict of Interest</Link>
                  <Link to="/governance/data-protection-child-safety" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Data Protection & Child Safety</Link>
                  <Link to="/governance/organizational-structure" style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'white', textDecoration: 'none', fontWeight: '500' }}>Organizational Structure</Link>
                </div>
              )}
            </div>
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
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(56, 161, 105, 0.15) 0%, transparent 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(56, 161, 105, 0.2)',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          marginBottom: '1.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ color: '#38a169', fontWeight: '500' }}>Governance & Transparency</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          Organizational Structure &<br />
          <span style={{ color: '#ffd700' }}>Governance</span>
        </h1>

        {/* Top Download Button */}
        <div style={{ marginTop: '2rem' }}>
          <DownloadButton />
        </div>
      </section>

      {/* Content Section */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1.5rem',
          padding: '3rem'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            World STEM Cup Education Foundation operates under a robust governance framework designed 
            to ensure accountability, transparency, and effective organizational management.
          </p>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            Our organizational structure includes an independent Board of Directors, Academic Council, 
            and operational leadership team, each with clearly defined roles and responsibilities.
          </p>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8
          }}>
            For complete details on our organizational structure, governance framework, and leadership, 
            please download the full document.
          </p>
        </div>

        {/* Bottom Download Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <DownloadButton />
        </div>

        {/* Back to Governance */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/governance" style={{
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Governance & Transparency
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
