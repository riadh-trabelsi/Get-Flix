import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch('http://localhost:5050/api/sessionRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      console.log('Login successful. Data:', data)
      setLoginError(null)
    } catch (error) {
      console.error('Error during login:', error.message)
      setLoginError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="50-w p-5 rounded bg-white">
        <form onSubmit={handleLogin}>
          <h3 className="text-center">Sign in</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          {loginError && <p className="text-danger">{loginError}</p>}
          <p className="text-right">
            Forgot <Link to="/password-recovery">Password?</Link>{' '}
            <Link to="/signup" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
