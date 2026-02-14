'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="cv-navbar">
      <div className="container">
        <div className="cv-navbar-content">
          {/* Logo */}
          <Link href="/" className="cv-navbar-brand">
            <img
              src="/images/default2.svg"
              alt="CleanVision Logo"
              className="cv-navbar-logo"
            />
          </Link>

          {/* Navigation Links */}
          <div className="cv-navbar-links">
            <Link href="/quote" className="cv-nav-link">Quote</Link>
            <Link href="/feedback" className="cv-nav-link">Feedback</Link>
            <Link href="/contact" className="cv-nav-link">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
