import { Link } from "react-router-dom";

const HeadBar = () => {
    return (
        <div className="container">
            <div className="row ">
                <div className="col-6">
                    <button className="btn rounded-pill ps-3 pe-3 fw-bold">
                        <Link to="/home">
                            <img src="/images/logo.png" alt="logo" height="50" />
                        </Link>
                    </button>
                </div>
                <div className="col float-end">
                    <div className="btn-group">
                    <Link to="/login" className="btn btn-light me-2">Login / Sign Up</Link>
                    <Link to="/profile" className="btn btn-light me-2">
                        Profile
                    </Link>
                    <Link to="/history" className="btn btn-light me-2">
                        History
                    </Link>
                    <Link to="/following" className="btn btn-light me-2">
                        Following
                    </Link>
                    <Link to="/logout" className="btn btn-light me-2">
                        Log Out
                    </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeadBar;
