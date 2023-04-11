import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const NavigationBar = () => {
    const {pathname} = useLocation();
    console.log("pathname",pathname)
    const paths = pathname.split('/')
    console.log("paths",paths)
    const active = paths[3];
    const uid = paths[2]
    console.log("active",active)
    console.log("uid", uid)

    return (
        <div className="list-group list-group-horizontal">

            <Link to={pathname} className={`list-group-item ${(active === 'home' || !active) ?'active':''}`}>
                Posts

            </Link>
            <Link to = {`${pathname}/comments`} className={`list-group-item ${active === 'explore'?'active':''}`}>
                Comments
            </Link>

            <Link to= {`${pathname}/favorites`} className={`list-group-item ${active === 'profile'?'active':''}`}>
                Favorites
            </Link>


        </div>
    );
};
export default NavigationBar;