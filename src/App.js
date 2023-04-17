import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./home";


import UserProfile from "./profile";
import PostDetail from "./post-detail";
import Login from "./login";
import History from "./history";


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
                    {/*<Route path="/history/:userId" element={<History/>} />*/}

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
