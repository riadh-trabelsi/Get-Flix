import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../../context/AuthContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    // Vérifier s'il y a un message de succès d'inscription
    const signupSuccess = localStorage.getItem('signupSuccess')
    if (signupSuccess) {
      setSuccess(signupSuccess)
      // Supprimer le message après l'avoir affiché
      localStorage.removeItem('signupSuccess')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (response.ok) {
        const userData = await response.json()
        login(userData)
        navigate('/homepage')
      } else {
        setError('Login failed')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setError('Login failed')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                <h3>Sign In</h3>
              </h5>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <label htmlFor="floatingInputEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                <Link className="d-block text-center mt-2 small" to="/signup">
                  Don't have an account? Sign Up
                </Link>
                <Link
                  className="d-block text-center mt-2 small"
                  to="/password-recovery/"
                >
                  Forgot Password?
                </Link>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
