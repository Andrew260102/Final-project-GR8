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
        sessionStorage.removeItem("currEmail");
        sessionStorage.removeItem("currUsername");
        sessionStorage.removeItem("currToken");
        sessionStorage.removeItem("currPassword");
        nav("/")
        window.location.reload();
    };

    useEffect(() => {
        setCurrEmail(sessionStorage.getItem("currEmail"));
    }, [sessionStorage.getItem("currEmail")]);
    useEffect(() => {
        setCurrUsername(sessionStorage.getItem("currUsername"));
    }, [sessionStorage.getItem("currUsername")]);

    return (
        <nav className='padding-header'>
            <Row fluid="true">
                <Col xs={2}></Col>
                <Col xs={2} className="Font-color">
                    conduit
                </Col>
                <Col xs={5}></Col>
                <Col xs={3} className='flex '>
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
                            👤{currUsername}
                        </NavLink>
                        <button onClick={handleLogout}>logout</button>
                    </div>)}

                </Col>
            </Row>
        </nav>
    );
};

export default Header;
