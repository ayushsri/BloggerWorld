import './user.scss'
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../UserAuth";
import { remove } from "./blogUserApi";
import { signOut } from "../UserAuth";
//Component to delete a user
class DeleteProfile extends Component {
    state = {
        redirect: false
    };
 //function to delete  user
    accountDelete = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                signOut(() => console.log("User is deleted"));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };
//asking wether you are sure that you want to delete the user
    confirmDelete = () => {
        let answer = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (answer) {
            this.accountDelete();
        }
    };
//redirect to home or confirm the delete
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <button
                onClick={this.confirmDelete}
                className="btn btn-raised btn-danger borderCard1"
            >
                Delete Profile
            </button>
        );
    }
}

export default DeleteProfile;
