'use client';

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  const contactMethods = [
    {
      type: 'visit',
      icon: 'fa-map-marker-alt',
      title: 'Visit Us',
      details: ['123 Clean Street', 'Cleaning City, CC 12345'],
      action: 'Get Directions',
    },
    {
      type: 'call',
      icon: 'fa-phone',
      title: 'Call Us',
      details: ['(555) 123-4567', '24/7 Available'],
      action: 'Call Now',
    },
    {
      type: 'email',
      icon: 'fa-envelope',
      title: 'Email Us',
      details: ['info@cleanvision.com', 'Response within 2 hours'],
      action: 'Send Email',
    },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-hero">
          <h1>Get In Touch</h1>
          <p>Have questions? We'd love to hear from you. Reach out to us in any way that's convenient.</p>
        </div>

        <div className="contact-methods mb-5">
          {contactMethods.map((method) => (
            <div key={method.type} className="contact-method">
              <div className="contact-method-icon">
                <i className={`fas ${method.icon}`}></i>
              </div>
              <div className="contact-method-content">
                <h3>{method.title}</h3>
                {method.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-8 mx-auto">
            <div className="form-card">
              {submitted && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p className="mb-0">We'll get back to you as soon as possible.</p>
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
                        placeholder="Your name"
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

                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        <i className="fas fa-heading"></i>
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        <i className="fas fa-message"></i>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-input"
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
                  <i className="fas fa-send me-2"></i>
                  Send Message
                </button>
              </form>
            </div>

            <div className="row g-4 mt-4">
              <div className="col-md-6">
                <div className="hours-card">
                  <h3>Business Hours</h3>
                  <ul className="hours-list">
                    <li><span>Mon - Fri</span><span>8:00 AM - 6:00 PM</span></li>
                    <li><span>Sat</span><span>9:00 AM - 4:00 PM</span></li>
                    <li><span>Sun</span><span>Closed</span></li>
                    <li className="highlight"><span>24/7 Emergency</span><span>Always Available</span></li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-card">
                  <div className="info-card-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <h3>Customer Support</h3>
                  <p>Our dedicated team is here to answer any questions about our cleaning services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
