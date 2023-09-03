import React, { useState } from 'react';
import Logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import GenderMan from '../assets/images/genderMan.png'
import GenderWoman from '../assets/images/genderWoman.png'
import Home from '../assets/images/home.png'
import ArrowLeft from '../assets/images/arrowLeft.png'
import ArrowRight from '../assets/images/arrowRight.png'

const NotFound = () => {

    const navigate = useNavigate()

    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    const videos = [
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
        "https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_24fc451c-57cd-42a4-aced-03bc040f3201.webp",
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
    ]

    return (
        <div id='chat'>
            <div className='chat'>
                <div className='upperPart'>
                    <p>You matched with Maryam on 8/23/2023</p>
                    {/* <div></div> */}
                </div>
                <div className='centerPart'>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='dateContainer'>
                        <div className='message'>9/1/2023, 7:58 PM</div>
                    </div>
                    <div className='messageContainer fromHer'>
                        <time>7:58</time>
                        <div className='message'>Fine, you?</div>
                    </div>
                    <div className='messageContainer fromHer'>
                        <time>7:58</time>
                        <div className='message'>Fine, you? Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?</div>
                    </div>
                </div>
                <div className='bottomPart'>
                    <form>
                        <textarea placeholder='Type a message' name="" id=""></textarea>
                        <button>E</button>
                        <button>SEND</button>
                    </form>
                </div>
            </div>


            <div className='partnerInfo'>
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
                        <div>
                            <img src={ArrowLeft} alt="" />
                        </div>
                        <div >
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
                    <div className='more'>
                        <div className='passions'>
                            <p>Passions</p>
                            <div>
                                <div>guitar</div><div>violin</div><div>singing</div><div>coffee</div><div>sneakers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NotFound;