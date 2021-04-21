import React, { Component } from "react";
import { blogList } from "./BlogAPI";
import DefaultPost from "../../Images/Blog_Image.jpg";
import { Link } from "react-router-dom";
import "./Blogs.scss"
// this is the main class of Blogs
class Blogs extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        };
    }
    blogLoadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadBlogs(this.state.page - number);
    };

    blogsLoadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadBlogs(this.state.page + number);
    };
//setting initial page state
    componentDidMount() {
        this.loadBlogs(this.state.page);
    }


//initial rendering what ever is present on the page
     loadBlogs = page => {
        blogList(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

//function to get the maximum number of likes
    maxLikesOfBlogs=blogs=>{
        let max=0;
        let blogid;
        blogs.map((post, i) => {
            console.log(max)
            const bloglikes = post.likes
                ? post.likes.length
                : " Unknown";
            console.log(bloglikes)
            if(max<=bloglikes)
            {
                max=bloglikes;
                blogid=post._id;
                console.log(post._id)
            }
        })
        console.log(blogid)
        return blogid;



    }

//to output the trending blogs
    renderTrendingBlogs=  blogs => {
        return (
            <div className="row">
                {blogs.map((post, i) => {
                    const blogerId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const bloggerName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";
                    if(post._id==this.maxLikesOfBlogs(blogs))
                    { return (
                        <div className="card col-md-6 mt-4 cardColor borderCard offset-md-2 row "  key={i}>

                            <div className="card-body bg-image hover-zoom  mx-auto">
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
                                <p className="font-italic mark font-info ">
                                    Blogged by:{" "}
                                    <Link to={`${blogerId}`}  style={{ color:"blue" }}>

                                        {bloggerName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised  btn-info btn-sm borderCard1 "
                                >
                                    Explore Blog
                                </Link>

                            </div>
                        </div>
                    );}
                })}
            </div>
        );
    };



//output blogs
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
                        <div className="card col-md-5 mt-4 cardColor borderCard"  key={i}>
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
                                <p className="font-italic mark font-info ">
                                    Blogged by:{" "}
                                    <Link to={`${blogerId}`}  style={{ color:"blue" }}>

                                        {bloggerName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised  btn-info btn-sm borderCard1 "
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
 //this is what is return on export
    render() {
        const { posts, page } = this.state;
        return (
            <div>
                <div className="container card2">
                    <h2 className="mt-5 mb-5 font-italic card3 " ><u>
                        {!posts.length ? "No Trending Blog!" : "The Trending Blog"}
                    </u>
                    </h2>
                    {this.renderTrendingBlogs(posts)}
                </div>
            <div className="container">
                <h2 className="mt-5 mb-5 font-italic"><u>
                    {!posts.length ? "No more Blogs!" : "Newest Blogs"}
                </u>
                </h2>

                {this.renderBlogs(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-dark mr-5 mt-5 mb-5 borderCard1"
                        onClick={() => this.blogLoadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}

                {posts.length ? (
                    <button
                        className="btn btn-raised btn-info mt-5 mb-5 borderCard1"
                        onClick={() => this.blogsLoadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
            </div>
        );
    }

}
//exporting Blogs
export default Blogs;
