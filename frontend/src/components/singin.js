import React from 'react'
import { Link } from 'react-router-dom'

import '../css/signup.css'

export function Signin()

    {
        return(
            <>        
       <div className="signup-form ">
  <form action="" method="">
    <h3 className='fs-3 fw-semibold'>Hi! Welcome in FundGator</h3>
    <p className="hint-text">
      Get Login with your social media account or email address
    </p>
    <div className="social-btn text-center">
      <a href="#" className="btn btn-primary btn-lg">
        <i className="fa fa-linkedin" /> LinkedIn
      </a>
      
      <a href="#" className="btn btn-danger btn-lg">
        <i className="fa fa-google" /> Google
      </a>
    </div>
    <div className="or-seperator">
      <b>or</b>
    </div>
    <div className="form-group">
      <input
        type="email"
        className="form-control input-lg"
        name="email"
        placeholder="Email Address"
        required="required"
      />
    </div>
    <div className="form-group">
      <input
        type="password"
        className="form-control input-lg"
        name="password"
        placeholder="Password"
        required="required"
      />
    </div>
    <div className="form-group">
    </div>
    <div className="form-group text-center  ">
      <button
        type="submit"
        className="btn btn-success btn-lg  btn-block signup-btn w-75 ">
        Sign Up 
      </button> <br />
      <h5 className='btn btn-border-0 mt-2 text-info  '>Forgot password?</h5>
    </div>
  </form>
  <div className="text-center">
    New to FundGator? <Link to="/signup">SingUp here</Link>
  </div>
</div>

            </>
        )
            
        
    
}