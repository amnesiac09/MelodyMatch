import React, { MutableRefObject, useRef, useState } from 'react';

const SignUp = () => {

    const [activeStep, setActiveStep] = useState(3)
    const steps: any = ['Account', 'Music', 'Content']
    const [videosUploadedAmount, setVideosUploadedAmount] = useState(0)
    const videoMaxAmount = 9

    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        let isCompleted: boolean = activeStep === 3
        if(!isCompleted) {
            setActiveStep(activeStep+1)
        } else {
            alert('submit')
        }
    }

    const handleUpload = (e: React.ChangeEvent) => {
        setVideosUploadedAmount(videosUploadedAmount+1)
        let target = e.target as HTMLInputElement
        let activeDiv = ref.current.querySelector(`div:nth-child(${videosUploadedAmount + 1})`) as HTMLDivElement
        let imgTag = activeDiv.querySelector('img') as HTMLImageElement
        activeDiv.classList.add('active')
        imgTag.src = 'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_24fc451c-57cd-42a4-aced-03bc040f3201.webp'

    }

    return (
        <div id='sign_up'>
            <h1 className='title'>Registration</h1>
            <div className={`steps step${activeStep}`}>
                {
                    steps.map((item: string, index: number) => {
                        return (
                            <div className={activeStep >= index+1 ? 'active' : ''}>
                                <div>{index+1}</div>
                                <p>{item} Details</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`stepContent ${activeStep == 1 ? 'active' : ''}`}>
                <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
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
                    <div className='city'>
                        <p className='required'>City</p>
                        <div>
                            <div>
                                <select name="city" id="">
                                    <option value="tbilisi">Tbilisi</option>
                                    <option value="gori">Gori</option>
                                    <option value="batumi">Batumi</option>
                                    <option value="xashuri">Xashuri</option>
                                </select>
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

                    <button>Submit</button>
                </form>
            </div>
            <div className={`stepContent ${activeStep == 2 ? 'active' : ''}`}>
                <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                    <div className='yourPassions'>
                        <p className='required'>Passions</p>
                        <div>
                            <div>
                                <select name="city" id="">
                                    <option value="tbilisi">Guitar</option>
                                    <option value="gori">Piano</option>
                                    <option value="batumi">Violin</option>
                                    <option value="xashuri">Drum</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='someonePassions'>
                        <p className='required'>Passions you are looking for</p>
                        <div>
                            <div>
                                <select name="city" id="">
                                    <option value="tbilisi">Guitar</option>
                                    <option value="gori">Piano</option>
                                    <option value="batumi">Violin</option>
                                    <option value="xashuri">Drum</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button>Submit</button>
                </form>
            </div>
            <div className={`stepContent ${activeStep == 3 ? 'active' : ''}`}>
                <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                    <div className='yourPassions'>
                        <p className='required'>Upload 2 or more videos</p>
                        <div className='videoContainer' ref={ref}>
                            {[...Array(videoMaxAmount)].map((i: number) => {
                                return (
                                    <div>
                                        <label htmlFor="file" className="custom-file-upload">
                                            <img src=""/>
                                        </label>
                                        <input type="file" id='file' onChange={(e: React.ChangeEvent) => handleUpload(e)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button>Complete</button>
                </form>
            </div>
        </div>
    )
};

export default SignUp;