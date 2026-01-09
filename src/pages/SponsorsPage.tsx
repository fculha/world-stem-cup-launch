import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../lib/api';

interface ContributionPublic {
  id: number;
  name: string;
  amount_cents: number;
  currency: string;
  tier: string | null;
  verified_at: string | null;
}

interface TransparencySummary {
  total_collected_cents: number;
  total_collected_formatted: string;
  currency: string;
  sponsor_count: number;
  sponsors: ContributionPublic[];
  season_id: number | null;
  season_name: string | null;
}

const TIER_INFO = [
  {
    name: 'Platinum',
    amount: '$50,000+',
    color: '#E5E4E2',
    benefits: [
      'Logo on main stage backdrop',
      'Keynote speaking opportunity',
      'VIP access to all events',
      'Premium exhibition booth',
      'All digital placements',
      'Named scholarship program'
    ]
  },
  {
    name: 'Gold',
    amount: '$25,000+',
    color: '#FFD700',
    benefits: [
      'Logo on stage backdrop',
      'Workshop hosting opportunity',
      'Priority exhibition booth',
      'Website & app logo placement',
      'Social media features'
    ]
  },
  {
    name: 'Silver',
    amount: '$10,000+',
    color: '#C0C0C0',
    benefits: [
      'Logo on event banners',
      'Standard exhibition booth',
      'Website logo placement',
      'Social media mentions',
      'Newsletter recognition'
    ]
  },
  {
    name: 'Bronze',
    amount: '$5,000+',
    color: '#CD7F32',
    benefits: [
      'Logo on website',
      'Social media mention',
      'Certificate of partnership',
      'Event program listing'
    ]
  }
];

