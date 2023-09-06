import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import * as api from '../api/api'
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../redux/actions/userActions';
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';


const SignIn: React.FC<{
    setNewMatchesPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setNewMatchesAmount: React.Dispatch<React.SetStateAction<number>>,
}> = ({
          setNewMatchesPopupVisible,
          setNewMatchesAmount
      }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {userInfo, isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)
    const [cookies, setCookie, removeCookie] = useCookies(['rf_token']);

    const [error, setError] = useState("")
    const [state, setState] = useState({
        username: "",
        password: "",
    })
    const handleChange = (name: string, value: string) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            username: state.username,
            password: state.password,
        }
        try {
            setError("")
            await api.loginUser(data).then(async (res) => {
                if(res.data) {
                    const rf_token = res.data
                    const decoded = jwt_decode(rf_token);

                    setCookie('rf_token', rf_token)

                    await api.getUser((decoded as any).sub).then((res) => {
                        dispatch(logInUser(res.data) as any);
                    })
                }
            })
            // if(res.data) {
            // }
        } catch (err: any) {
            setError("Something went wrong!")
        }
    }

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        window.setTimeout(async () => {
            if((userInfo as any).newMatchedUsersCount > 0) {
                setNewMatchesAmount((userInfo as any).newMatchedUsersCount)
                setNewMatchesPopupVisible(true)
            }
        }, 1500)

    }, [userInfo])

    return (
        <div id='sign_in'>
            <h1 className='title'>Login</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <div className='usernameOrEmail'>
                    <label htmlFor="usernameOrEmail">Username</label>
                    <input type="text" name="username" id="usernameOrEmail" required
                           value={state.username}
                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </div>
                <div className='password'>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" required
                           value={state.password}
                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button>Login</button>
            </form>

            <a href="/registration">Register</a>
        </div>
    )
};

export default SignIn;