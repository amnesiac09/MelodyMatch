import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import * as api from '../api/api'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MusicalGenres, MusicalInstrument } from '../enums/Enum';
import { editUser } from '../redux/actions/userActions';
import Plus from '../assets/images/plus.png'

const Profile = () => {
    const {userInfo, isLoggedIn} = useSelector((state: RootState) => state.UsersReducer)

    const [state, setState] = useState({
        name: (userInfo as any).name,
        username: (userInfo as any).username,
        email: (userInfo as any).email,
        password: "",
        cf_password: "",
        bio: (userInfo as any).bio,
        location: (userInfo as any).location,
        gender: (userInfo as any).gender,
        genre: (userInfo as any).musicalGenres?.length > 0 && (userInfo as any).musicalGenres[0],
        instrument: (userInfo as any).musicalInstruments?.length > 0 && (userInfo as any).musicalInstruments[0],
        fileUrls: []
    })

    useEffect(() => {
        // console.log((userInfo as any).username)
        // api.getFileUrls((userInfo as any).username).then((res) => {
        //     console.log(res.data)
        //     setState({
        //         ...state,
        //         fileUrls: res.data
        //     })
        // })
    }, [])

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [activeContent, setActiveContent] = useState('Account')
    const contents: Array<string> = ['Account', 'Personal', 'Content']

    const mediaContainerRef: any = useRef([]);
    const videoRef: any = useRef([]);
    const imageRef: any = useRef([]);
    const mediaMaxAmount = 9

    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleChange = (name: string, value: string) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const navigate = useNavigate()
    const dispatch = useDispatch();

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

        await api.uploadFile((userInfo as any).id, formData)
    }

    const handleFileDelete = async (file: any) => {
        // console.log((userInfo as any).id, file)
        // await api.deleteFile()
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            "id": (userInfo as any).id,
            "username": state.username,
            "password": state.password,
            "name": state.name,
            "gender": state.gender,
            "location": state.location,
            "email": state.email,
            "bio": state.bio,
            "likedUsers": (userInfo as any).likedUsers,
            "matchedUsers": (userInfo as any).matchedUsers,
            "mediaFilenames": (userInfo as any).mediaFilenames,
            "musicalInstruments": [
                state.instrument,
            ],
            "musicalGenres": [
                state.genre,
            ],
            "newMatchedUsersCount": 0
        }

        await api.editUser(data).then((res) => {
            if(res.data) {
                dispatch(editUser(res.data) as any);
            }
        })

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
                        <form onSubmit={(e) => handleSave(e)}>
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
                            {error && <p className='errorMessage'>{error}</p>}
                            {success && <p className='successMessage'>{success}</p>}
                            <button>Save</button>
                        </form>
                    </div>
                    : activeContent === contents[1] ?
                        <div>
                            <h1 className='title'>Personal Details</h1>
                            <form onSubmit={(e: React.FormEvent) => handleSave(e)}>
                                <div className='yourPassions'>
                                    <p className='required'>Musical Genres that you love</p>
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
                                    <p className='required'>Musical Instruments that you love</p>
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
                                <button>Save</button>
                            </form>
                        </div> :
                        <div>
                            <h1 className='title'>Content Details</h1>
                            <form>
                                <div className='yourPassions'>
                                    <p className='required'>Upload 2 or more videos</p>
                                    <div className='videoContainer'>
                                        {console.log((userInfo as any).mediaFilenames)}
                                        {
                                            (userInfo as any)?.mediaFilenames.map((item: string, index: number) => {
                                                let isVideo = item.includes('mp4') || item.includes('wav')
                                                return (
                                                    <div ref={el => mediaContainerRef.current[index] = el} className={`uploaded ${isVideo ? 'isVideo' : 'isImage'}`} >
                                                        <label htmlFor="file" className="custom-file-upload">
                                                            {
                                                                !isVideo ?
                                                                    <img
                                                                        src={item}
                                                                        key={index}
                                                                        ref={el => imageRef.current[index] = el}
                                                                    />
                                                                    :
                                                                    <video
                                                                        autoPlay
                                                                        key={index}
                                                                        ref={el => videoRef.current[index] = el}
                                                                        src={item}
                                                                    >
                                                                    </video>
                                                            }
                                                        </label>
                                                        <input type="file" id='file' onChange={(e: React.ChangeEvent) => handleFileUpload(e)} />
                                                        <img className='addFile' src={Plus} />
                                                        <img className='deleteFile' src={Plus} />
                                                    </div>
                                                )
                                            })

                                        }
                                        {[...Array(mediaMaxAmount - (userInfo as any)?.mediaFilenames.length)].map((i: number, index: number) => {
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
                            </form>
                        </div>
                }
            </div>
        </div>
    )
};

export default Profile;