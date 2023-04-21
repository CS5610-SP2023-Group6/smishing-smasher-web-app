import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginThunk, aloginThunk } from "../services/auth/auth-thunk";
import { useGoogleLogin } from "@react-oauth/google";
import "../vendors/fontawesome/css/all.css";
import "../vendors/bootstrap/css/bootstrap.min.css";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    initializeFacebookLogin();
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const em = res.data.email;
          console.log(res.data);
          await dispatch(aloginThunk({ email: em }));
          navigate("/home");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await dispatch(loginThunk({ email, password }));
      navigate("/home");
    } catch (e) {
      alert(e);
    }
  };

  const initializeFacebookLogin = () => {
    window.FB.init({
      appId: "249811870908977",
      cookie: true,
      xfbml: true,
      version: "v16.0",
    });
    window.FB.AppEvents.logPageView();
  };

  const handleFacebookLogout = () => {
    window.FB.logout((response) => {
      console.log("Logged out successfully", response);
    });
  };

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api("/me", { fields: "email" }, async (userInfo) => {
            console.log("User email: ", userInfo.email);
            await dispatch(aloginThunk({ email: userInfo.email }));
          navigate("/home");
          handleFacebookLogout();
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="email">
          Email
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="password">
          Password
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>
      <div className="wd-register mb-4">
        If you don't have an account, please&nbsp;<Link to="/register">sign up</Link>&nbsp;here
      </div>
      <button
        id="loginBtn"
        className="btn btn-primary mb-2 w-100"
        onClick={handleLogin}
      >
        Login
      </button>
      <button className="wd-google mb-2" onClick={() => login()}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <path
              d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="#4285F4"
            ></path>
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.805.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              fill="#34A853"
            ></path>
            <path
              d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042z"
              fill="#FBBC05"
            ></path>
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.346l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
              fill="#EA4335"
            ></path>
          </g>
        </svg>
        &nbsp;Sign in with Google
      </button>
      <button
        className="btn btn-primary w-100 mb-2"
        onClick={handleFacebookLogin}
      >
        <i className="fab fa-facebook"></i>&nbsp;Sign in with Facebook
      </button>
    </div>
  );
};

export default Authentication;
