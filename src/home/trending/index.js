import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findPostsThunk} from "../../services/posts/posts-thunks";
import axios from 'axios';
import TrendingItem from "./trending-item";
import {findAllPosts} from "../../services/posts/posts-service";

const TrendingList = () => {
    // const {posts, loading, error} = useSelector(state => state.postsData);
    const dispatch = useDispatch();


    const [loggedIn, setLoggedIn] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [userProfileData, setUserProfileData] = useState(null);
    const [USAposts, setUSAposts] = useState([]);
    const [localPosts, setLocalPosts] = useState([]);


    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users/profile',{withCredentials: true});
            if (response.data.city && response.data.state) {setLoggedIn(true);}
            else {setLoggedIn(false);}


            setUserProfileData(response.data);
            console.log(response.data);

            if (response.data.city && response.data.state) {
                setUserLocation(response.data.city + ', ' + response.data.state);
            }
        } catch (error) {
            setLoggedIn(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            // Get user location when the component mounts
            await fetchUserProfile();

            const allPosts = await findAllPosts();
            console.log(allPosts);
            if (Array.isArray(allPosts)) {
                setUSAposts(allPosts);
            } else {
                setUSAposts([]);
            }
            // userProfileData.city = "Test City";
            // userProfileData.state = "TT";

            const localPosts = allPosts.filter(post => post.city === userProfileData.city && post.state === userProfileData.state);
            console.log(localPosts);
        };
        // TODO:refactor post Item make it take in a post list
        fetchData();
        console.log(USAposts);
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>


            <div className="container">
                <h1>
                    Trending
                </h1>
                <div className="row">
                    <div className="col-md-5">
                        <h2>
                            Top smishing at{" "}
                            <span className="text-danger">
                {userLocation
                    ? userLocation
                    : "your location"}
              </span>
                        </h2>
                        <ol>
                            {localPosts.map(post => (
                                <li key={post.id}>{post.text} <span className="text-warning">{post.time}</span></li>
                            ))}
                        </ol>
                    </div>
                    <div className="col-md-4">
                        <h2>Top smishing in <span className="text-danger"> USA</span></h2>

                            {/*{USAposts.map(post => (*/}
                            {/*    <li key={post.id}>{post.id}{post.text} <span className="text-warning">{post.time}</span></li>*/}
                            {/*))}*/}
                            {USAposts.map(post => (
                                <TrendingItem post={post}/>
                            ))}


                    </div>
                    <div className="col-md-4">

                    </div>
                </div>

                <hr/>

            </div>


        </div>
    );
};

export default TrendingList;
