import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../Header CSS/Settings.css"

const Settings = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const [currEmail, setCurrEmail] = useState("");
    const [currUsername, setCurrUsername] = useState("");
    const [currPassword, setCurrPassword] = useState("");

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
    useEffect(() => {
        setCurrPassword(localStorage.getItem("currPassword"));
    }, [localStorage.getItem("currPassword")]);
    return (
        <div>
            <button onClick={handleLogout} className='btn btn-outline-danger'>Or click here to log out.</button>
        </div>
    );
};

export default Settings;