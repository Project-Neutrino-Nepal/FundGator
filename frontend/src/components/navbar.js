import React from "react";
import {Link} from 'react-router-dom'
import '../css/nav-search.css'

class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
          <div className="container-fluid ms-4 me-4">
            <Link className="navbar-brand" to="">
              FundGator
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="#">
                    Explore
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                

                <button
                  className="btn btn-outline-success btn-sm"
                  type="submit"
                >
                  Search
                </button>
              </form>
              
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-2">
                  <Link className="nav-link active" aria-current="page" to="#">
                    Raise funding 
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link active" aria-current="page" to="homepage">
                    FAQ 
                  </Link>
                </li>
                <li className="nav-item border-start ms-2">
                  <Link className="nav-link active ms-2" aria-current="page" to="signin">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="signup">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
export default Navbar
