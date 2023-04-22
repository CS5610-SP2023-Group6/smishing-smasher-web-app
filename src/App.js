import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import TrendingItem from "./home/trending/trending-item";

import UserProfile from "./profile";
import PostDetail from "./post-detail";
import EditProfile from "./profile/edit-profile";
import CreatePost from "./new-post";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/user/:userId" element={<UserProfile/>}/>
                    <Route path="/post/:postId" element={<PostDetail/>}/>
                    <Route path="/edit-profile/:uid" element={<EditProfile/>}/>
                    <Route path="/createpost" element={<CreatePost/>}/>
                </Routes>
            </div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

            </Routes>


        </BrowserRouter>
    );
}

export default App;

