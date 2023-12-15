import React from 'react';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  return (
    <section id="contact">
      <div className="section-content">
      </div>
      <div className="contact-section">
        <div className="container">
          <form>
            <div className='row'>
              <div className="col-md-6 form-line">
                <div className="form-group">
                  <label htmlFor="exampleInputUsername">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder=" Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder=" Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder=" Enter Email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="exampleInputUsername">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder=" Enter Subject"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="description"> Message</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter Your Message"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group text-center">
                  <button type="button" className="btn btn-default submit">
                    <i className="fa fa-paper-plane" aria-hidden="true" /> Send Message
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
