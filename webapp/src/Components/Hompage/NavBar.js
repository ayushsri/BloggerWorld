import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../UserAuth';

const isSelected = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff0022' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-info justify-content-start ">
            <li className="nav-item  ">
                <Link className="nav-link" style={isSelected(history, '/')} to="/">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                    to="/users"
                >
                    Users
                </Link>
            </li>

            <li className="nav-item">
                <Link to={`/post/create`} style={isSelected(history, `/post/create`)} className="nav-link">
                    Write Blogs
                </Link>
            </li>
            {!isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item ml-auto ">
                        <Link className="nav-link" style={isSelected(history, '/signin')} to="/signin">
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isSelected(history, '/signup')} to="/signup">
                            Sign Up
                        </Link>
                    </li>
                </React.Fragment>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li className="nav-item">
                    <Link to={`/admin`} style={isSelected(history, `/admin`)} className="nav-link">
                        Admin
                    </Link>
                </li>
            )}

            {isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item ">
                        <Link to={`/findpeople`} style={isSelected(history, `/findpeople`)} className="nav-link">
                            Other Users
                        </Link>
                    </li>

                    <li className="nav-item ml-auto ">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isSelected(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item ">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signOut(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>
                </React.Fragment>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
