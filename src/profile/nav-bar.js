import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useEffect} from "react";
import {useState} from "react";
import {fetchCurrentUserProfile} from "../services/auth/cur-user-service";

const NavigationBar = () => {
    const [isOwner, setIsOwner] = useState(false);
    const {pathname} = useLocation();
    // console.log("pathname",pathname)
    const paths = pathname.split("/");
    // console.log("paths",paths)
    const active = paths[3];
    const uid = paths[2];
    // console.log("active",active)
    // console.log("uid", uid)

    const EditAdmin = () => {
        return (
            <Link
                to={`${pathname}/editadmin`}
                className={`list-group-item ${active === "explore" ? "active" : ""}`}
            >
                Edit Admins
            </Link>
        );
    };

    const fetchData = async () => {
        const currentUserProfile = await fetchCurrentUserProfile();

        const role = currentUserProfile.role;
        console.log("role", role);
        if (role === "owner") {
            setIsOwner(true);
        }
    };

    fetchData();

    return (
        <div className="list-group list-group-horizontal">
            <Link
                to={pathname.slice(0, pathname.length - 9)}
                className={`text-dark bg-light list-group-item ${
                    active === "posts" ? "active" : ""
                }`}
            >
                Posts
            </Link>
            <Link
                to={`${pathname}/comments`}
                className={`list-group-item ${
                    active === "comments" ? "active" : ""
                }`}
            >
                Comments
            </Link>

            {isOwner ? <EditAdmin/> : <></>}
        </div>
    );
};
export default NavigationBar;
