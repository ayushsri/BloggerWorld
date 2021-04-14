import React from 'react';

const Menu = () => (
    <div>
         <ul className="nav nav-tabs bg-info">
            <li className="nav-item">
            <a className="nav-item active" href="#">
                    Home&ensp;
            </a>
            </li>
             <li className="nav-item">
                     <a className="nav-item" href="#">
                         WriteBlogs&ensp;
                     </a>
             </li>
             <li className="nav-item">
                         <a className="nav-item active" href="#">
                             Users&ensp;
                         </a>
             </li>

        </ul>
        <li
            className="btn btn-raised  btn-primary btn-sm"
        >
            Explore Blog
        </li>

    </div>
);

export default Menu;
