import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../Header/Header CSS/Header.css";

const Header = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const [currEmail, setCurrEmail] = useState("");
    const [currUsername, setCurrUsername] = useState("");
    const nav = useNavigate()
    const handleNavLinkClick = (link) => {
        setActiveLink(link);
    };
    const handleLogout = () => {
        localStorage.removeItem("currEmail");
        localStorage.removeItem("currUsername");
        localStorage.removeItem("currToken");
        localStorage.removeItem("currPassword");
        nav("/")
        window.location.reload();
    };
    useEffect(() => {
        setCurrEmail(localStorage.getItem("currEmail"));
    }, [localStorage.getItem("currEmail")]);
    useEffect(() => {
        setCurrUsername(localStorage.getItem("currUsername"));
    }, [localStorage.getItem("currUsername")]);

    return (
        <nav className='padding-header'>
            <Row fluid="true">
                <Col xs={2}></Col>
                <Col xs={2} className="Font-color">
                    conduit
                </Col>
                <Col xs={4}></Col>
                <Col xs={4} className='flex '>
                    <NavLink
                        to="/home"
                        className={`text-decoration Home ${activeLink === 'Home' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('Home')}
                    >
                        Home
                    </NavLink>
                    {currUsername == null ? (<div>
                        <NavLink
                            to="/login"
                            className={`text-decoration Sign-in ${activeLink === 'Signin' ? 'active' : ''}`}
                            onClick={() => handleNavLinkClick('Signin')}
                        >
                            Sign in
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={`text-decoration Sign-up ${activeLink === 'Signup' ? 'active' : ''}`}
                            onClick={() => handleNavLinkClick('Signup')}
                        >
                            Sign up
                        </NavLink>
                    </div>) : (<div>
                        <NavLink
                            to="/editor/"
                            className={`text-decoration Sign-in ${activeLink === 'Signin' ? 'active' : ''}`}
                            onClick={() => handleNavLinkClick('')}
                        >
                            New Article
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={`text-decoration Sign-up ${activeLink === 'Signup' ? 'active' : ''}`}
                            onClick={() => handleNavLinkClick('')}
                        >
                            Settings
                        </NavLink>
                        <NavLink
                            to={'/@' + currUsername}
                            className={`text-decoration Sign-up ${activeLink === 'Signup' ? 'active' : ''}`}
                            onClick={() => handleNavLinkClick('')}
                        >      
                            <img src="https://api.realworld.io/images/smiley-cyrus.jpeg" className='user-pic'/>{currUsername}
                        </NavLink>
                        {/* <button onClick={handleLogout}>logout</button> */}
                    </div>)}

                </Col>
            </Row>
        </nav>
    );
};


export default Header;
