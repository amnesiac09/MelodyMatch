import React, {useState, useEffect} from 'react';
import Logo from '../assets/images/logo.png'
import Nav from '../assets/images/navigation.png'
import Message from '../assets/images/message.png'
import Search from '../assets/images/search.png'
import {NavbarPopup, NewMatchesPopup} from '../components'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from '../api/api'
import { filterUsers, logOutUser, setActiveUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { MusicalGenres, MusicalInstrument } from '../enums/Enum';
import { useCookies } from 'react-cookie';

const Sidebar: React.FC<{
    newMatchesPopupVisible: boolean,
    setNewMatchesPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
    newMatchesAmount: number
}> = ({
          newMatchesPopupVisible,
          setNewMatchesPopupVisible,
          newMatchesAmount
      }) => {

    const [cookies, setCookie, removeCookie] = useCookies(['rf_token']);

    const [navbarPopupVisible, setNavbarPopupVisible] = useState(false)
    const [matchedUsers, setMatchedUsers] = useState([])
    const [filterState, setFilterState] = useState({
        nickname: "",
        genre: undefined,
        instrument: undefined
    })

    const {isLoggedIn, userInfo, activeUser} = useSelector((state: RootState) => state.UsersReducer)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const [pathname, setPathname] = useState('')



    // const centerViews = ['explore', 'messages']
    // const [centerView, setCenterView] = useState(centerViews[0])

    // const [isViewAs, setIsViewAs] = useState(false)

    useEffect(() => {
        // execute on location change
        // setIsViewAs(false)
        setPathname(location.pathname)

        if(location.pathname === '/chat' && isLoggedIn) {
            const getMatchedUsers = async () => {
                let res = await api.getMatchedUsers((userInfo as any).username)
                return res
            }
            try {
                getMatchedUsers().then((res) => {
                    setMatchedUsers(res.data)
                    setActiveUser(matchedUsers[0])
                    dispatch(setActiveUser(matchedUsers[0]) as any)
                })
            } catch(e) {
                console.log(e)
            }
        }
    }, [location]);

    const handleLogOut = () => {
        removeCookie("rf_token")
        dispatch(logOutUser() as any)
    }


    const handleChange = (name: string, value: string) => {
        setFilterState({
            ...filterState,
            [name]: value
        })
    }

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            musicalGenres: [
                filterState.genre
            ],
            musicalInstruments: [
                filterState.instrument
            ]
        }
        dispatch(filterUsers(data) as any)
    }

    const handleReset = () => {
        setFilterState({
            ...filterState,
            genre: null,
            instrument: null
        } as any)
        dispatch(filterUsers(null) as any)
    }


    return (
        <>
            <aside id='sidebar' className={`${isLoggedIn ? 'loggedIn' : ''}`}>
                <div className='top_part'>
                    <div className='buttons'>
                        { isLoggedIn &&
                            <>
                                <button onClick={() => {navigate('/explore'); }}>
                                    <img src={Search} />
                                </button>
                                <button onClick={() => {navigate('/chat'); }}>
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
                <div className='center_part'>
                    {
                        (location.pathname === '/explore' && isLoggedIn) ?
                            <form className='filters' onSubmit={(e) => handleFilter(e)} onReset={() => handleReset()}>
                                <p>Filters</p>
                                <div>
                                    <select name="genre" id=""
                                            value={filterState.genre}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    >
                                        <option  selected hidden value="">Select Genre...</option>
                                        {(Object.values(MusicalGenres) as Array<keyof typeof MusicalGenres>).map((item) => {
                                            return(
                                                <option value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <select name="instrument" id=""
                                            value={filterState.instrument}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    >
                                        <option  selected hidden value="">Select Instrument...</option>
                                        {(Object.values(MusicalInstrument)).map((item) => {
                                            return(
                                                <option value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button type='submit'>filter</button>
                                <button type='reset'>reset</button>
                            </form>
                            : (location.pathname === '/chat' && isLoggedIn) ? <div className='messagesContainer'>
                                    {
                                        matchedUsers.length > 0 && matchedUsers.map((item: any) => {
                                            console.log(item)
                                            return (
                                                <div onClick={() => dispatch(setActiveUser(item) as any)} className={`${item.matchedUser.id === (activeUser as any)?.matchedUser.id ? 'active' : ''}`}>
                                                    <p>{item.matchedUser.username}</p>
                                                    <p>{item.lastMessage?.senderUsername === (userInfo as any).username ? '↩' : '↪'} {item.lastMessage?.messageContent ? item.lastMessage?.messageContent : 'Tap to send message'}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : <></>
                    }
                </div>

                <div className='bottom_part'>
                    <div>
                        <button>
                            <a href={isLoggedIn ? "/profile" : "/login"}>
                                {isLoggedIn ? "profile" : "log in"}
                            </a>
                        </button>
                        {
                            isLoggedIn && <button onClick={() => handleLogOut()}>log out</button>
                        }
                    </div>
                </div>
            </aside>

            {navbarPopupVisible && <NavbarPopup setVisible={setNavbarPopupVisible} />}
            {(newMatchesPopupVisible && newMatchesAmount > 0) && <NewMatchesPopup setVisible={setNewMatchesPopupVisible} newMatchesAmount={newMatchesAmount} />}
        </>
    )
};

export default Sidebar;