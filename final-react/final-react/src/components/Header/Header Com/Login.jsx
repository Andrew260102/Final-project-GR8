import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Please enter values for email and password");
            return;
        }
        try {
            const response = await axios.post("https://api.realworld.io/api/users/login", {
                user: {
                    email,
                    password
                }
            });

            const { user, errors } = response.data;
           
            if (user) {
                alert("User logged in!");
                nav("/");
                sessionStorage.setItem("currEmail", user.email);
                sessionStorage.setItem("currPassword", user.email);
            } else {
                alert("Login failed");
                if (errors) {
                    console.error("Login errors:", errors);
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed");
        }
        setEmail("");
        setPassword("");
    };


    return (
        <div className="d-flex justify-content-center">
            <div className="card" style={{ width: "600px" }}>
                <div className="card-header text-center">
                    <h2>Sign in</h2>
                    <Link to='/register' style={{ color: "#ccda8d", textDecoration: "none" }}>Need an account?</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-left">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Email'
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{ float: "right", marginTop: "20px" }}
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;