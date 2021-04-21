import React, { Component } from "react";
import { commentMake, commentChange } from "../Blogs/BlogAPI";
import { isAuthenticated } from "../UserAuth";
import { Link } from "react-router-dom";
import DefaultProfile from "../../Images/profile_pic.jpeg";

//comment class
class Comment extends Component {
    state = {
        text: "",
        error: ""
    };
//setting stage on event change
    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };
//is this a valid comment
    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    };
//on submit this function is called
    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            commentMake(userId, token, postId, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });
                        this.props.updateComments(data.comments);
                    }
                }
            );
        }
    };
//on delete this functionality is used
    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        commentChange(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };
//Delete confirmed
    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };
//rendering the ui
    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>
                <h2 className="mt-5 mb-5 html-editor-italic font-italic" >Leave a comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.text}
                            className="form-control"
                            placeholder="Leave a comment..."
                        />
                        <button className="btn btn-raised btn-secondary mt-2 borderCard1">
                            Add Comment
                        </button>
                    </div>
                </form>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="col-md-12">
                    <h3 className="text-info">{comments.length} Comments</h3>
                    <hr />
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        src={`${
                                            process.env.REACT_APP_BLOGGER_WORLD_URL
                                        }/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <div>
                                    <p className="lead">{comment.text}</p>
                                    <p className="font-italic bg-light">
                                        Comment made by{" "}
                                        <Link
                                            to={`/user/${comment.postedBy._id}`}
                                        >
                                            {comment.postedBy.name}{" "}
                                        </Link>
                                        on{" "}
                                        {new Date(
                                            comment.created
                                        ).toDateString()}
                                        <span>
                                            {isAuthenticated().user &&
                                            isAuthenticated().user._id ===
                                            comment.postedBy._id && (
                                                <>
                                                        <span
                                                            onClick={() =>
                                                                this.deleteConfirmed(
                                                                    comment
                                                                )
                                                            }
                                                            className="text-danger float-right mr-1"
                                                        >
                                                            Remove
                                                        </span>
                                                </>
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
// exportig comment class
export default Comment;
