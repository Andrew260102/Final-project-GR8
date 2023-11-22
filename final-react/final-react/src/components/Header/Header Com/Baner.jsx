import React from 'react';
import { useState, useEffect } from 'react';
import "../Header CSS/Baner.css"
import styled from 'styled-components';

const Baner = () => {
    const [currEmail, setCurrEmail] = useState("");
    useEffect(() => {
        setCurrEmail(sessionStorage.getItem("currEmail"));
    }, [sessionStorage.getItem("currEmail")]);
    return (
        <div>
            {currEmail == null ? (<div className='banner'>
                <div className='container'>
                    <h1 className='text-h1 text-font'>conduit</h1>
                    <p className='p-font'>A place to share your knowledge</p>
                </div>
            </div>) : (<p></p>)}
        </div>
    );
};

export default Baner;