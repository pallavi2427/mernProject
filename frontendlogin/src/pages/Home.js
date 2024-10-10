import React, { useState } from "react";
import user1 from "./../images/user.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const uname = localStorage.getItem("username");
  const [formdata, setFormData] = useState({
    username: uname || "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formdata,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Invalid Password");
      } else {
        toast.error("Invalid Credentials");
      }
      console.log(error);
    }
  };

  return (
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
                  src={user1}
                  alt="user"
                  className="rounded-circle shadow-sm user-image"
                />
              </div>
              <form onSubmit={login}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-field"
                    name="username"
                    value={formdata.username}
                    placeholder="Username*"
                    onChange={handleInput}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control input-field"
                    name="password"
                    onChange={handleInput}
                    placeholder="Password"
                  />
                </div>
                <br />

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-info text-white register-btn"
                  >
                    Sign In
                  </button>
                </div>
                <NavLink to="/password" className="text-decoration-none">
                  <div className="d-flex justify-content-center"></div>
                </NavLink>
              </form>
              <p
                className="mt-3 text-center linkDesign"
                style={{ whiteSpace: "nowrap" }}
              >
                <span>Not a Member?</span>
                <span className="text-danger">
                  <NavLink to="/register" className="login-link">
                    Register Now
                  </NavLink>
                </span>
                <span className="frogetPass">Forget Password? </span>
                <span className="text-danger">
                  <NavLink to="/sendMail" className="login-link">
                    Recover Now
                  </NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
