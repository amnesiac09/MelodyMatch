import React from 'react';
import Close from '../assets/images/close.png'

const NavbarPopup: React.FC<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}> = (
    {setVisible
    }) => {

    return (
        <nav id='navbar_popup'>
            <button onClick={() => setVisible(false)}>
                <img src={Close} />
            </button>
            <div className='links'>
                <ul>
                    <li>
                        <a href="/404">Profile</a>
                    </li>
                    <li>
                        <a href="/404">About</a>
                    </li>
                    <li>
                        <a href="/404">Contact</a>
                    </li>
                    <li>
                        <a href="/404">404</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default NavbarPopup;