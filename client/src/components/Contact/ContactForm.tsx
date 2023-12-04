import React from 'react'

const ContactForm: React.FC = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="firstName" className="orange-label">
          First Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className="orange-label">
          Last Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="orange-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="orange-label">
          Subject:
        </label>
        <select className="form-control" id="subject">
          <option value="General Inquiry">General Inquiry</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Billing">Billing</option>
          <option value="Feedback">Feedback</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message" className="orange-label">
          Message:
        </label>
        <textarea
          className="form-control"
          id="message"
          rows={4}
          placeholder="Enter your message"
          required
          defaultValue={''}
        />
      </div>
      <button type="submit" className="btn btn-danger">
        <i className="fas fa-paper-plane" /> Send
      </button>
    </form>
  )
}

export default ContactForm
