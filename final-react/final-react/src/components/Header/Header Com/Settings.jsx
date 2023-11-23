import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../Header CSS/Settings.css"

const Settings = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const [currEmail, setCurrEmail] = useState("");
    const [currUsername, setCurrUsername] = useState("");
    const [currImage, setCurrImage] = useState("");
    const [currBio, setCurrBio] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [currToken, setCurrToken] = useState("");

    const nav = useNavigate();

    const handleNavLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleLogout = () => {
        localStorage.removeItem("currEmail");
        localStorage.removeItem("currUsername");
        localStorage.removeItem("currToken");
        localStorage.removeItem("currPassword");
        localStorage.removeItem("currBio");
        localStorage.removeItem("currImage");
        nav("/");
        window.location.reload();
    };

    useEffect(() => {
        setCurrEmail(localStorage.getItem("currEmail"));
        setCurrUsername(localStorage.getItem("currUsername"));
        setCurrImage(localStorage.getItem("currImage"));
        setCurrToken(localStorage.getItem("currToken"));
        setCurrBio(localStorage.getItem("currBio"));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currToken}`,
                },
            };
            const updatedUser = {
                email: currEmail,
                username: currUsername,
                image: currImage,
                bio: currBio,
            };

            if (currPassword) {
                updatedUser.password = currPassword;
            }
            const response = await axios.put('https://api.realworld.io/api/user', {
                user: updatedUser
            }, config);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings updated successfully!',
                });
                setCurrImage(updatedUser.image);
                setCurrUsername(updatedUser.username);
                setCurrBio(updatedUser.bio);
                setCurrEmail(updatedUser.email);
                localStorage.setItem("currImage", updatedUser.image);
                localStorage.setItem("currUsername", updatedUser.username);
                localStorage.setItem("currBio", updatedUser.bio);
                localStorage.setItem("currEmail", updatedUser.email);
                nav("/home")
            } else {
                console.error('Failed to update settings');
            }
        } catch (error) {
            console.error('Error updating settings', error);
        }
    };

    return (
        <div className='settings'>
            <h1>Your Settings</h1>
            <input type='text' value={currImage} className='ip1' onChange={(e) => setCurrImage(e.target.value)} /><br /><br />
            <input type='text' value={currUsername} className='ip2' onChange={(e) => setCurrUsername(e.target.value)} /><br /><br />
            <textarea value={currBio} className='texta' onChange={(e) => setCurrBio(e.target.value)}></textarea><br /><br />
            <input type='text' value={currEmail} className='ip2' onChange={(e) => setCurrEmail(e.target.value)} /><br /><br />
            <input type='text' placeholder='New Password' className='ip2' /><br /><br />
            <button className='text-white btnSetting' onClick={handleUpdate}>Update Settings</button><br /><br />
            <button onClick={handleLogout} className='btn btn-outline-danger btnLogout'>Or click here to log out.</button>
        </div>
    );
};

export default Settings;
