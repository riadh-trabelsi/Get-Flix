import React from 'react'

import { Link } from 'react-router-dom'
import './Welcome.css'
const Welcome: React.FC = () => {
  return (
    <>
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={undefined}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Sono:wght@200;300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <nav className="navbar navbar-expand-lg">
          <div className="container ">
            <a className="navbar-brand me-lg-5 me-0" href="/">
              <img
                src="https://www.vtaffiliates.com/wp-content/themes/vt/images/logo.gif?v=1"
                className="logo-image img-fluid"
                alt="templatemo pod talk"
              />
            </a>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="ms-4">
                <Link
                  to="/login"
                  className="btn custom-btn custom-border-btn smoothscroll"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section
        className="hero-section"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://atelierdalbion.com/wp-content/uploads/2019/12/Top-10-films-2019-1.jpg)',
          backgroundBlendMode: 'multiply',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
          }}
        >
          <h1
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
            WITH VIEWTOPIA
          </h1>
          <h3
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
            Watch full seasons of exclusive streaming series, current-season
            episodes, movies, kids shows, and more.
          </h3>
        </div>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />

        <div className="row">
          <div className="col-lg-6 col-12 mx-auto">
            <div className="text-center ">
              <div className="card-group">
                <div className="card">
                  <div className="content">
                    <div className="back">
                      <div className="back-content">
                        <img
                          src="https://i.pinimg.com/280x280_RS/30/56/a3/3056a3e4268a6ad965eb0aba67933800.jpg"
                          className="card-img-top"
                          alt="..."
                        />

                        <strong>Hover Me</strong>
                      </div>
                    </div>
                    <div className="front">
                      <div className="img">
                        <div className="circle"></div>
                        <div className="circle" id="right"></div>
                        <div className="circle" id="bottom"></div>
                      </div>
                      <div className="front-content">
                        <small className="badge">Basic</small>
                        <div className="description">
                          <div className="title">
                            <h3 className="title">
                              <strong>Free basic option</strong>
                            </h3>
                          </div>
                          <h4 className="card-footer">
                            Many Features for free
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="content">
                    <div className="back">
                      <div className="back-content">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYcDsoTN9SYYMuLIVoiPNb1RaDLlvwT1HVCtoPumEjKARaUBEXznumMUX1mOL2pkG4vw&usqp=CAU"
                          className="card-img-top"
                          alt="..."
                        />

                        <strong>Hover Me</strong>
                      </div>
                    </div>
                    <div className="front">
                      <div className="img">
                        <div className="circle"></div>
                        <div className="circle" id="right"></div>
                        <div className="circle" id="bottom"></div>
                      </div>
                      <div className="front-content">
                        <small className="badge">Premium</small>
                        <div className="description">
                          <div className="title">
                            <h3 className="title">
                              <strong>Premium option</strong>
                            </h3>
                          </div>
                          <h4 className="card-footer">
                            MOST POPULAR : 30 DAYs FREE TRIAL
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <img
                    src="data:image/png;base64,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"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <button> GET STARTED</button>
                    <hr />
                    <h5 className="card-text">
                      A cinematic experience with the best picture and audio
                      quality.
                    </h5>
                    <p className="card-text">
                      <small className="text-body-secondary"></small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="owl-carousel owl-theme"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Welcome
