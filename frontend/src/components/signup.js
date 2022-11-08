import React, { Component } from 'react'
import '../css/signup.css'

export class Signup extends Component{
    render(){
        return(
            <>
       <div className="signup-form">
  <form action="/examples/actions/confirmation.php" method="post">
    <h3 className='fs-3 fw-semibold'>Hi! Welcome in FundGator</h3>
    <p className="hint-text">
      Sign up with your social media account or email address
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
        type="text"
        className="form-control input-lg"
        name="username"
        placeholder="Username"
        required="required"
      />
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
      <input
        type="password"
        className="form-control input-lg"
        name="confirm_password"
        placeholder="Confirm Password"
        required="required"
      />
    </div>
    <div className="form-group text-center  ">
      <button
        type="submit"
        className="btn btn-success btn-lg  btn-block signup-btn w-50 "
      >
        Sign Up
      </button>
    </div>
  </form>
  <div className="text-center">
    Already have an account? <a href="#">Login here</a>
  </div>
</div>

            </>
        )
            
        
    }
}