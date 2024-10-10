import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendEmail = async (e) => {
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
            <div className="card p-4 mt-4 welcome-card">
              <div className="card-body">
                <h1 className="text-center mb-2">Recovery</h1>
                <p className="text-center m-0">Enter your email for OTP</p>

                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control input-field mt-5"
                      value={email}
                      placeholder="Email*"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      onClick={sendEmail}
                      className="btn btn-primary text-white register-btn"
                    >
                      Submit
                    </button>
                  </div>
                  <NavLink to="/password" className="text-decoration-none">
                    <div className="d-flex justify-content-center"></div>
                  </NavLink>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default Email;
