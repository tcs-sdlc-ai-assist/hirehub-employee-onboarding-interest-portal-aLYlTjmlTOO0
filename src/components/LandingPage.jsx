import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to HireHub</h1>
            <p>
              Join a company that values innovation, collaboration, and personal growth. Discover exciting opportunities and become part of our vibrant culture.
            </p>
            <div className="hero-actions">
              <Link to="/apply" className="btn btn-lg btn-primary">
                Express Your Interest
              </Link>
              <a href="#features" className="btn btn-lg btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="container">
          <h2>Why Join Us?</h2>
          <p className="section-subtitle">
            We offer a workplace where talent thrives and ideas come to life. Here's what makes HireHub special.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-icon">🚀</div>
              <h3>Innovation</h3>
              <p>
                Work on cutting-edge projects that push boundaries and shape the future of technology. We encourage creative thinking and bold ideas.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">📈</div>
              <h3>Growth</h3>
              <p>
                Accelerate your career with mentorship programs, learning opportunities, and clear paths for professional advancement.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🤝</div>
              <h3>Culture</h3>
              <p>
                Be part of a diverse and inclusive team that celebrates collaboration, transparency, and mutual respect every day.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🌍</div>
              <h3>Impact</h3>
              <p>
                Make a meaningful difference by contributing to products and services that positively impact millions of people worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Take the first step toward an exciting career. Submit your interest and our team will get in touch with you.
          </p>
          <Link to="/apply" className="btn btn-lg btn-primary">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}