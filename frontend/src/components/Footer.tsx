import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {

    const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

    return (
        <footer id='footer' className={`${isLoggedIn ? 'loggedIn' : ''}`}>
            <div>
                <p>© 2023 MelodyMatch LLC</p>
                <p>All rights reserved.</p>
            </div>
        </footer>
    )
};

export default Footer;