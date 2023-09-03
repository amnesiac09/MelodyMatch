import React, { useEffect, useRef } from 'react';
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
import { io } from 'socket.io-client';
import SockJS from "sockjs-client"

function App() {

  const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    // if(!isLoggedIn) {
    //   if(location.pathname === '/profile' || location.pathname === '/chat' || location.pathname === '/explore') {
    //     navigate('/login')
    //   }
    // } else {
    //   if(location.pathname === '/login' || location.pathname === '/registration') {
    //     navigate('/profile')
    //   }
    // }
  }, [location])


  // const socket = io.connect();
  // let a = new WebSocket("ws://localhost:8080/")

  // useEffect(() => {
  //   socket.on("receive_message", (data: any) => {
  //     console.log(data)
  //   });
  // }, [socket]);

  return (
      <>
        <div className={`routes ${isLoggedIn ? 'loggedIn' : ''}`}>
          <Routes>
            <Route path="/" element={<Intro />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/registration" element={<SignUp />}/>
            <Route path="/login" element={<SignIn />}/>
            <Route path="/explore" element={<Explore />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
        {
            location.pathname !== '/' && <>
              <Sidebar />
              {location.pathname !== '/explore' && location.pathname !== '/chat' && <Footer />}
            </>
        }
      </>
  );
}

export default App;