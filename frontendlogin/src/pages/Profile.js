import React, { useEffect, useState } from "react";
import user from "./../images/user.jpg";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    image: user,
  });

  const token = localStorage.getItem("token");
  const [imagePreview, setImagePreview] = useState(user);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(user);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getUserByToken",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data.user;
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        contact: userData.contact || "",
        email: userData.email || "",
        address: userData.address || "",
        image: userData.image || user,
      });
      setImagePreview(
        userData.image ? `http://localhost:8000/assets/${userData.image}` : user
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      setImagePreview(user);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("firstName", formData.firstName);
      updatedData.append("lastName", formData.lastName);
      updatedData.append("contact", formData.contact);
      updatedData.append("email", formData.email);
      updatedData.append("address", formData.address);
      if (formData.image !== user) {
        updatedData.append("image", formData.image);
      }
      const response = await axios.put(
        "http://localhost:8000/api/update",
        updatedData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const logout = async (e) => {
    localStorage.removeItem("token");
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 mt-4 register-card">
            <div className="card-body">
              <h1 className="text-center mb-2">Profile</h1>
              <p className="text-center m-0">You can update the details</p>
              <div className="d-flex justify-content-center my-4">
                <label htmlFor="profile">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="rounded-circle shadow-sm user-image"
                  />
                </label>
              </div>
              <form onSubmit={updateProfile} encType="multipart/form-data">
                <input
                  type="file"
                  id="profile"
                  name="image"
                  onChange={handleFile}
                />
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control input-field"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInput}
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control input-field"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInput}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control input-field"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInput}
                        placeholder="Contact"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control input-field"
                        readOnly
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control input-field"
                    name="address"
                    value={formData.address}
                    onChange={handleInput}
                    placeholder="Address"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary text-white register-btn"
                  >
                    Update
                  </button>
                </div>
              </form>
              <p className="mt-3 text-center">
                Come back later?{" "}
                <NavLink to="/" className="text-decoration-none">
                  {" "}
                  <span className="text-danger login-link" onClick={logout}>
                    Logout
                  </span>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
