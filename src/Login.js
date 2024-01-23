import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
     <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form>
              <h4>Login</h4>
              <div className="form-group">
                <label>Email id:</label>
                <input
                  type="text"
                  
                  className="form-control"
                 
                  required
                />
               
              </div>

              <label>Password</label>
              <input
                type="text"
                
                className="form-control"
         
                required
              />

          <button type="button" className="btn btn-success mt-5"  >
            Login
          </button>
             
        
            </form>
            <h6>New User?  <span> <Link to="/Register">Register Now</Link> </span> </h6>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Login