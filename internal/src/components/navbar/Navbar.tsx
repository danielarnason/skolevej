import React, { FC } from 'react';
import './navbar.scss';

const Navbar: FC = () => {
    return (
        <>
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item noHover">
                        <img
                            src="https://www.lolland.dk/Files/Images/system/Lolland9.png"
                            width="112"
                            height="28"
                        />
                    </a>
                </div>

                <div className="navbar-start">
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
