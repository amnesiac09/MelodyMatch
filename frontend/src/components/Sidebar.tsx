import React, {useState, useEffect} from 'react';
import Logo from '../assets/images/logo.png'
import Nav from '../assets/images/navigation.png'
import Message from '../assets/images/message.png'
import Search from '../assets/images/search.png'
import {NavbarPopup, NewMatchesPopup} from '../components'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from '../api/api'

const Sidebar: React.FC<{
    newMatchesPopupVisible: boolean,
    setNewMatchesPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
    newMatchesAmount: number
}> = ({
          newMatchesPopupVisible,
          setNewMatchesPopupVisible,
          newMatchesAmount
      }) => {

    const [navbarPopupVisible, setNavbarPopupVisible] = useState(false)
    const [matchedUsers, setMatchedUsers] = useState([])

    const {isLoggedIn, userInfo} = useSelector((state: RootState) => state.UsersReducer)

    const navigate = useNavigate()
    const location = useLocation()

    const centerViews = ['explore', 'messages']
    const [centerView, setCenterView] = useState(centerViews[0])

    // const [isViewAs, setIsViewAs] = useState(false)

    useEffect(() => {
        // execute on location change
        // setIsViewAs(false)
        if(location.pathname === '/chat') {
            const getMatchedUsers = async () => {
                let res = await api.getMatchedUsers((userInfo as any).username)
                return res
            }
            try {
                let res: any = getMatchedUsers().then((res) => {
                    setMatchedUsers(res.data)
                })
            } catch(e) {
                console.log(e)
            }
        }
    }, [location]);

    useEffect(() => {
        // alert()
        // alert()
        // window.setTimeout(async () => {
        //   let res = await api.getMatchedUsers((userInfo as any).username);
        //   if(res.data.length === 0) {
        //     setNewMatchesAmount(res.data)
        //     setNewMatchesPopupVisible(true)
        //   }
        // }, 1500)
    }, [userInfo])



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
                        <button onClick={() => setNavbarPopupVisible(true)}>
                            <img src={Nav} />
                        </button>
                    </div>
                    <a href="/">
                        <img src={Logo} />
                    </a>
                </div>

                {(isLoggedIn && matchedUsers)  &&

                    <div className='center_part'>
                        {
                            centerView === 'explore' ?
                                <></>
                                // <button onClick={() => {setIsViewAs(!isViewAs)}}>
                                //   {!isViewAs ? 'view as' : 'exit view as'}
                                // </button>
                                : <div className='messagesContainer'>
                                    {/* {
                matchedUsers.map((item: any) => {
                  return (
                    <div>
                      <p>{item.username}</p>
                      <p>{item.lastMessage.senderUsername === (userInfo as any).username ? '↪' : '↩'} {item.lastMessage}</p>
                    </div>
                  )
                })
              } */}
                                    <div className='active'>
                                        <p>Maryam</p>
                                        <p>↩ Great, what about your musical career?</p>
                                    </div>
                                    <div>
                                        <p>Zura</p>
                                        <p>↪ Thanks a lot</p>
                                    </div>
                                    <div>
                                        <p>Ketevan</p>
                                        <p>Tap to send message</p>
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

            {navbarPopupVisible && <NavbarPopup setVisible={setNavbarPopupVisible} />}
            {console.log(newMatchesPopupVisible, newMatchesAmount) }
            {(newMatchesPopupVisible && newMatchesAmount > 0) && <NewMatchesPopup setVisible={setNewMatchesPopupVisible} newMatchesAmount={newMatchesAmount} />}
        </>
    )
};

export default Sidebar;