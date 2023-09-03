import React, { useState } from 'react';
import GenderMan from '../assets/images/genderMan.png'
import GenderWoman from '../assets/images/genderWoman.png'
import Home from '../assets/images/home.png'
import ArrowLeft from '../assets/images/arrowLeft.png'
import ArrowRight from '../assets/images/arrowRight.png'

const Explore = () => {

    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    const videos = [
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
        "https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_24fc451c-57cd-42a4-aced-03bc040f3201.webp",
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
    ]

    return (
        <div id='explore'>
            <div className='videoContainer'>
                {
                    videos.map((item: string, index:number) => {
                        return (
                            activeVideoIndex === index && <video src={'https://www.w3schools.com/tags/movie.ogg'} autoPlay={true} />
                            // <img src={item} alt="" className={activeVideoIndex === index ? 'active': ''} />
                        )
                    })
                }
                <div className='arrows'>
                    <div onClick={() => setActiveVideoIndex(activeVideoIndex-1)} className={`arrowLeft ${activeVideoIndex !== 0 ? 'active' : ''}`}>
                        <img src={ArrowLeft} alt="" />
                    </div>
                    <div onClick={() => setActiveVideoIndex(activeVideoIndex+1)} className={`arrowRight ${activeVideoIndex !== videos.length - 1 ? 'active': ''}`}>
                        <img src={ArrowRight} alt="" />
                    </div>
                </div>
                <div className='bullets'>
                    {
                        videos.map((item: string, index:number) => {
                            return (
                                <div onClick={() => setActiveVideoIndex(index)} className={activeVideoIndex === index ? 'active' : ''}></div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='info'>
                <div className='basic'>
                    <p className='nameAndAge'>aleko 22</p>
                    <div className='gender'>
                        <img src={GenderMan} alt="" />
                        <p>Man</p>
                    </div>
                    <div className='destination'>
                        <img src={Home} alt="" />
                        <p>Lives in Tbilisi</p>
                    </div>
                </div>
                {/* <div className='lookingFor'>

            </div> */}
                <div className='more'>
                    <div className='passions'>
                        <p>Passions</p>
                        <div>
                            <div>guitar</div><div>violin</div><div>singing</div><div>coffee</div><div>sneakers</div>
                        </div>
                    </div>
                    {/* <div className=''>

                </div> */}
                </div>
            </div>
        </div>
    )
};

export default Explore;