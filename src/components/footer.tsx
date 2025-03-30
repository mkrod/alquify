import React from 'react';
import './css/footer.css';
import { appName } from '../constant';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Product</h3>
          <ul className="footer-links">
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/integrations">Integrations</a></li>
            <li><a href="/updates">Updates</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/webinars">Webinars</a></li>
            <li><a href="/developers">Developers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/security">Security</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} {appName}. All rights reserved.
        </div>
        <div className="social-links">
          <NavLink to="https://facebook.com" aria-label="Facebook"><FaFacebook /></NavLink>
          <NavLink to="https://twitter.com" aria-label="Twitter"><FaXTwitter /></NavLink>
          <NavLink to="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></NavLink>
          <NavLink to="https://instagram.com" aria-label="Instagram"><FaInstagram /></NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;