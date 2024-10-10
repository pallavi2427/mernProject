import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Recovery = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // const location = useLocation();
  // const { email } = location.state || {};
  const email = localStorage.getItem("email");

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully");
        setTimeout(() => {
          navigate("/reset");
        }, 3000);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Error verify OTP");
    }
  };
  const resendEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter Your Email");
    }
    try {
      const response = await fetch("http://localhost:8000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      await response.json();

      if (response.status === 200) {
        toast.success("OTP send to your Email");
        // setTimeout(() => {
        //   navigate("/recover", { state: { email } });
        // },3000);
        localStorage.setItem("email", email);
        setTimeout(() => {
          navigate("/recover");
        },3000);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("User Not Found");
      }
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4 mt-4 recovery-card">
              <div className="card-body">
                <h1 className="text-center mb-2">Recovery</h1>
                <p className="text-center m-0">Enter OTP to recover password</p>
                <br />
                <br />
                <form onSubmit={verifyOtp}>
                  <div className="form-group">
                    <label className="form-label otp-label">
                      Enter the 6-digit OTP sent to your email
                    </label>
                    <input
                      type="text"
                      className="form-control otp-input input-field"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <br />
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary text-white recover-btn"
                    >
                      Recover
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-center">
                  Can't get OTP?{" "}
                  <span onClick={resendEmail} className="text-danger resend-link">Resend</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
