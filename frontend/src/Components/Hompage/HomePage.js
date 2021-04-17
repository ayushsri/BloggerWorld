import React from "react";
import Blogs from "../Blogs/Blogs";

const Homepage = () => (
    <div>
        <div className="jumbotron bg-dark text-white">
            <h1 className="lead">Blogger World</h1><br></br>
            <p className="font-weight-light">"Blog your heart out." BloggerWorld allows you to to express your views and opinion on whats so
                ever topic you want.</p>
        </div>
        <div className="container-fluid">
            <Blogs/>
        </div>
    </div>
);

export default Homepage;
