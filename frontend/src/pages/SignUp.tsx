import React from 'react';

const SignUp = () => {

    return (
        <div id='sign_up'>
            <h1 className='title'>Registration</h1>
            <form action="">
                <div className='full_name'>
                    <p className='required'>Full Name</p>
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" id="firstName" required/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" id="lastName" required/>
                        </div>
                    </div>
                </div>
                <div className='email'>
                    <p className='required'>Email</p>
                    <div>
                        <div>
                            <label htmlFor="email">Enter Email</label>
                            <input type="email" name="email" id="email" required/>
                        </div>
                    </div>
                </div>
                <div className='password'>
                    <p className='required'>Password</p>
                    <div>
                        <div>
                            <label htmlFor="password">Enter Password</label>
                            <input type="password" name="password" id="password" required/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" required/>
                        </div>
                    </div>
                </div>
                <div className='usernameAndNumber'>
                    <div>
                        <div>
                            <label htmlFor="username" className='required'>Username</label>
                            <input type="text" name="username" id="username" required/>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input placeholder='e.g. +99555123456' type="tel" name="phoneNumber" id="phoneNumber" />
                        </div>
                    </div>
                </div>
                <div className='date'>
                    <p className='required'>Date Of Birth</p>
                    <div>
                        <div>
                            <input placeholder='DD' type="text" name="day" required/>
                        </div>
                        <div>
                            <input placeholder='MM' type="text" name="month" required/>
                        </div>
                        <div>
                            <input placeholder='YYYY' type="text" name="year" required/>
                        </div>
                    </div>
                </div>
                <div className='terms'>
                    <input type="checkbox" id='terms' required/>
                    <label htmlFor="terms" className='required'>I agree to the MelodyMatch rules policy.</label>
                </div>

                <button>Register</button>
            </form>
        </div>
    )
};

export default SignUp;