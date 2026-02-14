'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const heroImages = [
    '/cleanvision/images/cleaning1.jpg',
    '/cleanvision/images/cleaning2.jpg',
    '/cleanvision/images/cleaning3.jpg',
  ];

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedbackIndex((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const feedbacks = [
    {
      text: 'The team arrived on time and left our office spotless. Professional and friendly from start to finish.',
      author: 'Maya Collins',
      role: 'Operations Manager',
    },
    {
      text: 'Our home looks brand new every visit. The attention to detail is incredible.',
      author: 'Jordan Lee',
      role: 'Homeowner',
    },
    {
      text: 'Reliable, consistent, and easy to schedule. The monthly plan is a lifesaver.',
      author: 'Elena Ruiz',
      role: 'Property Owner',
    },
  ];

  const services = [
    {
      icon: 'fas fa-house-chimney',
      name: 'Residential Care',
      desc: 'Weekly or monthly deep cleans tailored to your home and lifestyle.',
      bullets: [
        'Kitchen and bath sanitization with eco-safe products',
        'Dusting, vacuuming, and floor polishing included',
        'Flexible schedules with the same trusted team',
      ],
    },
    {
      icon: 'fas fa-briefcase',
      name: 'Office Refresh',
      desc: 'Discreet, after-hours cleaning that keeps your team productive.',
      bullets: [
        'Workstations, breakrooms, and conference rooms reset nightly',
        'Trash removal and restroom disinfection done to spec',
        'Quiet, uniformed staff with secure access notes',
      ],
    },
    {
      icon: 'fas fa-warehouse',
      name: 'Commercial Sites',
      desc: 'High-traffic cleaning for facilities, showrooms, and warehouses.',
      bullets: [
        'High-touch surfaces disinfected to reduce downtime',
        'Floor care for large areas with industrial equipment',
        'Shift-based teams for minimal operational disruption',
      ],
    },
    {
      icon: 'fas fa-soap',
      name: 'Specialty Detailing',
      desc: 'Carpets, upholstery, move-in/move-out, and seasonal resets.',
      bullets: [
        'Deep carpet and upholstery extraction services',
        'Move-in/move-out detailing with checklist sign-off',
        'Seasonal refreshes for kitchens, vents, and trim',
      ],
    },
  ];

  const stats = [
    { value: '1,200+', label: 'Happy clients' },
    { value: '98%', label: 'Satisfaction rate' },
    { value: '24/7', label: 'Support' },
  ];

  const moveFeedback = (direction: number) => {
    setCurrentFeedbackIndex((prev) => (prev + direction + feedbacks.length) % feedbacks.length);
  };

  return (
    <div className="cv-home">
      <section className="cv-hero" style={{ transform: `translateY(${scrollY * 0.3}px)`, transition: 'transform 0.1s ease-out' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="cv-badge">Licensed and insured cleaning experts</div>
              <h1 className="cv-hero-title">
                Premium cleaning with a calm, hotel-level finish.
              </h1>
              <p className="cv-hero-sub">
                CleanVision delivers consistent, detail-focused cleaning for homes and businesses.
                Flexible plans, eco-safe products, and a team you can trust.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/quote" className="btn btn-primary btn-lg">
                  Get a Free Quote
                </Link>
              </div>
              <div className="cv-trust mt-4">
                <div className="cv-trust-item">
                  <i className="fas fa-star"></i>
                  <span>Rated 4.9/5 by local clients</span>
                </div>
                <div className="cv-trust-item">
                  <i className="fas fa-leaf"></i>
                  <span>Eco-safe, family-friendly supplies</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cv-hero-media">
                <div className="cv-hero-carousel">
                  {heroImages.map((img, idx) => (
                    <img
                      key={img}
                      src={img}
                      alt={`Professional cleaning service ${idx + 1}`}
                      className={`cv-hero-image ${idx === currentHeroImage ? 'active' : ''}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/700x520?text=Cleaning+Service';
                      }}
                    />
                  ))}
                </div>
                <div className="cv-hero-carousel-indicators">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      className={`cv-carousel-dot ${idx === currentHeroImage ? 'active' : ''}`}
                      onClick={() => setCurrentHeroImage(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="cv-section-header">
            <p className="cv-eyebrow">Services</p>
            <h2>Cleaning plans that fit your routine</h2>
            <p>
              Choose a schedule that works for you. We deliver the same polished finish every visit.
            </p>
          </div>
          <div className="cv-services">
            {services.map((service) => (
              <div
                key={service.name}
                className="row g-5 align-items-center cv-service cv-reveal-left"
                data-reveal
              >
                <div className="col-lg-5">
                  <div className="cv-service-panel">
                    <div className="cv-service-icon">
                      <i className={service.icon}></i>
                    </div>
                    <div className="cv-service-title">{service.name}</div>
                    <p className="cv-service-desc">{service.desc}</p>
                    <span className="cv-card-link">Custom pricing</span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="cv-service-details">
                    <h3>{service.name}</h3>
                    <p>{service.desc}</p>
                    <ul className="cv-bullets">
                      {service.bullets.map((item, itemIndex) => (
                        <li
                          key={item}
                          className="cv-bullet"
                          style={{ animationDelay: `${0.2 + itemIndex * 0.2}s` }}
                        >
                          <i className="fas fa-check"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section cv-reveal" data-reveal style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef6ff 100%)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="/cleanvision/images/cleaning2.jpg"
                alt="Cleaner preparing supplies"
                className="cv-split-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/640x480?text=Cleaning+Team';
                }}
              />
            </div>
            <div className="col-lg-6">
              <p className="cv-eyebrow">Why CleanVision</p>
              <h2>Professional teams, curated products, spotless results</h2>
              <p className="cv-body">
                We focus on high-touch details, consistent checklists, and respectful service.
                Our teams are trained, insured, and supported by real-time scheduling.
              </p>
              <div className="cv-list">
                <div><i className="fas fa-check"></i> Dedicated team lead on every visit</div>
                <div><i className="fas fa-check"></i> Eco-safe disinfectants and HEPA filtration</div>
                <div><i className="fas fa-check"></i> Same-day reminders and secure access notes</div>
                <div><i className="fas fa-check"></i> Clear pricing with no surprise fees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-section cv-reveal" data-reveal style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="cv-section-header">
            <p className="cv-eyebrow">Testimonials</p>
            <h2>Clients who trust our consistency</h2>
          </div>
          <div className="cv-testimonial">
            <div className="cv-testimonial-content">
              <p className="cv-testimonial-quote">
                "{feedbacks[currentFeedbackIndex].text}"
              </p>
              <div className="cv-testimonial-author">
                <strong>{feedbacks[currentFeedbackIndex].author}</strong>
                <span>{feedbacks[currentFeedbackIndex].role}</span>
              </div>
            </div>
            <div className="cv-testimonial-controls">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => moveFeedback(-1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => moveFeedback(1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-band cv-reveal" data-reveal>
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="col-md-4">
                <div className="cv-stat">
                  <div className="cv-stat-value">{stat.value}</div>
                  <div className="cv-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
