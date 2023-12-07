import React from 'react'
import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <footer className="site-footer" style={{ marginTop: 200 }}>
      <div className="container pt-5">
        <div className="row align-items-center">
          <div className="col-lg-2 col-md-3 col-12">
            <a className="navbar-brand" href="index.html">
              <img
                src="images/pod-talk-logo.png"
                className="logo-image img-fluid"
                alt="templatemo pod talk"
              />
            </a>
          </div>

          <div className="col-lg-7 col-md-9 col-12">
            <ul className="site-footer-links">
              <li className="site-footer-link-item">
                <a href="#" className="site-footer-link">
                  Homepage
                </a>
              </li>

              <li className="site-footer-link-item">
                <a href="#" className="site-footer-link">
                  Categories
                </a>
              </li>

              <li className="site-footer-link-item">
                <a href="#" className="site-footer-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-12">
            <p className="copyright-text mb-0">
              Copyright © Viewtopia 2023 <br />
              <br />
              Design: Riad, Ravi
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
