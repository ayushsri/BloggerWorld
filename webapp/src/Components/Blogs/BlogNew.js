import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userCreate } from "./BlogAPI";
import { isAuthenticated } from "../UserAuth";

//blogNew is the class to adding new Blog
class BlogNew extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
            title: "",
            body: "",
            photo: "",
            error: ""
        };
    }
    //function on getting title body and then converting in form
    blogNewForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Attach a pic</label>
                <input
                    onChange={this.onChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.onChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Blog body</label>
                <textarea
                    onChange={this.onChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.onSubClick}
                className="btn btn-raised btn-info borderCard1"
            >
                Create the Blog
            </button>
        </form>
    );
    render() {
        const {
            title,
            body,
            photo,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Write a new blog</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.blogNewForm(title, body)}
            </div>
        );
    }
//on change event
    onChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

//first checking if you are signed in
    onSubClick = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            userCreate(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };
//checking if input body, title and pic is right
    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };


//Executing this after the first render
    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }
}
//exporting new blog
export default BlogNew;

