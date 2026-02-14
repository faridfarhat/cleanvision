'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cv-footer">
      <div className="container">
        <div className="row g-5 align-items-start">
          {/* Company Info */}
          <div className="col-lg-5">
            <div className="cv-footer-brand">
              <h3 className="cv-footer-title">CleanVision</h3>
              <p className="cv-footer-desc">
                Professional cleaning services with a commitment to excellence. 
                We deliver spotless results for homes and businesses across the region.
              </p>
              <div className="cv-footer-badge">
                <i className="fas fa-certificate"></i>
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            <h4 className="cv-footer-heading">Get In Touch</h4>
            <ul className="cv-footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Visit Us</strong>
                  <span>123 Clean Street, City, Country</span>
                </div>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Call Us</strong>
                  <span>(123) 456-7890</span>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email Us</strong>
                  <span>info@cleanvision.com</span>
                </div>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Business Hours</strong>
                  <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-lg-3">
            <h4 className="cv-footer-heading">Follow Us</h4>
            <div className="cv-social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="cv-footer-bottom">
          <p className="cv-footer-copyright text-center">
            © {currentYear} CleanVision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
