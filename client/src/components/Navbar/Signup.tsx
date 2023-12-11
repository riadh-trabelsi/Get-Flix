import React, { useState, useEffect } from 'react'

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/users')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5050/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Form submitted successfully:', result)
      setData(result)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="Signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="50-w p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Sign up</h3>
          <div className="mb-2">
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter first Name"
              className="form-control"
              required
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="flname">Last name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter last Name"
              className="form-control"
              required
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
        </form>

        {/* Display API data */}
      </div>
    </div>
  )
}

export default Signup
