import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/userActions';
import logo from './assets/images/logo.png'

import {
  Intro,
  Profile,
  SignUp,
  SignIn,
  NotFound,
  Explore
} from "./pages"
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import {
  Sidebar,
  Footer
} from "./components"
import { logInUser } from './redux/actions/userActions';


function App() {

  const {isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

  const location = useLocation();

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      let data: ILogInUserApiReq = {
        usernameOrEmail: 'dasdas',
        password: '23123'
      }
      dispatch(logInUser(data) as any)
    }, 2000)
  }, [])

  return (
      <>
        <div className={`routes ${isLoggedIn ? 'loggedIn' : ''}`}>
          <Routes>
            <Route path="/" element={<Intro />}/>
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <SignIn />}/>
            <Route path="/registration" element={!isLoggedIn ? <SignUp /> : <Profile />}/>
            <Route path="/login" element={!isLoggedIn ? <SignIn /> : <Profile />}/>
            <Route path="/explore" element={isLoggedIn ? <Explore /> : <SignIn />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
        {
            location.pathname !== '/' && <>
              <Sidebar />
              {location.pathname !== '/explore' && <Footer />}
            </>
        }
      </>
  );
}

export default App;