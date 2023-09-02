import React from 'react';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div id='not_found'>
            <p>404. Nothing here</p>
            <p>Sorry, but the page you are looking for does not exist.</p>
            <button onClick={() => navigate(-1)}>
                <p>Go Back</p>
            </button>
        </div>
    )
};

export default NotFound;