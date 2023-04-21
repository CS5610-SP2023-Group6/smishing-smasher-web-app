import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./home";


import UserProfile from "./profile";
import PostItem from "./post-detail/post-item";
import Login from "./login";

import EditProfile from "./profile/edit-profile";
import "./vendors/bootstrap/css/bootstrap.min.css";
import "./vendors/fontawesome/css/all.min.css";
import PostDetail from "./post-detail";
import {AuthProvider} from "./login/auth-context";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
            <div className="container">
                <Routes>

                    <Route index element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/user/:uid"
                           element={<UserProfile/>}/>

                    <Route path="/post/:postId" element={<PostDetail/>}/>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/tuiter/edit-user" element={<EditProfile />} />
                    {/*<Route path="/history/:userId" element={<History/>} />*/}

                </Routes>
            </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
