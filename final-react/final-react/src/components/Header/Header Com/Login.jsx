import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Header CSS/Login.css"
import Swal from 'sweetalert2';

const Login = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                Swal.fire({
                    position: "top-mid",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                nav("/");
                localStorage.setItem("currEmail", user.email);
                localStorage.setItem("currPassword", user.password);
                localStorage.setItem("currToken", user.token);
                localStorage.setItem("currUsername", user.username);
                localStorage.setItem("currImage", user.image);
                localStorage.setItem("currBio", user.bio);
                window.location.reload();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login fail!',
                });
                if (errors) {
                    console.error("Login errors:", errors);
                }
                
            }
        } catch (error) {
            console.error("Error during login:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login fail!',
            });
        }
        setEmail("");
        setPassword("");
    };
    return (
        <div className="d-flex justify-content-center">
            <div style={{ width: "600px" }}>
                <div className="card-header text-center">
                    <h2 className='font-size'>Sign in</h2>
                    <Link to='/register'className='Need-css'>Need an account?</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-left Emailcss">
                            {/* <label htmlFor="email">Email:</label> */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-left">
                            {/* <label htmlFor="password">Password:</label> */}
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
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;