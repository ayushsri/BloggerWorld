import React from "react";
import Blogs from "../Blogs/Blogs";
//the home page which will include navbara and body
const Homepage = () => (
    <div>
    //body below navbar
        <div className="jumbotron bg-dark text-white">
            <h1 className="lead">Blogger World</h1><br></br>
            <p className="font-weight-light">"Blog your heart out." BloggerWorld allows you to to express your views and opinion on whats so
                ever topic you want.</p>
        </div>
    //all the blog section
        <div className="container-fluid">
            <Blogs/>
        </div>
    </div>
);

export default Homepage;
