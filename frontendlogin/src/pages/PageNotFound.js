import React from "react";
import errors from "./../images/error.jpg";

const PageNotFound = () => {
  return (
    <>
      <div class="container d-flex justify-content-center">
        <div className="row">
          <div className="col-md-12">
            <img src={errors} alt="Page Not Found"></img>
            <h1>404</h1>
            <p>Oops! We can't seem to find the page you’re looking for.</p>
            <a href="/">Go to Homepage</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
