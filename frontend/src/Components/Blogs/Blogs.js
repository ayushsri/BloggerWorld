import { blogList } from "./blogsAPI";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Blogs.css"
import DefaultPost from "../../images/Blog_Image.jpg";

class Blogs extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        };
    }

    renderBlogs = blogs => {
        return (
            <div className="row">
                {blogs.map((post, i) => {
                    const blogerId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const bloggerName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card col-md-5 mt-4 cardColor" key={i}>
                            <div className="card-body bg-image hover-zoom">
                                <img
                                    src={`${
                                        process.env.REACT_APP_BLOGGER_WORLD_URL
                                    }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="rounded mx-auto d-block mb-3"
                                    style={{ height: "199px", width: "99%" }}
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <br />
                                <p className="font-italic mark">
                                    Blogged by:{" "}
                                    <Link to={`${blogerId}`}>
                                        {bloggerName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised  btn-info btn-sm"
                                >
                                    Explore Blog
                                </Link>
                            </div>


                        </div>
                    );
                })}
            </div>
        );
    };
    render() {
        const { posts, page } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "No more Blogs!" : "Newest Blogs"}
                </h2>

                {this.renderBlogs(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-dark mr-5 mt-5 mb-5"
                        onClick={() => this.blogLoadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}

                {posts.length ? (
                    <button
                        className="btn btn-raised btn-info mt-5 mb-5"
                        onClick={() => this.blogsLoadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }
    loadBlogs = page => {
        blogList(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };
    blogLoadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadBlogs(this.state.page - number);
    };

    blogsLoadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadBlogs(this.state.page + number);
    };
    componentDidMount() {
        this.loadBlogs(this.state.page);
    }


}

export default Blogs;
