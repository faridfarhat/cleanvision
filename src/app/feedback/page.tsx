'use client';

import { FormEvent, useState, useEffect } from 'react';

interface Feedback {
  id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    feedback: '',
    rating: 5,
  });
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

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
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', role: '', feedback: '', rating: 5 });
        fetchFeedback();
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

              {feedbackList.length > 0 ? (
                feedbackList.map((item, idx) => (
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
                ))
              ) : (
                <div className="feedback-empty">
                  <i className="fas fa-comments"></i>
                  <p>No feedback yet. Be the first to share!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
