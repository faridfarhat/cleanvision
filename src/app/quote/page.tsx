'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    propertySize: '',
    frequency: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', date: '', propertySize: '', frequency: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  const services = [
    { value: 'residential', label: 'Residential', icon: 'fa-home' },
    { value: 'office', label: 'Office', icon: 'fa-briefcase' },
    { value: 'commercial', label: 'Commercial', icon: 'fa-warehouse' },
    { value: 'specialty', label: 'Specialty', icon: 'fa-soap' },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-hero">
          <h1>Request a Free Quote</h1>
          <p>Tell us about your cleaning needs and we'll provide a customized quote within 24 hours.</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8 mx-auto">
            <div className="form-card">
              {submitted && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Quote request submitted!</strong>
                    <p className="mb-0">We'll review your request and get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <i className="fas fa-user"></i>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <i className="fas fa-envelope"></i>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        <i className="fas fa-phone"></i>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date" className="form-label">
                        <i className="fas fa-calendar"></i>
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="fas fa-broom"></i>
                        Service Type
                      </label>
                      <div className="service-grid">
                        {services.map((service) => (
                          <label
                            key={service.value}
                            className={`service-option ${formData.service === service.value ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service.value}
                              checked={formData.service === service.value}
                              onChange={handleChange}
                              required
                            />
                            <div className="service-option-content">
                              <i className={`fas ${service.icon}`}></i>
                              <span>{service.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="propertySize" className="form-label">
                        <i className="fas fa-ruler-combined"></i>
                        Property Size
                      </label>
                      <select
                        id="propertySize"
                        name="propertySize"
                        value={formData.propertySize}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select size</option>
                        <option value="small">Small (under 1,000 sq ft)</option>
                        <option value="medium">Medium (1,000-2,500 sq ft)</option>
                        <option value="large">Large (2,500-5,000 sq ft)</option>
                        <option value="xlarge">Extra Large (5,000+ sq ft)</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="frequency" className="form-label">
                        <i className="fas fa-sync"></i>
                        Cleaning Frequency
                      </label>
                      <select
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select frequency</option>
                        <option value="one-time">One-time</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
                  <i className="fas fa-paper-plane me-2"></i>
                  Get Free Quote
                </button>
              </form>
            </div>

            <div className="row g-4 mt-4">
              <div className="col-md-4">
                <div className="info-card">
                  <div className="info-card-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3>Quick Response</h3>
                  <p>Get your quote within 24 hours</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-card">
                  <div className="info-card-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3>No Obligation</h3>
                  <p>Free quote with no commitment</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-card">
                  <div className="info-card-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3>Transparent Pricing</h3>
                  <p>Clear pricing with no hidden fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
