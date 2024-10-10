import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import user from "./../images/user.jpg";
import { toast } from "react-toastify";

const Register1 = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(user);
  const [item, setItem] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(user);
    }
  };
  const register = async (e) => {
    e.preventDefault();
    const { username, email, password, image } = formData;
    if (!username || !email || !password) {
      toast.error("All feilds are required");
      return;
    }
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    if (image) {
      data.append("image", image);
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/postregister",
        data
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      const item1 = response.data.newUser.username;
      setItem(item1);
      toast.success("Registration Successfull");
      localStorage.setItem("username", username);
      navigate("/");
    } catch (error) {
      toast.error("failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4 mt-4 register-card">
              <div className="card-body">
                <h1 className="text-center mb-2">Register</h1>
                <p className="text-center m-0">Happy to join you!</p>
                <div className="wrapper -flex justify-content-center my-4">
                  <label htmlFor="profile">
                    <img
                      src={imagePreview}
                      alt=""
                      className="rounded-circle shadow-sm btnimg"
                    />
                  </label>
                </div>
                <form onSubmit={register} encType="multipart/form-data">
                  <input
                    type="file"
                    id="profile"
                    name="image"
                    onChange={handleFile}
                  ></input>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-field"
                      id="name"
                      name="username"
                      value={formData.username}
                      onChange={handleInput}
                      placeholder="Username*"
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control input-field"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInput}
                      placeholder="Email*"
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input-field"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInput}
                      placeholder="Password*"
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

export default Register1;
