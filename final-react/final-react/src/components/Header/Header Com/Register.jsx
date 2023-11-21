import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || email === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }
        try {
            // const checkResponse = await axios.get(`https://api.realworld.io/api/users?email=${email}&username=${username}`);
            // const existingUser = checkResponse.data.users; 

            // if (existingUser && existingUser.length > 0) {
            //     alert("Email or username is already taken");
            //     return;
            // }
            const registerResponse = await axios.post("https://api.realworld.io/api/users", {
                user: {
                    username,
                    email,
                    password
                }
            });
            const { user, errors } = registerResponse.data;
            if (user) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/login");
            } else {
                alert("Registration failed");
                if (errors) {
                    console.error("Registration errors:", errors);
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed");
        }

        setUsername("");
        setEmail("");
        setPassword("");
    };


    return (
        <div className="d-flex justify-content-center">
            <div className="card" style={{ width: "600px" }}>
                <div className="card-header text-center">
                    <h2>Sign up</h2>
                    <Link to='/login' style={{ color: "#ccda8d", textDecoration: "none" }}>Have an account?</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-left">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ float: "right", marginTop: "20px" }}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
