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

function App() {

  const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
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