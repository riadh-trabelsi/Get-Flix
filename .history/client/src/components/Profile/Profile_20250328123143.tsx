import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Profile.css'

const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
      })
    }
    getUserInfo()
  }, [user])

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const userData = await response.json()
        setFormData({
          firstname: userData.firstname || '',
          lastname: userData.lastname || '',
          email: userData.email || '',
        })
      } else {
        setError('Failed to fetch user information')
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
      setError('Error fetching user information')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const updateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5050/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })

      if (response.ok) {
        setSuccess('Profile updated successfully')
        setError(null)
        getUserInfo() // Rafraîchir les informations
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update profile')
        setSuccess(null)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Error updating profile')
      setSuccess(null)
    }
  }

  if (!user) {
    return (
      <div className="profile-container">
        Please log in to view your profile.
      </div>
    )
  }

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={updateUserInfo}>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default ProfilePage
