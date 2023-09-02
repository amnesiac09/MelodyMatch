import React from 'react';
import Logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';

const Intro = () => {

    const navigate = useNavigate()

    return (
        <div id='intro'>
            <img src={Logo} />
            <h2>this website is created to introduce musicians by sharing their skills</h2>
            <button onClick={() => navigate("/explore")}>Get Started</button>
        </div>
    )
};

export default Intro;