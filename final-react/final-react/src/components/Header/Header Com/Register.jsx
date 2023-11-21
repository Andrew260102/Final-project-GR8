import React from 'react';
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="card" style={{ width: "600px" }}>
                <div className="card-header text-center">
                    <h2>Sign up</h2>
                    <Link to='/login' style={{ color: "#ccda8d", textDecoration:"none" }}>Have an account?</Link>
                </div>
                <div className="card-body">
                    <form >
                        <div className="form-group text-left">
                            <label htmlFor="Username" >
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                //   pattern="[a-zA-Z0-9]{5,}"
                                placeholder='Username'
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="Email" >
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                //   pattern="[a-zA-Z0-9]{5,}"
                                placeholder='Email'
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password">
                            </label>
                            <input
                                type="password"
                                id="pass"
                                className="form-control"
                                placeholder='Password'
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            />
                        </div>
                        <button type="submit" className="btn btn-success "
                            style={{ float: "right", marginTop: "20px" }}>
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
