import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Profile.css'

const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setName(user.firstname)
      setEmail(user.email)
    }
  }, [user])

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const userData = await response.json()
        setName(userData.firstname)
        setEmail(userData.email)
      } else {
        setError('Failed to fetch user information')
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
      setError('Error fetching user information')
    }
  }

  const updateUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: name,
          lastname: name,
          email,
        }),
        credentials: 'include',
      })

      if (response.ok) {
        setSuccess('Profile updated successfully')
        setError(null)
      } else {
        setError('Failed to update profile')
        setSuccess(null)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Error updating profile')
      setSuccess(null)
    }
  }

  if (!user) {
    return <div className="profile-container">Please log in to view your profile.</div>
  }

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={updateUserInfo} className="btn btn-primary">
        Update Profile
      </button>
    </div>
  )
}

export default ProfilePage
