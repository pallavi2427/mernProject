import React from "react";
import user from "./../images/user.jpg";
import { NavLink } from "react-router-dom";

const Password = () => {
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4 mt-4 welcome-card">
              <div className="card-body">
                <h1 className="text-center mb-2">Hello Again!</h1>
                <p className="text-center m-0">
                  Explore more by connecting with us
                </p>
                <div className="d-flex justify-content-center my-4">
                  <img
                    src={user}
                    alt="user"
                    className="rounded-circle shadow-sm user-image"
                  />
                </div>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-field"
                      id="name"
                      placeholder="Password"
                    />
                  </div>
                  <br />

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary text-white register-btn"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-center">
                  Forgot Password?{" "}
                  <NavLink to="/recover">
                    <span className="text-danger login-link">Recover Now</span>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
