import React, { MutableRefObject, useRef, useState } from 'react';
import * as api from '../api/api'
import { editUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const {userInfo, isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

    const [activeContent, setActiveContent] = useState('Account')
    const contents: Array<string> = ['Account', 'Personal', 'Content']

    const [contentState, setContentState] = useState({
        video1: "",
        video2: "",
        video3: "",
        video4: "",
        video5: "",
        video6: "",
        video7: "",
        video8: "",
        video9: "",
    })
    const videoMaxAmount = 9

    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleUpload = async (e: React.ChangeEvent) => {
        // e.preventDefault()
        // setVideosUploadedAmount(videosUploadedAmount+1)
        let target = e.target as HTMLInputElement
        // let activeDiv = ref.current.querySelector(`div:nth-child(${videosUploadedAmount + 1})`) as HTMLDivElement
        // let imgTag = activeDiv.querySelector('img') as HTMLImageElement
        // activeDiv.classList.add('active')
        // setSelectedFile((target as any).files[0])

        let uploadedImagesAmount: number = Object.values(contentState).filter(item => item !== "").length + 1
        console.log(uploadedImagesAmount)

        setContentState({
            ...contentState,
            [target.name]: URL.createObjectURL((target as any).files[0])
        })

        const formData = new FormData();
        formData.append("selectedFile", (target as any).files[0]);

        console.log(target.name)

        api.uploadFile((userInfo as any).id, formData)

        // const data = {
        //     "id": 7,
        //     "username": "7",
        //     "password": "222222222",
        //     "name": "s",
        //     "gender": "MALE",
        //     "location": "strdasding",
        //     "email": "stng",
        //     "bio": "string",
        //     "likedUsers": [
        //         0
        //     ],
        //     "matchedUsers": [
        //         0
        //     ],
        //     "mediaFilenames": [
        //         (target as any).files[0]
        //     ],
        //     "musicalInstruments": [
        //         "GUITAR"
        //     ],
        //     "musicalGenres": [
        //         "ROCK"
        //     ],
        //     "newMatchedUsersCount": 0
        // }

        // await api.editUser(data).then((res) => {
        //     if(res.data) {
        //         console.log(res.data)
        //     //   dispatch(editUser(res.data) as any);
        //     }
        // })
    }

    return (
        <div id='profile'>
            <div className='leftPanel'>
                {contents.map((item: string) => {
                    return (
                        <p onClick={() => {setActiveContent(item)}} className={activeContent === item ? 'active' : ''}>{item} Details</p>
                    )
                })}
            </div>
            <div className='rightPanel'>
                { activeContent === contents[0] ?
                    <div>
                        <h1 className='title'>Account Details</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
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
                                        <label htmlFor="email">Edit Email</label>
                                        <input type="email" name="email" id="email" required/>
                                    </div>
                                </div>
                            </div>
                            <div className='password'>
                                <p className='required'>Password</p>
                                <div>
                                    <div>
                                        <label htmlFor="password">Edit Password</label>
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
                                        <select name="city" id="" required>
                                            <option disabled selected hidden value="">Select...</option>
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
                            <div className='gender'>
                                <p className='required'>Gender</p>
                                <div>
                                    <div>
                                        <select name="gender" id="" required>
                                            <option disabled selected hidden value="">Select...</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='date'>
                                <p className='required'>Date Of Birth</p>
                                <div>
                                    <div>
                                        <input placeholder='DD' type="number" name="day" required min={1} max={31} />
                                    </div>
                                    <div>
                                        <input placeholder='MM' type="number" name="month" required min={1} max={12}/>
                                    </div>
                                    <div>
                                        <input placeholder='YYYY' type="number" name="year" required min={1900} max={new Date().getFullYear()}/>
                                    </div>
                                </div>
                            </div>
                            <button>Save</button>
                        </form>
                    </div>
                    : activeContent === contents[1] ?
                        <div>
                            <h1 className='title'>Personal Details</h1>
                            <form onSubmit={(e) => handleSubmit(e)}>
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
                                <button>Save</button>
                            </form>
                        </div> :
                        <div>
                            <h1 className='title'>Content Details</h1>
                            <form>
                                <div className='yourPassions'>
                                    <p className='required'>Upload 2 or more videos</p>
                                    <div className='videoContainer' ref={ref}>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video1}/>
                                            </label>
                                            <input type="file" id='file' name='video1' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video2}/>
                                            </label>
                                            <input type="file" id='file' name='video2' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video3}/>
                                            </label>
                                            <input type="file" id='file' name='video3' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video4}/>
                                            </label>
                                            <input type="file" id='file' name='video4' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video5}/>
                                            </label>
                                            <input type="file" id='file' name='video5' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video6}/>
                                            </label>
                                            <input type="file" id='file' name='video6' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video7}/>
                                            </label>
                                            <input type="file" id='file' name='video7' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video8}/>
                                            </label>
                                            <input type="file" id='file' name='video8' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="file" className="custom-file-upload">
                                                <img src={contentState.video9}/>
                                            </label>
                                            <input type="file" id='file' name='video9' onChange={(e: React.ChangeEvent) => handleUpload(e)}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
};

export default Profile;