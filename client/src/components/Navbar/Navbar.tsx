import React from 'react'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar: React.FC = () => {
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
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/bootstrap-icons.css" />
        <link rel="stylesheet" href="css/owl.carousel.min.css" />
        <link rel="stylesheet" href="css/owl.theme.default.min.css" />
        <link href="css/templatemo-pod-talk.css" rel="stylesheet" />
        <nav className="navbar navbar-expand-lg">
          <div className="container ">
            <a className="navbar-brand me-lg-5 me-0" href="/">
              <img
                src="images/cad-canadian-dollar-sign.gif"
                className="logo-image img-fluid"
                alt="templatemo pod talk"
              />
            </a>
            <form
              action="#"
              method="get"
              className="custom-form search-form flex-fill me-3"
              role="search"
              id="search_form"
            >
              <div className="input-group input-group-lg">
                <input
                  name="search"
                  type="search"
                  className="form-control"
                  id="search"
                  placeholder="Search films, series"
                  aria-label="Search"
                />
                <button type="submit" className="form-control" id="submit">
                  <i className="bi-search" />
                </button>
              </div>
            </form>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    HomePage
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarLightDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="navbarLightDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        Movies
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="detail-page.html">
                        TV Series
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Contact">
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="ms-4">
                <Link
                  to="/Login"
                  className="btn custom-btn custom-border-btn smoothscroll"
                >
                  Login
                </Link>
              </div>
              <div className="ms-4">
                <Link
                  to="/Signup"
                  className="btn custom-btn custom-border-btn smoothscroll"
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
export default Navbar
