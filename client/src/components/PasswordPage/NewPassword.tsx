import React from 'react'

const NewPassword: React.FC = () => {
  return (
    <div className="container mt-5">
      <form className="col-md-6 offset-md-3">
        <h2 className="mb-4">Password Recovery</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Recover Password
        </button>
      </form>
    </div>
  )
}

export default NewPassword
