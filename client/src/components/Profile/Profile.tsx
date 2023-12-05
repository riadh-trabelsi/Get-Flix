import React, { useState } from 'react'
import './Profile.scss'

const ProfilePage: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <header>
        <h1>User Profile</h1>
      </header>
      <section>
        <label htmlFor="profilePictureInput">
          <img
            src={profilePicture || 'default-profile-picture.jpg'}
            alt="Profile Picture"
          />
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <h2>John Doe</h2>
        <p>Email: john.doe@example.com</p>
        <p>Location: City, Country</p>
        <p>
          Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          eget justo vel purus accumsan consectetur. Duis non ante vel lacus
          venenatis varius ac vel odio.
        </p>
      </section>
    </div>
  )
}

export default ProfilePage
