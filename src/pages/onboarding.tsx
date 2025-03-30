import React, { useState } from 'react';
import './css/onboarding.css';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'support' | 'social'>('support');
  const navigate = useNavigate();

  const navigateTo = (page: string) => {
    document.querySelector(".loading-container")?.classList.add("gen_active");

    setTimeout(() => {
      document.querySelector(".loading-container")?.classList.remove("gen_active");
      navigate(page);
    }, 1000)
  }


  return (
    <>
      <div className="onboarding-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Unified Customer Support & Social Management</h1>
          <p className="hero-subtitle">
            Seamlessly connect with your customers and manage your social presence from one powerful platform
          </p>
        </section>

        {/* Feature Tabs */}
        <div className="feature-tabs">
          <button
            className={`tab-button ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            Customer Support System
          </button>
          <button
            className={`tab-button ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Social Media Manager
          </button>
        </div>

        {/* Feature Content */}
        <div className="feature-content">
          {activeTab === 'support' ? (
            <>
              <h2 style={{ color: 'var(--accent1)', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Revolutionize Your Customer Support
              </h2>
              <p style={{ color: 'var(--text-fade-color)', marginBottom: '2rem' }}>
                Our AI-powered customer support system helps you engage with visitors, automate responses, and gain valuable insights.
              </p>

              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-icon">💬</div>
                  <h3 className="feature-title">Live Chat Integration</h3>
                  <p className="feature-description">
                    Easily embed our chat widget on your website to communicate with visitors in real-time.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">🤖</div>
                  <h3 className="feature-title">AI-Powered Automation</h3>
                  <p className="feature-description">
                    Our smart bot handles common questions, freeing your team to focus on complex issues.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3 className="feature-title">Advanced Analytics</h3>
                  <p className="feature-description">
                    Track visitor behavior, response times, and satisfaction metrics to improve your service.
                  </p>
                </div>
              </div>

              <div className="steps-section">
                <h3 style={{ color: 'var(--accent1)', marginBottom: '2rem' }}>Get Started in 3 Simple Steps</h3>
                
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4 style={{ color: 'var(--accent1)', marginBottom: '0.5rem' }}>Sign Up</h4>
                    <p style={{ color: 'var(--text-fade-color)' }}>
                      Create your account and verify your email address
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4 style={{ color: 'var(--accent1)', marginBottom: '0.5rem' }}>Integrate</h4>
                    <p style={{ color: 'var(--text-fade-color)' }}>
                      Add our JavaScript snippet to your website or use our plugin for popular platforms
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4 style={{ color: 'var(--accent1)', marginBottom: '0.5rem' }}>Customize</h4>
                    <p style={{ color: 'var(--text-fade-color)' }}>
                      Set up your AI assistant, team members, and notification preferences
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: 'var(--accent1)', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Master Your Social Presence
              </h2>
              <p style={{ color: 'var(--text-fade-color)', marginBottom: '2rem' }}>
                Connect all your social accounts and manage them from one intuitive dashboard.
              </p>

              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-icon">🔗</div>
                  <h3 className="feature-title">Account Integration</h3>
                  <p className="feature-description">
                    Connect Facebook, Instagram, Twitter, LinkedIn and more with secure OAuth.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">⏱️</div>
                  <h3 className="feature-title">Smart Scheduling</h3>
                  <p className="feature-description">
                    Plan and schedule posts in advance with our optimal timing suggestions.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">📈</div>
                  <h3 className="feature-title">Performance Tracking</h3>
                  <p className="feature-description">
                    Monitor engagement metrics across all platforms in one place.
                  </p>
                </div>
              </div>

              <div className="steps-section">
                <h3 style={{ color: 'var(--accent1)', marginBottom: '2rem' }}>How It Works</h3>
                
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4 style={{ color: 'var(--accent1)', marginBottom: '0.5rem' }}>Connect Accounts</h4>
                    <p style={{ color: 'var(--text-fade-color)' }}>
                      Authorize access to your social media profiles with secure authentication
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4 style={{ color: 'var(--accent1)', marginBottom: '0.5rem' }}>Create Content</h4>
                    <p style={{ color: 'var(--text-fade-color)' }}>
                      Use our editor to craft posts with images, videos, and links
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4 style={{ color: 'var(--accent1)', marginBottom: '0.5rem' }}>Publish & Analyze</h4>
                    <p style={{ color: 'var(--text-fade-color)' }}>
                      Schedule your posts and track their performance with detailed analytics
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 style={{ color: 'var(--accent1)', fontSize: '2rem', marginBottom: '1.5rem' }}>
            Ready to Transform Your Customer Engagement?
          </h2>
          <p style={{ color: 'var(--text-fade-color)', marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Join thousands of businesses that trust our platform to manage their customer support and social media presence.
          </p>
          <div>
            <button onClick={() => navigateTo("/auth")} className="primary-button">Get Started Free</button>
            <button onClick={() => navigateTo("/demo")} className="secondary-button">See Demo</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OnboardingPage;
