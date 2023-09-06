import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/userActions';
import logo from './assets/images/logo.png'

import {
  Intro,
  Profile,
  SignUp,
  SignIn,
  NotFound,
  Explore,
  Chat
} from "./pages"
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import {
  Sidebar,
  Footer
} from "./components"
import { logInUser } from './redux/actions/userActions';
import * as api from './api/api'
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";

function App() {

  const {isLoggedIn, userInfo} = useSelector((state: RootState) => state.UsersReducer)
  const [cookies, setCookie, removeCookie] = useCookies(['rf_token']);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(logInUser({}) as any)
    if(!isLoggedIn) {
      if(location.pathname === '/profile' || location.pathname === '/chat' || location.pathname === '/explore') {
        navigate('/login')
      }
    } else {
      if(location.pathname === '/login' || location.pathname === '/registration') {
        navigate('/profile')
      }
    }
  }, [location])

  const [newMatchesPopupVisible, setNewMatchesPopupVisible] = useState(false)
  const [newMatchesAmount, setNewMatchesAmount] = useState(0)


  useEffect(() => {
    const getUserInfo = async () => {
      if(cookies.rf_token && (cookies.rf_token !== "")) {
        const decoded = jwt_decode(cookies.rf_token);
        await api.getUser((decoded as any).sub).then((res) => {
          dispatch(logInUser(res.data) as any);
          window.setTimeout(async () => {
            if(res.data.newMatchedUsersCount > 0) {
              setNewMatchesAmount(res.data.newMatchedUsersCount)
              setNewMatchesPopupVisible(true)
            }
          }, 1500)
        })
      }
    }
    getUserInfo()

  }, [dispatch]);


  return (
      <>
        <div className={`routes ${isLoggedIn ? 'loggedIn' : ''}`}>
          <Routes>
            <Route path="/" element={<Intro />}/>
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <SignIn setNewMatchesPopupVisible={setNewMatchesPopupVisible} setNewMatchesAmount={setNewMatchesAmount}/>}/>
            <Route path="/registration" element={!isLoggedIn ? <SignUp /> : <Profile /> }/>
            <Route path="/login" element={!isLoggedIn ? <SignIn setNewMatchesPopupVisible={setNewMatchesPopupVisible} setNewMatchesAmount={setNewMatchesAmount}/> : <Profile />}/>
            <Route path="/explore" element={isLoggedIn ? <Explore /> : <SignIn setNewMatchesPopupVisible={setNewMatchesPopupVisible} setNewMatchesAmount={setNewMatchesAmount}/>}/>
            <Route path="/chat" element={isLoggedIn ? <Chat /> : <SignIn setNewMatchesPopupVisible={setNewMatchesPopupVisible} setNewMatchesAmount={setNewMatchesAmount}/>}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
        {
            location.pathname !== '/' && <>
              <Sidebar newMatchesPopupVisible={newMatchesPopupVisible} setNewMatchesPopupVisible={setNewMatchesPopupVisible} newMatchesAmount={newMatchesAmount} />
              {location.pathname !== '/explore' && location.pathname !== '/chat' && <Footer />}
            </>
        }

      </>
  );
}

export default App;