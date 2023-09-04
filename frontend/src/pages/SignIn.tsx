import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import * as api from '../api/api'
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../redux/actions/userActions';

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

    const [error, setError] = useState("")
    const [state, setState] = useState({
        email: "",
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
            id: 0,
            email: state.email,
            password: state.password,
        }
        try {
            setError("")
            // const res = await api.loginUser(data)
            // if(res.data) {
            await dispatch(logInUser({
                "id": 21,
                "username": "mirzashvilisaba21",
                "password": "1",
                "name": "aleko",
                "email": "sw@gmail.com",
                "bio": "",
                "likedUsers": [],
                "matchedUsers": [],
                "mediaFilenames": [],
                "newMatchedUsersCount": 0
            }) as any);
            navigate("/explore")
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
            let res = await api.getMatchedUsers((userInfo as any).username);
            res.data = [2]
            if(res.data.length > 0) {
                setNewMatchesAmount(res.data.length)
                setNewMatchesPopupVisible(true)
            }
        }, 1500)

    }, [userInfo])

    return (
        <div id='sign_in'>
            <h1 className='title'>Login</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <div className='usernameOrEmail'>
                    <label htmlFor="usernameOrEmail">Username or Email</label>
                    <input type="text" name="email" id="usernameOrEmail" required
                           value={state.email}
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

            <a href="/forget-password">Lost your password?</a>

            <a href="/registration">Register</a>
        </div>
    )
};

export default SignIn;