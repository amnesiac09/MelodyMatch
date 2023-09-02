import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/userActions';
import logo from './assets/images/logo.png'

import {
  Intro,
  Home,
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


function App() {

  const location = useLocation();

  return (
      <>
        <div className='routes'>
          <Routes>
            <Route path="/" element={<Intro />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/registration" element={<SignUp />}/>
            <Route path="/login" element={<SignIn />}/>
            <Route path="/explore" element={<Explore />}/>
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