import React from 'react';
import Close from '../assets/images/close.png'
import { useSelector } from 'react-redux';

const NavbarPopup: React.FC<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}> = ({
          setVisible
      }) => {

    const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

    return (
        <nav id='navbar_popup' className={`${isLoggedIn ? 'loggedIn' : ''}`} >
            <button onClick={() => setVisible(false)}>
                <img src={Close} />
            </button>
            <div className='links'>
                <ul>
                    <li>
                        <a href="/profile">Profile</a>
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