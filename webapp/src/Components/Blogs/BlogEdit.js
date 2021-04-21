import BlogDefaultImage from "../../Images/Blog_Image.jpg";
import { exclusiveBlog, blogUpdate } from "./BlogAPI";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { isAuthenticated } from "../UserAuth";


//Class to edit the Blog
class BlogEdit extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        };
    }
//check if the edit blog is valid
    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        //fields cant be empty
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };
//Executing this after the first render
    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }
//event to handle the changes
    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };
//initial state executed by first render
    init = postId => {
        exclusiveBlog(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                });
            }
        });
    };
//event on clicking Submit
    onClickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            blogUpdate(postId, token, this.postData).then(data => {
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
//edit Blog form
    editBlogForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Blog body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.onClickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update Post
            </button>
        </form>
    );
 //render all changes
    render() {
        const {
            id,
            title,
            body,
            redirectToProfile,
            error,
            loading
        } = this.state;
//checking if it is valid profile to edit
        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

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

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${
                        process.env.REACT_APP_BLOGGER_WORLD_URL
                    }/post/photo/${id}?${new Date().getTime()}`}
                    onError={i => (i.target.src = `${BlogDefaultImage}`)}
                    alt={title}
                />

                {isAuthenticated().user.role === "admin" &&
                this.editBlogForm(title, body)}

                {isAuthenticated().user._id === id &&
                this.editBlogForm(title, body)}
            </div>
        );
    }
}
//exporting the blogEdit
export default BlogEdit;
