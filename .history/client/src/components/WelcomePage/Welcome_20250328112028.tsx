import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Welcome.css'
import { useAuth } from '../../context/AuthContext'


const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Get-Flix</h1>
        <p>Your Ultimate Streaming Destination</p>
        <div className="welcome-buttons">
          {isAuthenticated ? (
            <>
              <Link to="/homepage" className="welcome-btn">
                Go to Homepage
              </Link>
              <button onClick={handleLogout} className="welcome-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="welcome-btn">
                Login
              </Link>
              <Link to="/signup" className="welcome-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Welcome
