import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./home";
import TrendingItem from "./home/trending/trending-item";

import UserProfile from "./profile";
import PostDetail from "./post-detail";
import Login from "./login";


function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>

                    <Route index element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/user/:userId"
                           element={<UserProfile/>}/>
                    <Route path="/post/:postId" element={<PostDetail/>}/>
                    <Route path="/login" element={<Login/>} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
