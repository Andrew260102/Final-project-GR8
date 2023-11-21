import React, { useState } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import "../Header/Header CSS/Header.css";

const Header = () => {
    const [activeLink, setActiveLink] = useState('Home');

    const handleNavLinkClick = (link) => {
        setActiveLink(link);
    };

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
                </Col>
            </Row>
        </nav>
    );
};

export default Header;
