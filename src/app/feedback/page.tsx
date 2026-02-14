'use client';

import { FormEvent, useState } from 'react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    feedback: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/mzzvvrzk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', role: '', feedback: '', rating: 5 });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count: number) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`fas fa-star ${i < count ? 'active' : ''}`}></i>
    ));
  };

  const testimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Homeowner',
      feedback: 'CleanVision exceeded our expectations! The team was professional, thorough, and our home has never looked better.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Office Manager',
      feedback: 'We switched to CleanVision for our office and have been very impressed. Great service, fair pricing, and reliable.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Business Owner',
      feedback: 'Professional cleaning crew, always on time, and attention to detail is outstanding. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-hero">
          <h1>Your Feedback Matters</h1>
          <p>Share your experience with CleanVision and help us improve our services for everyone.</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="form-card">
              <h2>Share Your Feedback</h2>
              <p className="text-muted">We'd love to hear from you!</p>

              {submitted && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Thank you!</strong>
                    <p className="mb-0">Your feedback has been submitted successfully.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
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

                <div className="form-group">
                  <label htmlFor="role" className="form-label">
                    <i className="fas fa-briefcase"></i>
                    Your Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., Homeowner, Manager"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="feedback" className="form-label">
                    <i className="fas fa-pencil-alt"></i>
                    Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-input"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-star"></i>
                    Rating
                  </label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className={`rating-star ${formData.rating >= star ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={formData.rating === star}
                          onChange={handleChange}
                        />
                        <i className="fas fa-star"></i>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-100">
                  <i className="fas fa-paper-plane me-2"></i>
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="feedback-grid">
              <div className="feedback-grid-header">
                <h2>Customer Testimonials</h2>
                <p className="text-muted">Read what our customers have to say</p>
              </div>

              {testimonials.map((item, idx) => (
                <div key={item.id || idx} className="feedback-item">
                  <div className="feedback-header">
                    <div className="feedback-avatar">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="feedback-info">
                      <h4>{item.name}</h4>
                      <p>{item.role}</p>
                    </div>
                    <div className="feedback-rating">
                      {renderStars(item.rating)}
                    </div>
                  </div>
                  <p className="feedback-text">"{item.feedback}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
