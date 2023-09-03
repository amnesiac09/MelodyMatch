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
// import { io } from 'socket.io-client';
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

  // const connection = useRef<WebSocket>();
  // const shouldKeepWSAlive = useRef<boolean>(false);

  useEffect(() => {
    // Replace 'wss://your-websocket-server-url' with your WebSocket server URL
    // const socket = new WebSocket('ws://localhost:8080/ws');

    // // WebSocket event listeners
    // socket.addEventListener('open', (event) => {
    //   console.log('WebSocket connection opened:', event);
    // });

    // socket.addEventListener('message', (event) => {
    //   console.log('WebSocket message received:', event.data);
    //   // Handle incoming messages here
    // });

    // socket.addEventListener('close', (event) => {
    //   console.log('WebSocket connection closed:', event);
    // });

    // Clean up the WebSocket connection when the component unmounts
    // return () => {
    //   socket.close();
    // };
    var sock = new SockJS('http://localhost:8080/ws');
    sock.onopen = function() {
      console.log('successful');
      sock.send('test');
    };

    sock.onmessage = function(e) {
      console.log('message', e.data);
      sock.close();
    };

    sock.onclose = function(e) {
      console.log(e)
      console.log('unsuccessful');
    };
  }, []);

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