import React from 'react'

const NewPassword: React.FC = () => {
  return (
    <div className="container mt-5">
      <form className="col-md-6 offset-md-3">
        <h2 className="mb-4">Reset Password</h2>
        <div className="mb-3">
          <label htmlFor="New-Password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="New-Password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default NewPassword
