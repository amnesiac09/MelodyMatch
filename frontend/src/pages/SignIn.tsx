import React from 'react';

const SignIn = () => {

    return (
        <div id='sign_in'>
            <h1 className='title'>Login</h1>
            <form action="">
                <div className='usernameOrEmail'>
                    <label htmlFor="usernameOrEmail">Username or Email</label>
                    <input type="text" name="usernameOrEmail" id="usernameOrEmail" required/>
                </div>
                <div className='password'>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>

                <button>Login</button>
            </form>

            <a href="/forget-password">Lost your password?</a>

            <a href="/registration">Register</a>
        </div>
    )
};

export default SignIn;