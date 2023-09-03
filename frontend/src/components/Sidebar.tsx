import React, {useState, useEffect} from 'react';
import Logo from '../assets/images/logo.png'
import Nav from '../assets/images/navigation.png'
import Message from '../assets/images/message.png'
import Search from '../assets/images/search.png'
import NavbarPopup from './NavbarPopup'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [modalVisible, setModalVisible] = useState(false)

    const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

    const navigate = useNavigate()
    const location = useLocation()

    const centerViews = ['explore', 'messages']
    const [centerView, setCenterView] = useState(centerViews[0])

    const [isViewAs, setIsViewAs] = useState(false)

    useEffect(() => {
        // execute on location change
        setIsViewAs(false)
    }, [location]);

    return (
        <>
            <aside id='sidebar' className={`${isLoggedIn ? 'loggedIn' : ''}`}>
                <div className='top_part'>
                    <div className='buttons'>
                        { isLoggedIn &&
                            <>
                                <button onClick={() => {navigate('/explore'); setCenterView(centerViews[0]);}}>
                                    <img src={Search} />
                                </button>
                                <button onClick={() => {navigate('/chat'); setCenterView(centerViews[1]);}}>
                                    <img src={Message} />
                                </button>
                            </>
                        }
                        <button onClick={() => setModalVisible(true)}>
                            <img src={Nav} />
                        </button>
                    </div>
                    <a href="/">
                        <img src={Logo} />
                    </a>
                </div>

                {isLoggedIn &&
                    <div className='center_part'>
                        {centerView === 'explore' ? <button onClick={() => {setIsViewAs(!isViewAs)}}>
                                {!isViewAs ? 'view as' : 'exit view as'}
                            </button>
                            : <div className='messagesContainer'>
                                <div>
                                    <p>Maryam</p>
                                    <p>↩ How are you?</p>
                                </div>
                                <div>
                                    <p>Maryam</p>
                                    <p>↪ How are you?</p>
                                </div>
                                <div>
                                    <p>Maryam</p>
                                    <p>↪ How are you?</p>
                                </div>
                                <div>
                                    <p>Maryam</p>
                                    <p>↪ How are you?</p>
                                </div>
                            </div> }
                    </div>}

                <div className='bottom_part'>
                    <div>
                        <button>
                            <a href={isLoggedIn ? "/profile" : "/login"}>
                                {isLoggedIn ? "profile" : "log in"}
                            </a>
                        </button>
                        {
                            isLoggedIn && <button>log out</button>
                        }
                    </div>
                </div>
            </aside>

            {modalVisible && <NavbarPopup setVisible={setModalVisible} />}
        </>
    )
};

export default Sidebar;