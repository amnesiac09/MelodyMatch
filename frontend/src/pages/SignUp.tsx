import React, { MutableRefObject, useRef, useState } from 'react';
import * as api from '../api/api'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { addUser } from '../redux/actions/userActions';
import { MusicalGenres, MusicalInstrument } from '../enums/Enum';
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';
import Plus from '../assets/images/plus.png'

const SignUp = () => {
    const {userInfo, isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)
    const [cookies, setCookie, removeCookie] = useCookies(['rf_token']);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(1)
    const steps: any = ['Account', 'Personal', 'Content']
    const mediaMaxAmount = 9
    const mediaContainerRef: any = useRef([]);
    const videoRef: any = useRef([]);
    const imageRef: any = useRef([]);
    const [error, setError] = useState("")
    const [state, setState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        cf_password: "",
        bio: "",
        location: "",
        gender: "",
        genre: "",
        instrument: ""
    })
    const [reservedData, setReservedData] = useState()

    const handleChange = (name: string, value: string) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(state.password !== state.cf_password) {
            return setError('Passwords do not match!')
        }

        let shouldRegister: boolean = activeStep === 2
        let isCompleted: boolean = activeStep === 3
        if(!shouldRegister) {
            if(!isCompleted) {
                setActiveStep(activeStep+1)
            } else {
                //get token
                const data = {
                    username: (reservedData as any).username,
                    password: (state).password
                }
                await api.loginUser(data).then(res => {
                    if(res.data) {
                        const rf_token = res.data
                        setCookie('rf_token', rf_token)
                        dispatch(addUser(reservedData) as any)
                    }
                })
                //
            }
        } else {
            const data = {
                id: 0,
                username: state.username,
                password: state.password,
                name: state.name,
                gender: state.gender,
                location: state.location,
                email: state.email,
                bio: state.bio,
                likedUsers: [

                ],
                matchedUsers: [

                ],
                mediaFilenames: [

                ],
                musicalInstruments: [
                    state.instrument
                ],
                musicalGenres: [
                    state.genre
                ],
                newMatchedUsersCount: 0
            }
            try {
                // setError("")
                await api.addUser(data).then((res) => {
                    if(res.data) {
                        setReservedData(res.data)
                        setActiveStep(activeStep+1)
                        // dispatch(addUser(res.data) as any);
                    }
                })
            } catch (err: any) {
                // setError("Something went wrong!")
            }
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent) => {
        let target = e.target as HTMLInputElement
        let file = (target as any).files[0]
        let uploadedContentAmount: number = videoRef.current.filter((item: HTMLImageElement) => item.currentSrc !== "").length + imageRef.current.filter((item: HTMLImageElement) => item.currentSrc !== "").length

        let isVideo = file.type.startsWith('video')
        mediaContainerRef.current[uploadedContentAmount].classList.add(isVideo ? 'isVideo' : 'isImage')

        if(isVideo) {
            videoRef.current[uploadedContentAmount].src = URL.createObjectURL(file)
        } else {
            imageRef.current[uploadedContentAmount].src = URL.createObjectURL(file)
        }
        mediaContainerRef.current[uploadedContentAmount].classList.add('uploaded')

        const formData = new FormData();
        formData.append("file", (target as any).files[0]);

        await api.uploadFile((reservedData as any).id, formData)
    }

    const handleFileDelete = () => {

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
            {activeStep === 1 ?
                <div>
                    <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                        <div className='full_name'>
                            <p className='required'>Full Name</p>
                            <div>
                                <div>
                                    <label htmlFor="firstName">Enter Name</label>
                                    <input type="text" name="name" id="firstName" required
                                           value={state.name}
                                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='email'>
                            <p className='required'>Email</p>
                            <div>
                                <div>
                                    <label htmlFor="email">Enter Email</label>
                                    <input type="email" name="email" id="email" required
                                           value={state.email}
                                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='password'>
                            <p className='required'>Password</p>
                            <div>
                                <div>
                                    <label htmlFor="password">Enter Password</label>
                                    <input type="password" name="password" id="password" required
                                           value={state.password}
                                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" name="cf_password" id="confirmPassword" required
                                           value={state.cf_password}
                                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='city'>
                            <p className='required'>City</p>
                            <div>
                                <div>
                                    <select name="location" id="" required
                                            value={state.location}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    >
                                        <option disabled selected hidden value="">Select...</option>
                                        <option value="tbilisi">Tbilisi</option>
                                        <option value="gori">Gori</option>
                                        <option value="batumi">Batumi</option>
                                        <option value="xashuri">Xashuri</option>
                                        <option value="kutaisi">Kutaisi</option>
                                        <option value="telavi">Telavi</option>
                                        <option value="poti">Poti</option>
                                        <option value="chiatura">Chiatura</option>
                                        <option value="kobuleti">Kobuleti</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='usernameAndNumber'>
                            <p className='required'>Username</p>
                            <div>
                                <div>
                                    <label htmlFor="username">Enter Username</label>
                                    <input type="text" name="username" id="username" required
                                           value={state.username}
                                           onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='gender'>
                            <p className='required'>Gender</p>
                            <div>
                                <div>
                                    <select name="gender" id="" required
                                            value={state.gender}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    >
                                        <option disabled selected hidden value="">Select...</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='terms'>
                            <input type="checkbox" id='terms' required/>
                            <label htmlFor="terms" className='required'>I agree to the MelodyMatch rules policy.</label>
                        </div>
                        {error && <p className='error'>{error}</p>}

                        <button>Submit</button>
                    </form>
                </div>
                : activeStep === 2 ?
                    <div>
                        <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                            <div className='yourPassions'>
                                <p className='required'>Favorite Musical Genre</p>
                                <div>
                                    <div>
                                        <select name="genre" id="genre" required
                                                value={state.genre}
                                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        >
                                            <option  selected hidden value="">Select Genre...</option>
                                            {(Object.values(MusicalGenres) as Array<keyof typeof MusicalGenres>).map((item) => {
                                                return(
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='someonePassions'>
                                <p className='required'>Favorite Musical Instrument</p>
                                <div>
                                    <div>
                                        <select name="instrument" id="instrument" required
                                                value={state.instrument}
                                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        >
                                            <option  selected hidden value="">Select Instrument...</option>
                                            {(Object.values(MusicalInstrument) as Array<keyof typeof MusicalInstrument>).map((item) => {
                                                return(
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='bio'>
                                <p className='required'>Bio</p>
                                <textarea name="bio" id="bio" placeholder='Write What You Want...' required
                                          value={state.bio}
                                          onChange={(e) => handleChange(e.target.name, e.target.value)}
                                ></textarea>
                            </div>
                            <button>Submit</button>
                        </form>
                    </div>
                    :
                    <div>
                        <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                            <div className='yourPassions'>
                                <p className='required'>Upload 2 or more videos</p>
                                <div className='videoContainer'>
                                    {[...Array(mediaMaxAmount)].map((i: number, index: number) => {
                                        return (
                                            <div ref={el => mediaContainerRef.current[index] = el}>
                                                <label htmlFor="file" className="custom-file-upload">
                                                    <img
                                                        src=""
                                                        key={index}
                                                        ref={el => imageRef.current[index] = el}
                                                    />
                                                    <video
                                                        autoPlay
                                                        key={index}
                                                        ref={el => videoRef.current[index] = el}
                                                    >

                                                    </video>
                                                </label>
                                                <input type="file" id='file' onChange={(e: React.ChangeEvent) => handleFileUpload(e)} />
                                                <img className='addFile' src={Plus} />
                                                <img className='deleteFile' src={Plus} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button>Complete</button>
                        </form>
                    </div>
            }

        </div>
    )
};

export default SignUp;
