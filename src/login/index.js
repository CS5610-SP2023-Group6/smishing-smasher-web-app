import React from "react";
import { Link } from "react-router-dom";
import Authentication from "./authentication";
import "./index.css"
import "../vendors/fontawesome/css/all.css";
import "../vendors/bootstrap/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className="wd-full-page">
      <div className="row align-items-center p-3">
        <div className="col-5"></div>
        <div className="col-2">
          <Link className="wd-logo" to="/home">
            <img src="/images/logo.png" alt="logo" height="80" />
          </Link>
          <Authentication />
        </div>
        <div className="col-5"></div>
      </div>
    </div>
  );
};

export default Login;
