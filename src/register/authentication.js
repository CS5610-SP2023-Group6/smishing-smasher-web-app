import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerThunk } from "../services/auth/auth-thunk";
import { uploadThunk } from "../services/file/file-thunk";
import { useGoogleLogin } from "@react-oauth/google";
import "../vendors/fontawesome/css/all.css";
import "../vendors/bootstrap/css/bootstrap.min.css";

const Authentication = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [website, setWebsite] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
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
          setEmail(res.data.email);
          setNickname(res.data.name);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxSize = 5 * 16; // 将5rem转换为像素
        canvas.width = maxSize;
        canvas.height = maxSize;

        const widthRatio = maxSize / image.width;
        const heightRatio = maxSize / image.height;
        const scaleRatio = Math.max(widthRatio, heightRatio);

        const newWidth = image.width * scaleRatio;
        const newHeight = image.height * scaleRatio;

        ctx.drawImage(
          image,
          (canvas.width - newWidth) / 2,
          (canvas.height - newHeight) / 2,
          newWidth,
          newHeight
        );

        const resizedImageUrl = canvas.toDataURL(file.type);
        setAvatarPreview(resizedImageUrl);
        setAvatar(file);
      };
    } else {
      alert("Only jpg, jpeg and png files are allowed!");
    }
  };

  const previewClickHandler = () => {
    document.getElementById("avatar").click();
  };

  const handleRegister = async () => {
    try {
      var profilePicture = "6442a2dc66674f9ee9472690";
      if (avatar !== null) {
        const formData = new FormData();
        formData.append("file", avatar);
        const SERVER_API_URL = "http://localhost:4000/api";
        const FILES_URL = `${SERVER_API_URL}/files`;
        const api = axios.create({
          withCredentials: true,
        });
        const response = await api.post(`${FILES_URL}/upload`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const uploadedFiles = response.data;
        profilePicture = uploadedFiles[0].id;
      }
      console.log(profilePicture);
      const body = {
        email: email,
        password: password,
        profilePicture: profilePicture,
        nickname: nickname,
        birthday: birthday,
        website: website,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        bio: bio,
      };
      await dispatch(registerThunk({ body: body }));
      navigate("/login");
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
          window.FB.api("/me", { fields: "email,name" }, async (userInfo) => {
            console.log("User: ", userInfo);
            setEmail(userInfo.email);
            setNickname(userInfo.name);
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
        <div className="col-12 d-flex justify-content-center">
          <div
            onClick={previewClickHandler}
            className="wd-avatar"
            style={{
              background: avatarPreview
                ? `url(${avatarPreview})`
                : `url(http://localhost:4000/api/files/6442a2dc66674f9ee9472690)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <input
            className="form-control wd-input-text"
            id="avatar"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="email">
          Email<span className="fw-regular fs-6">*</span>
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
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="nickname">
          Nickname<span className="fw-regular fs-6">*</span>
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="nickname"
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="password">
          Password<span className="fw-regular fs-6">*</span>
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
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="birthday">
          Birthday<span className="fw-regular fs-6">*</span>
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="birthday"
            type="date"
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="website">
          Website
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="website"
            type="url"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="address1">
          Address1<span className="fw-regular fs-6">*</span>
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="address1"
            type="text"
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="address2">
          Address2
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="address2"
            type="text"
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="city">
          City<span className="fw-regular fs-6">*</span>
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="state">
          State<span className="fw-regular fs-6">*</span>
        </label>
        <div className="col-8">
          <select
            className="form-control wd-input-text"
            name="state"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="">--Select a state--</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="zip">
          Zip Code<span className="fw-regular fs-6">*</span>
        </label>
        <div className="col-8">
          <input
            className="form-control wd-input-text"
            id="zip"
            type="text"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 mb-4 row">
        <label className="col-4 col-form-label fw-bold" for="bio">
          Bio
        </label>
        <div className="col-8">
          <textarea
            className="form-control wd-input-text"
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="wd-register mb-4">
        If you already have an account, please&nbsp;
        <Link to="/login">sign in</Link>&nbsp;here
      </div>
      <button
        id="loginBtn"
        className="btn btn-primary mb-2 w-100"
        onClick={handleRegister}
      >
        Sign up
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
        &nbsp;Sign up with Google
      </button>
      <button
        className="btn btn-primary w-100 mb-2"
        onClick={handleFacebookLogin}
      >
        <i className="fab fa-facebook"></i>&nbsp;Sign up with Facebook
      </button>
    </div>
  );
};

export default Authentication;
