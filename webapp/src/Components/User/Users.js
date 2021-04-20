import InitialUserPic from "../../Images/profile_pic.jpeg";
import { list } from "./blogUserApi";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import {isAuthenticated} from "../UserAuth";
import "./user.scss"

class Users extends Component {


    constructor() {
        super();
        this.state = {
            users: [],
            user12: { following: [], followers: [] }
        };
    }

    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id;
        });
        return match;
    };

    maxLikesOfBlogs=users1=>{
        const { followers } = this.props;
        let max=0;
        let blogid;
        users1.map((user, i) => {
            console.log(followers)
            const blogFollowers = followers
                ? followers.length
                : " Unknown";
            console.log(blogFollowers)
            if(max<=blogFollowers)
            {
                max=blogFollowers;
                blogid=user._id;
                console.log(user._id)
            }
        })
        console.log(blogid)
        return blogid;

    }

    renderMostFollowedUser= users => {

    return(
        <div className="row">

            {users.map((user, i) => {

               if(this.maxLikesOfBlogs(users)==user._id)
                {
            return(
                <div className="card col-md-4" key={i}>
                <img
                style={{height: "200px", width: "auto"}}
                className="img-thumbnail"
                src={`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/photo/${
                user._id
            }`}
                onError={i => (i.target.src = `${InitialUserPic}`)}
                alt={user.name}
                />
                <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link
                to={`/user/${user._id}`}
                className="btn btn-raised btn-info btn-sm"
                >
                View Profile
                </Link>
                </div>
                </div>
                );}} ) }
        </div>
    );
    }


    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4 mt-4" key={i}>
                    <img
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${InitialUserPic}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-info btn-sm"
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );


    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }



    render() {
        const { users } = this.state;
        return (<div>
                {/*<div className="container">*/}
                {/*     <h2>Star User</h2>*/}

                {/*    {this.renderMostFollowedUser(users)}*/}
                {/*</div>*/}

            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}
            </div>
            </div>
        );
    }
}

export default Users;
