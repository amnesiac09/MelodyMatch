import React, { useEffect, useState } from 'react';
import GenderMan from '../assets/images/genderMan.png'
import GenderWoman from '../assets/images/genderWoman.png'
import Home from '../assets/images/home.png'
import ArrowLeft from '../assets/images/arrowLeft.png'
import ArrowRight from '../assets/images/arrowRight.png'
import Like from '../assets/images/like.png'
import Unlike from '../assets/images/unlike.png'
import Info from '../assets/images/info.png'
import ArrowDown from '../assets/images/arrowDown.png'
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../api/api'
import { connect } from 'react-redux';
import Spinner from '../assets/images/spinner.png';

const Explore = () => {

    const [activeMediaIndex, setActiveMediaIndex] = useState(0)
    const [users, setUsers] = useState([])
    const [isUserAmountCompleted, setIsUserAmountCompleted] = useState(false)

    const handleDrag = (e: React.DragEvent) => {
        console.log(e)
    }

    const [showLoading, setShowLoading] = useState(false)

    const [isInfoVisible, setIsInfoVisible] = useState(false)

    const {isLoggedIn, userInfo, filterData} = useSelector((state: RootState) => state.UsersReducer)
    const dispatch = useDispatch()

    const [activeUserId, setActiveUserId] = useState()

    useEffect(() => {
        const getUsers = async () => {
            const data = {
                nickname: (userInfo as any).username,
                musicalGenres: (filterData as any)?.musicalGenres,
                musicalInstruments: (filterData as any)?.musicalInstruments
            }
            let res = await api.getUsers(data)
            return res
        }

        setShowLoading(true)
        getUsers().then(res => {
            setUsers(res.data)
            if(res.data.length > 0) {
                setActiveUserId(res.data[0].id)
            }
            setShowLoading(false)
        })

    }, [filterData])

    const showNextUser = () => {
        let deletedItem = (users as any).find((user: any) => activeUserId === user.id)
        let indexOfNewUser = (users as any).indexOf(deletedItem) + 1

        if((users as any)[indexOfNewUser]) {
            setActiveUserId((users as any)[indexOfNewUser].id)
        } else {
            setIsUserAmountCompleted(true)
        }
    }

    const likeUser = async () => {
        await api.likeUser((userInfo as any).id, activeUserId).then(() => {
            showNextUser()
        })

    }

    const unLikeUser = () => {
        showNextUser()
    }

    return (
        <div id='explore' className={isInfoVisible ? 'isInfoVisible': ''}>
            {
                !isUserAmountCompleted ?
                    (users as any)?.map((user: any, i:number) => {
                        return(
                            <div key={i} className={`videoContainer ${(activeUserId as any) === user.id ? 'active' : ''}`} draggable onDrag={(e) => handleDrag(e)}>
                                {
                                    user.mediaFilenames.map((item: string, index:number) => {
                                        console.log(index, item)
                                        let isVideo = item.includes('mp4') || item.includes('wav')
                                        return (
                                            activeMediaIndex === index && ( !isVideo ?
                                                <img
                                                    src={item}
                                                    key={index}
                                                    // onLoad={}
                                                />
                                                :
                                                <video
                                                    autoPlay
                                                    key={index}
                                                    src={item}
                                                >
                                                </video>)
                                        )
                                    })
                                }
                                <div className='arrows'>
                                    <div onClick={() => setActiveMediaIndex(activeMediaIndex-1)} className={`arrowLeft ${activeMediaIndex !== 0 ? 'active' : ''}`}>
                                        <img src={ArrowLeft} alt="" />
                                    </div>
                                    <div onClick={() => setActiveMediaIndex(activeMediaIndex+1)} className={`arrowRight ${activeMediaIndex !== user.mediaFilenames.length - 1 ? 'active': ''}`}>
                                        <img src={ArrowRight} alt="" />
                                    </div>
                                </div>
                                <div className='bullets'>
                                    {
                                        user.mediaFilenames.map((item: string, index:number) => {
                                            return (
                                                <div onClick={() => setActiveMediaIndex(index)} className={activeMediaIndex === index ? 'active' : ''}></div>
                                            )
                                        })
                                    }
                                </div>
                                {!isInfoVisible &&
                                    <div className='shortInfo'>
                                        <div>
                                            <p>{user.username}</p>
                                            <img src={Info} alt="" onClick={() => setIsInfoVisible(true)} />
                                        </div>
                                    </div>
                                }
                                {isInfoVisible && <div className='info'>
                                    <div className='basic'>
                                        <div className='nameAndAgeContainer'>
                                            <p className='nameAndAge'>{user.name}</p>
                                            <img src={ArrowDown} alt="" className='close' onClick={() => {setIsInfoVisible(false); document.querySelector('#explore')?.scrollTo({top: 0})}} />
                                        </div>
                                        <div className='gender'>
                                            <img src={user.gender === "MALE" ? GenderMan : GenderWoman} alt="" />
                                            <p>{user.gender === "MALE" ? 'Man' : 'Woman'}</p>
                                        </div>
                                        <div className='destination'>
                                            <img src={Home} alt="" />
                                            <p>Lives in {user.location}</p>
                                        </div>
                                    </div>
                                    <div className='more'>
                                        <div className='passions'>
                                            <p>Favorite Genre</p>
                                            <div>
                                                {user.musicalGenres.map((item: any) => {
                                                    return (
                                                        <div>{item}</div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className='passions'>
                                            <p>Favorite Instrument</p>
                                            <div>
                                                {user.musicalInstruments.map((item: any) => {
                                                    return (
                                                        <div>{item}</div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className='passions'>
                                            <p>Bio</p>
                                            <div>
                                                {user.bio}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        )
                    })
                    : <p>there is not other users to show</p>
            }

            {(activeUserId && !isUserAmountCompleted && users.length > 0) && <div className='buttons'>
                <img src={Unlike} alt="" onClick={() => unLikeUser()} />
                <img src={Like} alt="" onClick={() => likeUser()} />
            </div>
            }
            {
                showLoading && <img className='loading' src={Spinner} />
            }
        </div>
    )
};


// function mapStateToProps(state: any, ownProps: any) {
//     return {
//         filterData: state.UsersReducer.filterData
//     };
// }

export default Explore;
// export default connect(mapStateToProps)(Explore); // connect wrapper function in use
// export default withRouter(connect(null, {removeRecipe})(Recipe))