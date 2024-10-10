import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const navigate = useNavigate();

  const resetPass = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password do not match !!!!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 character long");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          email: email,
          newPassword: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error("Error reseting password");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured, please try again");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4 mt-4 register-card">
              <div className="card-body">
                <h1 className="text-center mb-2">Reset</h1>
                <p className="text-center m-0">Enter new password</p>

                <form onSubmit={resetPass}>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input-field"
                      placeholder="New Password*"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input-field"
                      placeholder="Confirm Password*"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary text-white register-btn"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
