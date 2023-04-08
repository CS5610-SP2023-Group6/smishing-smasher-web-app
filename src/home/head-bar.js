import {Link} from "react-router-dom";

const headBar = () => {
    return (

        <div className="row">
            <div className="col-9 position-relative float-start">
                <button className="btn  rounded-pill ps-3 pe-3 fw-bold ">
                    <Link to="/home">
                        <img src="/images/logo.png" alt="logo"  height="50"/>
                    </Link>

                </button>
                {/*<i className="bi bi-search position-absolute*/}
                {/*       wd-nudge-up"></i>*/}
            {/*    TODO: move signup to right end*/}
            </div>
            <div className="col-3 position-relative float-end">
                {/*TODO:onClick={tuitClickHandler}*/}
                <button className="btn rounded-pill ps-3 pe-3 fw-bold " >
                    <Link to="/login">Login / Sign Up</Link>
                </button>
            </div>
        </div>


    );
};
export default headBar