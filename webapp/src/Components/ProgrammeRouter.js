import React from "react";
import Home from "./Hompage/HomePage";
import Menu from "./Hompage/NavBar";
import Signup from "./User/SignUp";
import Signin from "./User/SignIn";
import Profile from "./User/Profile";
import Users from "./User/Users";
import EditProfile from "./User/EditProfile";
import FindPeople from "./User/FindPeople";
import BlogNew from "./Blogs/BlogNew";
import BlogEdit from "./Blogs/BlogEdit";
import ExclusiveBlog from "./Blogs/ExclusiveBlog";
import PrivateRoute from "./UserAuth/PrivateRoute";
//import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import { Route, Switch } from "react-router-dom";
//progrmme router is use to route through different componenets
const ProgrammeRouter = () => (
    <div>
    //include nav bar in every page
        <Menu />
        <Switch>
   //route to different path according to different path
            <Route exact path="/" component={Home} />
            {/*<Route exact path="/forgot-password" component={ForgotPassword} />*/}
            <Route
                exact
                path="/reset-password/:resetPasswordToken"
                component={ResetPassword}
            />
    //use of private Router on authenticating
            <PrivateRoute exact path="/post/create" component={BlogNew} />
            <Route exact path="/post/:postId" component={ExclusiveBlog} />
            <PrivateRoute
                exact
                path="/post/edit/:postId"
                component={BlogEdit}
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute
                exact
                path="/user/edit/:userId"
                component={EditProfile}
            />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
        </Switch>
    </div>
);

export default ProgrammeRouter;
