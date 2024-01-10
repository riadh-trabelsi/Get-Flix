import React, { useState, useEffect } from 'react'
import './Profile.css'

const ProfilePage: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [, setUserInfo] = useState<any>({}) // Adjust the type accordingly
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

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

      const userData = await response.json()
      setUserInfo(userData)
      setName(userData.name || '') // Assuming your user data has a 'name' field
      setEmail(userData.email || '') // Assuming your user data has an 'email' field

      // You may set other profile-related data here as needed
      // setProfilePicture(userData.profilePicture);
      // ...
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const maxSizeInPixels = 150
      const image = new Image()

      image.onload = () => {
        if (image.width > maxSizeInPixels || image.height > maxSizeInPixels) {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')!

          const aspectRatio = image.width / image.height

          if (image.width > image.height) {
            canvas.width = maxSizeInPixels
            canvas.height = maxSizeInPixels / aspectRatio
          } else {
            canvas.width = maxSizeInPixels * aspectRatio
            canvas.height = maxSizeInPixels
          }

          context.drawImage(image, 0, 0, canvas.width, canvas.height)
          const resizedDataURL = canvas.toDataURL('image/jpeg')

          setProfilePicture(resizedDataURL)
          setErrorMessage(null)
        } else {
          setProfilePicture(URL.createObjectURL(file))
          setErrorMessage(null)
        }
      }

      image.src = URL.createObjectURL(file)
    }
  }

  const updateUserInfo = async () => {
    try {
      const response = await fetch('https://viewtopia-zlcc.onrender.com/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed, such as authorization headers
        },
        // Add the necessary payload for updating user info
        body: JSON.stringify({
          name,
          email,
          // ... (other update data)
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update user information')
      }

      // Handle successful update
      // ...

      // Optionally, you can re-fetch user info to update the displayed data
      getUserInfo()
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
            src={profilePicture || 'default-profile-picture.jpg'}
            alt="Profile Picture"
          />
          <label htmlFor="profilePictureInput">
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <label htmlFor="FirstNameInput">
            First name:
            <input
              type="text"
              id="firstNameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="LastNameInput">
            Last Name:
            <input
              type="text"
              id="lastNameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="emailInput">
            Email:
            <input
              type="text"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button onClick={updateUserInfo}>Update User Info</button>
      </section>
    </div>
  )
}

export default ProfilePage
