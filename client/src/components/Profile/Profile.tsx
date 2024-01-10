import React, { useState, useEffect } from 'react'
import './Profile.css'

const ProfilePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<any>({}) // Adjust the type accordingly

  useEffect(() => {
    // Fetch user info when the component mounts
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const response = await fetch('https://viewtopia-zlcc.onrender.com/api/users/profile', {
        method: 'GET',
        headers: {},
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user information')
      }

      const data = await response.json()
      setUserInfo(data) // Use the userInfo state here
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <div className="profile-container">
      <header>
        <h1>User Profile</h1>
      </header>
      <section>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="user-info">
          <img
            src={userInfo.profilePicture || 'default-profile-picture.jpg'}
            alt="Profile Picture"
          />
          <p>First name: {userInfo.firstName}</p>
          <p>Last Name: {userInfo.lastName}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage