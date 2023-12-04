


function Signup() {
  return (
    <div className="Signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="50-w p-5 rounded bg-white"> 
        <form>
          <h3 className="text-center">Sign up</h3>
          <div className="mb-2">
            <label htmlFor="fname">First name</label>
            <input type="text"  placeholder="Enter first Name" className="form-control"/>
          </div>
          <div className="mb-2">
            <label htmlFor="flname">Last name</label>
            <input type="text"  placeholder="Enter last Name" className="form-control"/>
          </div>
          
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"  className="form-control"/>  
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" className="form-control" />  
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Sign up</button>
          </div>

          <p className="text-end mt-2">
            Already registered <a href="/" className= 'ms-2'>Sign in</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup