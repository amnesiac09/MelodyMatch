import React, {useState, useEffect} from 'react';
import Logo from '../assets/images/logo.png'
import Nav from '../assets/images/navigation.png'
import NavbarPopup from './NavbarPopup'

const Sidebar = () => {

    const [modalVisible, setModalVisible] = useState(false)


    return (
        <>
            <aside id='sidebar'>
                <div className='top_part'>
                    <button onClick={() => setModalVisible(true)}>
                        <img src={Nav} />
                    </button>
                    <a href="/">
                        <img src={Logo} />
                    </a>
                </div>
                <div className='bottom_part'>
                    <button>
                        <a href="/profile">
                            account
                        </a>
                    </button>
                </div>
            </aside>

            {modalVisible && <NavbarPopup setVisible={setModalVisible} />}
        </>
    )
};

export default Sidebar;