export default function SponsorsPage() {
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showGovernanceDropdown, setShowGovernanceDropdown] = useState(false);
  const [transparencyData, setTransparencyData] = useState<TransparencySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    organization_name: '',
    country: '',
    contact_person: '',
    contact_email: '',
    tier: 'GOLD',
    amount_cents: 0,
    public_display: true,
    display_label: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetchTransparencyData();
  }, []);

  const fetchTransparencyData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/public/sponsorship/summary`);
      if (response.ok) {
        const data = await response.json();
        setTransparencyData(data);
      }
    } catch (error) {
      console.error('Failed to fetch transparency data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_URL}/api/public/sponsorship/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          organization_name: '',
          country: '',
          contact_person: '',
          contact_email: '',
          tier: 'GOLD',
          amount_cents: 0,
          public_display: true,
          display_label: '',
          message: ''
        });
      } else {
        const data = await response.json();
        setSubmitError(data.detail || 'Failed to submit sponsorship request');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (cents: number) => {
    return `$${(cents / 100).toLocaleString()}`;
  };

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
                        <Link to="/sponsors" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Sponsors</Link>
                        {/* Governance Dropdown */}
                        <div style={{ position: 'relative' }}>
                          <button 
                            onClick={() => { setShowGovernanceDropdown(v => !v); setShowCompetitionDropdown(false); }}
                            style={{ 
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
                              <Link to="/governance" onClick={() => setShowGovernanceDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Overview</Link>
                              <Link to="/governance/academic-independence" onClick={() => setShowGovernanceDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Academic Independence</Link>
                              <Link to="/governance/conflict-of-interest" onClick={() => setShowGovernanceDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Conflict of Interest</Link>
                              <Link to="/governance/data-protection-child-safety" onClick={() => setShowGovernanceDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Data Protection & Child Safety</Link>
                              <Link to="/governance/organizational-structure" onClick={() => setShowGovernanceDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Organizational Structure</Link>
                            </div>
                          )}
                        </div>
                        {/* Competition Dropdown */}
                        <div style={{ position: 'relative' }}>
                          <button 
                            onClick={() => { setShowCompetitionDropdown(v => !v); setShowGovernanceDropdown(false); }}
                            style={{ 
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
                              <Link to="/world" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Overview</Link>
                              <Link to="/states" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>All States</Link>
                              <Link to="/state/MD" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Maryland Pilot</Link>
                              <Link to="/dodea" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>DoDEA Schools</Link>
                              <Link to="/bracket/current" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Playoff Bracket</Link>
                              <Link to="/leaderboard" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Leaderboard</Link>
                              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.25rem 0' }}></div>
                              <Link to="/find-schools" onClick={() => setShowCompetitionDropdown(false)} style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Find Schools</Link>
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
        background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.15) 0%, transparent 100%)',
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
          <span style={{ color: '#4361ee', fontWeight: '500' }}>Partner With Us</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          Sponsor the<br />
          <span style={{ color: '#ffd700' }}>World STEM Cup</span>
        </h1>
        
        <p style={{
          fontSize: '1.35rem',
          color: 'rgba(255,255,255,0.85)',
          maxWidth: '750px',
          margin: '0 auto 2rem',
          lineHeight: 1.8
        }}>
          Join us in building a more equitable future for STEM education. Your sponsorship directly 
          supports students from underserved communities around the world, giving them access to 
          world-class STEM competition and learning opportunities.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(247, 37, 133, 0.2))',
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
            "The future belongs to those who believe in the beauty of their dreams."
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>— Eleanor Roosevelt</p>
        </div>
      </section>

      {/* Live Transparency Panel */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Live Transparency Report
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            We believe in complete transparency. See exactly how much has been raised and who is supporting our mission.
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255,255,255,0.1)',
                borderTopColor: '#4361ee',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.5rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                color: '#4361ee',
                marginBottom: '0.5rem'
              }}>
                {transparencyData?.total_collected_formatted || '$0.00'}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
                Total Raised from {transparencyData?.sponsor_count || 0} Verified Sponsors
              </p>

              {transparencyData && transparencyData.sponsors.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  {transparencyData.sponsors.map((sponsor) => (
                    <div key={sponsor.id} style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'left'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{sponsor.name}</h4>
                          {sponsor.tier && (
                            <span style={{
                              fontSize: '0.75rem',
                              padding: '0.125rem 0.5rem',
                              borderRadius: '9999px',
                              background: sponsor.tier === 'PLATINUM' ? 'rgba(229, 228, 226, 0.2)' :
                                         sponsor.tier === 'GOLD' ? 'rgba(255, 215, 0, 0.2)' :
                                         sponsor.tier === 'SILVER' ? 'rgba(192, 192, 192, 0.2)' :
                                         'rgba(205, 127, 50, 0.2)',
                              color: sponsor.tier === 'PLATINUM' ? '#E5E4E2' :
                                     sponsor.tier === 'GOLD' ? '#FFD700' :
                                     sponsor.tier === 'SILVER' ? '#C0C0C0' :
                                     '#CD7F32'
                            }}>
                              {sponsor.tier}
                            </span>
                          )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 'bold', color: '#4361ee' }}>
                            {formatAmount(sponsor.amount_cents)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                            {formatDate(sponsor.verified_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                  Be the first to sponsor the World STEM Cup!
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section style={{
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Sponsorship Tiers
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Choose the sponsorship level that best fits your organization's goals and budget.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {TIER_INFO.map((tier, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: `2px solid ${tier.color}40`,
                borderRadius: '1.5rem',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: tier.color
                }} />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: tier.color,
                  marginBottom: '0.5rem'
                }}>
                  {tier.name}
                </h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem'
                }}>
                  {tier.amount}
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
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

      {/* Sponsorship Request Form */}
      <section id="sponsor-form" style={{
        padding: '4rem 2rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Become a Sponsor
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Fill out the form below and our team will contact you within 48 hours.
          </p>

          {submitSuccess ? (
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 10 10 16 8 14" />
              </svg>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#22c55e' }}>
                Thank You!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                Your sponsorship request has been submitted. Our team will contact you within 48 hours.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                style={{
                  marginTop: '1.5rem',
                  background: '#4361ee',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.5rem',
              padding: '2rem'
            }}>
              {submitError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  color: '#ef4444'
                }}>
                  {submitError}
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization_name}
                  onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  placeholder="Your organization name"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact_person}
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Sponsorship Tier *
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                >
                  <option value="PLATINUM" style={{ background: '#1a1a3a' }}>Platinum ($50,000+)</option>
                  <option value="GOLD" style={{ background: '#1a1a3a' }}>Gold ($25,000+)</option>
                  <option value="SILVER" style={{ background: '#1a1a3a' }}>Silver ($10,000+)</option>
                  <option value="BRONZE" style={{ background: '#1a1a3a' }}>Bronze ($5,000+)</option>
                  <option value="CUSTOM" style={{ background: '#1a1a3a' }}>Custom Amount</option>
                </select>
              </div>

              {formData.tier === 'CUSTOM' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Custom Amount (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.amount_cents / 100 || ''}
                    onChange={(e) => setFormData({ ...formData, amount_cents: parseInt(e.target.value) * 100 || 0 })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter amount in USD"
                  />
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.public_display}
                    onChange={(e) => setFormData({ ...formData, public_display: e.target.checked })}
                    style={{ width: '1.25rem', height: '1.25rem' }}
                  />
                  <span>Display my organization publicly on the transparency report</span>
                </label>
              </div>

              {!formData.public_display && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Display Label (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.display_label}
                    onChange={(e) => setFormData({ ...formData, display_label: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                    placeholder="e.g., 'Anonymous Donor' or leave blank"
                  />
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Message / Notes (optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Any additional information or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: submitting ? 'rgba(67, 97, 238, 0.5)' : '#4361ee',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Sponsorship Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bank Transfer Option */}
      <section style={{
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Prefer Bank Transfer?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
              For organizations that prefer to make payments via bank transfer, please contact us directly 
              and we will provide you with our banking details.
            </p>
            <div style={{
              background: 'rgba(67, 97, 238, 0.1)',
              border: '1px solid rgba(67, 97, 238, 0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'inline-block'
            }}>
              <p style={{ color: '#4361ee', fontWeight: '500' }}>
                Contact: sponsors@worldstemcup.com
              </p>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '1rem' }}>
              Bank transfer details coming soon for direct deposits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>About</Link>
            <Link to="/how-it-works" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>How It Works</Link>
            <Link to="/parents-schools" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Parents & Schools</Link>
            <Link to="/education-fund" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Education Fund</Link>
            <Link to="/sponsors" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Sponsors</Link>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} World STEM Cup Education Foundation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
