import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import user from "./../images/user.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setimage] = useState(null);

  const file = useRef();
  const navigate = useNavigate();

  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setimage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("image", file.current.files[0]);

    const response = await fetch("http://localhost:8000/api/postregister", {
      method: "POST",
      body: data,
    });
    const newData = await response.json();
    if (newData.message === "Data Save Successfully") {
      navigate("/");
      setUsername("");
      setEmail("");
      setPassword("");
      setimage(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4 mt-4 register-card">
              <ToastContainer />
              <div className="card-body">
                <h1 className="text-center mb-2">Register</h1>
                <p className="text-center m-0">Happy to join you!</p>
                <div className="wrapper -flex justify-content-center my-4">
                  <label htmlFor="profile">
                    <img
                      src={image || user}
                      alt=""
                      className="rounded-circle shadow-sm btnimg"
                    />
                  </label>
                  <input
                    type="file"
                    id="profile"
                    ref={file}
                    onChange={imageChange}
                  ></input>
                </div>
                <form onSubmit={register}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-field"
                      id="name"
                      value={username}
                      placeholder="Username*"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control input-field"
                      id="email"
                      value={email}
                      placeholder="Email*"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input-field"
                      id="password"
                      value={password}
                      placeholder="Password*"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary text-white register-btn"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-center">
                  Already registered?{" "}
                  <span className="text-danger login-link">
                    <NavLink to="/" className="text-decoration-none">
                      Login Now
                    </NavLink>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
