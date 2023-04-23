import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import axios from "axios";
import { editSearch } from "../reducers/search-reducer";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = async () => {
    const newSearch = {
      text: text
    };
    dispatch(editSearch(newSearch));
    const userProfile = await fetchCurrentUserProfile();
    if (userProfile) {
        const api = axios.create({ withCredentials: true });
        const addHistory = await api.post("http://localhost:4000/api/users/search", {
            text: text,
            createdAt: Date.now()
        })
        console.log(addHistory);
    }
    navigate("/search");
  };

  return (
    <div className="row">
      <div className="col-11 position-relative">
        <i className="bi bi-search position-absolute pt-2 ps-3"></i>
        <input
          value={text}
          placeholder="Search scam text according to content / phone number"
          className="form-control rounded-pill ps-5"
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="col-1 position-relative float-end">
        <button className="btn btn-light rounded-pill ps-3 pe-3 fw-bold" onClick={clickHandler}>
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
