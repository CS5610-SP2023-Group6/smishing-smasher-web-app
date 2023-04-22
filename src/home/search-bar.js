const searchBar = () => {
    return (

        <div className="row">
            <div className="col-11 position-relative">
                <input placeholder="Search scam text according to content/phone number"
                       className="form-control rounded-pill ps-5"/>
                <i className="bi bi-search position-absolute
                       wd-nudge-up"></i>
            </div>
            <div className="col-1 position-relative float-end">
                <button className="btn btn-light rounded-pill ps-3 pe-3 fw-bold ">
                    Search
                </button>
            </div>
        </div>


    );
};
export default searchBar;